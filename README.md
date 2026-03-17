# Fireplace Failover Template

Next.js 16 failover app for fireplace domains. Serves multi-tenant fireplace service websites with data from the datastore API and Redis cache.

## Architecture

```
                    ┌──────────────────────────────────┐
                    │     Traefik (Port 9080)           │
                    │  Load Balancer + Health Checks    │
                    │  Retry | Compress | Rate Limit    │
                    └───────────────┬──────────────────┘
                                    │
          ┌────────────┬────────────┼────────────┬────────────┐
          ▼            ▼            ▼            ▼            │
     ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐        │
     │  App-1  │ │  App-2  │ │  App-3  │ │  App-4  │        │
     │ Next.js │ │ Next.js │ │ Next.js │ │ Next.js │        │
     └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘        │
          │           │           │           │              │
          └───────────┴─────┬─────┴───────────┘              │
                            │                                │
             ┌──────────────┴──────────────┐                 │
             ▼                             ▼                 │
    ┌─────────────────┐          ┌─────────────────┐         │
    │   Redis Cache   │          │   Datastore     │         │
    │ 192.168.3.116   │          │ 192.168.3.116   │         │
    │   Port 2096     │          │   Port 80       │         │
    └─────────────────┘          └─────────────────┘         │
                                                             │
                                    ┌────────────────────────┘
                                    ▼
                           ┌─────────────────┐
                           │   LogicalCRM    │
                           │ api.logicalcrm  │
                           │   .com          │
                           └─────────────────┘
```

## Services

| Service | URL | Port | Description |
|---------|-----|------|-------------|
| App | http://192.168.3.115:9080 | 9080 | Next.js via Traefik (4 replicas) |
| Traefik Dashboard | http://192.168.3.115:9081 | 9081 | LB monitoring UI |
| Datastore API | http://192.168.3.116 | 80 | Content + Objects API |
| Redis Cache | 192.168.3.116:2096 | 2096 | External cache (data + images) |
| LogicalCRM | https://api.logicalcrm.com | 443 | Lead/form submission |

## Quick Start

```bash
cd /home/debian/failover/template-fireplace-failover

# Build and start with 4 replicas
sudo docker compose up -d --scale app=4 --build

# Check container status
sudo docker ps --format "table {{.Names}}\t{{.Status}}"

# View access logs
sudo docker logs -f template-fireplace-failover-traefik-1

# View app logs
sudo docker logs -f template-fireplace-failover-app-1
```

## Scaling

```bash
# Scale up to 8 replicas
sudo docker compose up -d --scale app=8

# Scale down to 2 replicas
sudo docker compose up -d --scale app=2
```

Traefik auto-detects new/removed replicas via Docker socket — no restart needed.

## Test a Domain

```bash
# Via Traefik (port 9080)
curl -H "Host: fireplace-built.top" http://localhost:9080/

# Check response headers
curl -I -H "Host: fireplace-built.top" http://localhost:9080/
```

## Traefik Features

| Feature | Config |
|---------|--------|
| **Health checks** | Pings `/` every 10s, 5s timeout — removes unhealthy replicas |
| **Retry** | 3 attempts, 100ms initial interval — retries on other replicas |
| **Compression** | gzip/brotli on responses |
| **Rate limiting** | 100 req/s average, burst 200 |
| **Sticky sessions** | Cookie `failover_affinity` — same client hits same replica |
| **Access logging** | Common log format |
| **Dashboard** | http://192.168.3.115:9081 |

## Environment Variables

### Datastore
| Variable | Value |
|----------|-------|
| `DATASTORE_URL` | `http://192.168.3.116` |
| `DATASTORE_API_KEY` | `sk_live_178f52c1...` |
| `DATASTORE_PROJECT` | `next-global-template-v1` |

### Cache
| Variable | Value |
|----------|-------|
| `EXTERNAL_CACHE` | `true` |
| `EXTERNAL_CACHE_URL` | `redis://default:***@192.168.3.116:2096` |
| `EXTERNAL_CACHE_TTL` | `3600` (1 hour) |

### Domain
| Variable | Value |
|----------|-------|
| `DEFAULT_DOMAIN_ID` | `fireplace-built.top` |
| `INDUSTRY_NAME` | `fireplace` |
| `TEMPLATE_ID` | `template-101-v1` |

### CRM (Form Submission)
| Variable | Value |
|----------|-------|
| `CRM_URL` | `https://api.logicalcrm.com` |
| `CRM_FORM_PATH` | `/web_api/web/web_query` |
| `CRM_TOKEN` | `202_e65b7ce5xsc` |
| `CRM_INDUSTRY_CODE` | `103` |

## Data Flow

```
Request → Traefik → Next.js App
                        │
                        ├─ Redis Cache (HIT) → return cached data
                        │
                        ├─ Datastore API (domain scope) → cache → return
                        │
                        └─ Datastore API (default scope) → cache → return
```

- **Content**: JSON key/value via `/api/v1/projects/{project}/content/{namespace}/{scope}/{key}`
- **Images**: Binary objects via `/api/v1/projects/{project}/objects/{namespace}/{scope}/{key}`
- **Cache keys**: `ds:{namespace}:{scope}:{filename}` (TTL 1h), `img:{namespace}:{scope}:{key}` (TTL 24h)

## Form Submission

```
User submits form → POST /api/contact → LogicalCRM API
                                            │
                                            ├─ industry_code: 103
                                            ├─ domain: (from Host header)
                                            └─ first_name, last_name, email, phone, message
```

Per-domain CRM config loaded from datastore (`config--placeholders.json`).

## Container Resources

| Resource | Limit |
|----------|-------|
| Memory limit | 1 GB per replica |
| Memory reservation | 256 MB per replica |

## Troubleshooting

### Check container health
```bash
sudo docker ps --format "table {{.Names}}\t{{.Status}}"
```

### Clear Redis cache
```bash
redis-cli -u redis://default:9w6GrnOd2k8HuxJKQDi_Z0LCMXjsAvq4P@192.168.3.116:2096 FLUSHALL
```

### Restart all containers
```bash
sudo docker compose restart
```

### Full rebuild
```bash
sudo docker compose down
sudo docker compose up -d --scale app=4 --build
```

### Check Traefik dashboard
Open http://192.168.3.115:9081 to see backend health, active routers, and middleware status.

## Project Structure

```
template-fireplace-failover/
├── src/
│   ├── app/                    # Next.js 16 App Router
│   │   ├── page.js             # Home page
│   │   ├── [service]/page.js   # Dynamic service pages
│   │   ├── layout.js           # Root layout + GTM
│   │   └── api/
│   │       ├── contact/route.js   # Form submission
│   │       └── image/[[...path]]/ # Image proxy
│   ├── components/             # React components
│   ├── lib/
│   │   ├── datastore.js        # Datastore API client
│   │   ├── cache.js            # Redis cache layer
│   │   ├── page-data.js        # Data fetching + tag resolution
│   │   ├── domain-config.js    # Domain routing
│   │   ├── validators.js       # Form validation
│   │   └── rate-limit.js       # Rate limiting
│   └── middleware.js           # Security headers + CSP
├── default_data/fireplace/     # Local fallback data
├── domain_data/                # Per-domain overrides
├── public/                     # Static assets
├── docker-compose.yml          # Traefik + app deployment
├── Dockerfile                  # Multi-stage production build
├── package.json                # Next.js 16, React 19, ioredis
└── .env                        # Local dev config
```
