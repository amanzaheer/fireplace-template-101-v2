/**
 * Server wrapper for Next.js standalone output.
 *
 * When EXTERNAL_CACHE=true:
 *   Caches complete HTML responses in Redis (full-page caching).
 *   On cache hit, serves directly from Redis — zero SSR.
 *   On cache miss, passes to Next.js, captures the HTML, caches it, and serves.
 *
 * When EXTERNAL_CACHE=false:
 *   Pure SSR passthrough — every request goes through Next.js with no caching.
 */

const http = require("http");
const { parse } = require("url");
const path = require("path");

// ── Load env ──
try {
  require("dotenv").config({ path: path.join(__dirname, ".env") });
} catch {
  // dotenv not available in standalone — env vars come from Docker/process
}

// ── Config ──
const CACHE_ENABLED = process.env.EXTERNAL_CACHE === "true";
const CACHE_URL = process.env.EXTERNAL_CACHE_URL;
const PAGE_CACHE_TTL = parseInt(process.env.PAGE_CACHE_TTL, 10) || 3600;

// ── Redis setup (only when EXTERNAL_CACHE=true) ──
let redis = null;
let redisReady = false;

function getRedis() {
  if (!CACHE_ENABLED || !CACHE_URL) return null;
  if (redis) return redisReady ? redis : null;

  try {
    const Redis = require("ioredis");
    const url = new URL(CACHE_URL);
    const useTLS = url.protocol === "rediss:";

    redis = new Redis(CACHE_URL, {
      connectTimeout: 3000,
      commandTimeout: 2000,
      maxRetriesPerRequest: 1,
      retryStrategy(times) {
        if (times > 3) return null;
        return Math.min(times * 200, 2000);
      },
      lazyConnect: true,
      ...(useTLS
        ? { tls: { servername: url.hostname, rejectUnauthorized: false } }
        : {}),
    });

    redis.on("error", () => {
      redisReady = false;
    });
    redis.on("ready", () => {
      redisReady = true;
      console.log("[server] Redis connected for page caching");
    });

    redis.connect().catch(() => {
      redisReady = false;
    });

    return null;
  } catch {
    return null;
  }
}

async function cacheGet(key) {
  const client = getRedis();
  if (!client) return null;
  try {
    return await client.get(key);
  } catch {
    return null;
  }
}

async function cacheSet(key, value, ttl) {
  const client = getRedis();
  if (!client) return;
  try {
    await client.set(key, value, "EX", ttl);
  } catch {}
}

function isCacheable(pathname) {
  if (pathname.startsWith("/api/")) return false;
  if (pathname.startsWith("/_next/")) return false;
  if (pathname.startsWith("/__next")) return false;
  if (pathname.includes(".")) return false;
  return true;
}

function buildCacheKey(host, pathname) {
  const domain = (host || "").split(":")[0].replace(/^www\./, "").toLowerCase();
  return `page:${domain}:${pathname}`;
}

// ── Monkey-patch http.createServer to intercept Next.js server ──
const originalCreateServer = http.createServer;

http.createServer = function patchedCreateServer(nextHandler) {
  console.log(`[server] page-cache: ${CACHE_ENABLED ? "ON" : "OFF"}`);

  if (!CACHE_ENABLED) {
    return originalCreateServer.call(this, nextHandler);
  }

  // Initialize Redis and flush stale page cache
  getRedis();
  setTimeout(async () => {
    const client = getRedis();
    if (!client) return;
    try {
      const keys = [];
      let cursor = "0";
      do {
        const [next, batch] = await client.scan(
          cursor,
          "MATCH",
          "page:*",
          "COUNT",
          500
        );
        cursor = next;
        keys.push(...batch);
      } while (cursor !== "0");
      if (keys.length > 0) {
        await client.del(...keys);
        console.log(
          `[server] Flushed ${keys.length} stale page cache entries`
        );
      }
    } catch {}
  }, 3000);

  const wrappedHandler = async (req, res) => {
    const parsed = parse(req.url, true);
    const pathname = parsed.pathname || "/";

    if (req.method === "GET" && isCacheable(pathname)) {
      const cacheKey = buildCacheKey(req.headers.host, pathname);

      // ── Try cache ──
      const cached = await cacheGet(cacheKey);
      if (cached) {
        try {
          const { statusCode, body } = JSON.parse(cached);
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.setHeader("Content-Length", Buffer.byteLength(body, "utf8"));
          res.setHeader("X-Page-Cache", "HIT");
          res.statusCode = statusCode;
          res.end(body, "utf8");
          return;
        } catch {
          // corrupted entry, fall through
        }
      }

      // ── Cache miss — force uncompressed response ──
      delete req.headers["accept-encoding"];

      const origWrite = res.write;
      const origEnd = res.end;
      const chunks = [];

      res.write = function (chunk, encoding, callback) {
        if (chunk)
          chunks.push(
            Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding)
          );
        return origWrite.apply(res, arguments);
      };

      res.end = function (chunk, encoding, callback) {
        if (chunk)
          chunks.push(
            Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding)
          );

        const contentType = res.getHeader("content-type") || "";
        const contentEncoding = res.getHeader("content-encoding");
        if (
          res.statusCode === 200 &&
          contentType.includes("text/html") &&
          !contentEncoding
        ) {
          const body = Buffer.concat(chunks).toString("utf8");
          const entry = JSON.stringify({ statusCode: 200, body });
          cacheSet(cacheKey, entry, PAGE_CACHE_TTL).catch(() => {});
        }

        res.setHeader("X-Page-Cache", "MISS");
        return origEnd.apply(res, arguments);
      };
    }

    nextHandler(req, res);
  };

  return originalCreateServer.call(this, wrappedHandler);
};

// ── Load standalone server ──
require("./standalone-server.js");
