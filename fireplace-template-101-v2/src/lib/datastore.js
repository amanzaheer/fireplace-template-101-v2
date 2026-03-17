/**
 * Datastore client for next-16-global-template.
 *
 * Mirrors the API surface of localsite-template/datastoreV2.js but with one
 * key difference: content retrieval functions return null (instead of throwing)
 * when the API is unavailable or a key is not found, so callers in page-data.js
 * can transparently fall through to the local default_data files.
 *
 * Write operations (store / update / delete) still throw on failure because a
 * failed write is always a real error.
 *
 * Environment variables:
 *   DATASTORE_URL       – base URL (default: https://api-datastore.autosyncer.com)
 *   DATASTORE_API_KEY   – required for all requests
 *   DATASTORE_PROJECT   – project slug (default: next-global-template-v1)
 *   INDUSTRY_NAME       – fallback namespace when industry is not passed explicitly
 *   DATASTORE_LOG_LEVEL – "debug" | "info" | "error" (default: "info")
 *   DATASTORE_LOG_TIMING – set to "1" to log request timing + size
 */

import { cacheGet, cacheSet, cacheEnabled } from './cache';

const DATASTORE_BASE =
  process.env.DATASTORE_URL || 'https://api-datastore.autosyncer.com';
const DATASTORE_API_KEY = process.env.DATASTORE_API_KEY;
const DATASTORE_PROJECT =
  process.env.DATASTORE_PROJECT || 'next-global-template-v1';
const CACHE_TTL = parseInt(process.env.EXTERNAL_CACHE_TTL || '3600', 10);
const IMAGE_CACHE_TTL = 86400; // 24 hours for images

// ---------------------------------------------------------------------------
// Internal utilities
// ---------------------------------------------------------------------------

function ensureServerEnv() {
  if (typeof window !== 'undefined') {
    throw new Error('Datastore client can only be used server-side');
  }
}

/** Returns true when the API key is configured and we can attempt a request. */
export function datastoreAvailable() {
  return Boolean(DATASTORE_API_KEY);
}

function buildHeaders(contentType = false) {
  const headers = { 'X-API-Key': DATASTORE_API_KEY };
  if (contentType) headers['Content-Type'] = 'application/json';
  return headers;
}

function formatDuration(ms) {
  if (ms < 1000) return `${ms}ms`;
  const s = ms / 1000;
  if (s < 60) return `${s.toFixed(2)}s`;
  const m = Math.floor(s / 60);
  return `${m}m ${(s % 60).toFixed(2)}s`;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

function logRequest({ url, label, method, status, ms, size }) {
  const level = process.env.DATASTORE_LOG_LEVEL || 'info';
  const shouldLog =
    level === 'debug' ||
    (level === 'info' && status < 400) ||
    (level === 'error' && status >= 400);
  if (!shouldLog) return;

  const icon = status < 400 ? '✅' : '❌';
  const sizeText = size ? ` | size: ${formatBytes(size)}` : '';
  console.log(
    `[datastore] ${icon} ${label} ${method} ${status} (${formatDuration(ms)}${sizeText})\n→ ${url}`
  );
}

async function timedFetch(label, url, init) {
  const t0 = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  let res;
  try {
    res = await fetch(url, { ...init, cache: 'no-store', signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
  const ms = Date.now() - t0;

  if (process.env.DATASTORE_LOG_TIMING === '1') {
    try {
      const method = init?.method || 'GET';
      let size = 0;
      const lenHeader = res.headers.get('content-length');
      if (lenHeader) {
        size = parseInt(lenHeader, 10);
      } else {
        try {
          const text = await res.clone().text();
          size =
            typeof Buffer !== 'undefined'
              ? Buffer.byteLength(text, 'utf8')
              : text.length;
        } catch {
          // ignore
        }
      }
      logRequest({ url, label, method, status: res.status, ms, size });
    } catch (e) {
      console.error(`[datastore] log error for ${label}:`, e);
    }
  }
  return res;
}

function resolveNamespace(industry) {
  return industry || process.env.INDUSTRY_NAME || '';
}

function resolveScope(domain) {
  return domain;
}

function buildContentBaseUrl() {
  return `${DATASTORE_BASE}/api/v1/projects/${encodeURIComponent(DATASTORE_PROJECT)}/content`;
}

function buildObjectsBaseUrl() {
  return `${DATASTORE_BASE}/api/v1/projects/${encodeURIComponent(DATASTORE_PROJECT)}/objects`;
}

// ---------------------------------------------------------------------------
// Content API — JSON key/value store
// ---------------------------------------------------------------------------

/**
 * Store content items for a given industry (namespace) and domain (scope).
 *
 * @param {Object} params
 * @param {string} params.industry
 * @param {string} params.domain
 * @param {Array<{name: string, content: any}>} params.items
 * @param {number} [params.ttlSeconds]
 */
export async function dsContentStore({ industry, domain, items, ttlSeconds }) {
  ensureServerEnv();
  const namespace = resolveNamespace(industry);
  const scope = resolveScope(domain);

  const payload = {
    namespace,
    scope,
    items: (items || []).map((item) => ({
      name: item.name,
      content:
        typeof item.content === 'string'
          ? item.content
          : JSON.stringify(item.content ?? {}),
    })),
  };
  if (ttlSeconds && Number.isFinite(ttlSeconds)) {
    payload.ttl_seconds = ttlSeconds;
  }

  const res = await timedFetch('dsContentStore', buildContentBaseUrl(), {
    method: 'POST',
    headers: buildHeaders(true),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Content store failed: ${res.status} ${res.statusText} ${text}`);
  }
  return res.json();
}

/**
 * Retrieve a single JSON item for industry/domain/filename.
 * Returns null when the key is not found or the API is unavailable —
 * callers in page-data.js fall through to default_data files.
 *
 * @param {Object} params
 * @param {string} params.industry
 * @param {string} params.domain
 * @param {string} params.filename
 * @returns {Promise<any|null>}
 */
export async function dsContentRetrieve({ industry, domain, filename }) {
  ensureServerEnv();
  if (!datastoreAvailable()) return null;

  const namespace = resolveNamespace(industry);
  const scope = resolveScope(domain);

  // Check external Redis cache first
  if (cacheEnabled()) {
    const cacheKey = `ds:${namespace}:${scope}:${filename}`;
    const cached = await cacheGet(cacheKey);
    if (cached !== null) {
      if (process.env.DATASTORE_LOG_TIMING === '1') {
        console.log(`[cache] HIT ${cacheKey}`);
      }
      // Sentinel "__null__" means we cached a negative (not-found) result
      return cached === '__null__' ? null : cached;
    }
  }

  const url = `${buildContentBaseUrl()}/${encodeURIComponent(namespace)}/${encodeURIComponent(scope)}/${encodeURIComponent(filename)}`;

  let res;
  try {
    res = await timedFetch('dsContentRetrieve', url, { headers: buildHeaders() });
  } catch {
    // Network error — fall through to local files
    return null;
  }

  if (res.status === 404) {
    // Cache negative result to avoid repeated API calls for missing keys
    if (cacheEnabled()) {
      const cacheKey = `ds:${namespace}:${scope}:${filename}`;
      await cacheSet(cacheKey, '__null__', Math.min(CACHE_TTL, 300));
      if (process.env.DATASTORE_LOG_TIMING === '1') {
        console.log(`[cache] SET ${cacheKey} (negative, TTL 300s)`);
      }
    }
    return null;
  }
  if (!res.ok) {
    console.warn(`[datastore] dsContentRetrieve ${res.status} for ${filename} — falling back to default_data`);
    return null;
  }

  const json = await res.json().catch(() => null);
  const item = json?.data?.items?.[0];
  if (!item || !item.found) {
    // Cache negative result
    if (cacheEnabled()) {
      const cacheKey = `ds:${namespace}:${scope}:${filename}`;
      await cacheSet(cacheKey, '__null__', Math.min(CACHE_TTL, 300));
      if (process.env.DATASTORE_LOG_TIMING === '1') {
        console.log(`[cache] SET ${cacheKey} (negative, TTL 300s)`);
      }
    }
    return null;
  }

  let result;
  try {
    result = JSON.parse(item.content || '{}');
  } catch {
    result = item.content ?? null;
  }

  // Store in external Redis cache
  if (cacheEnabled()) {
    const cacheKey = `ds:${namespace}:${scope}:${filename}`;
    await cacheSet(cacheKey, result, CACHE_TTL);
    if (process.env.DATASTORE_LOG_TIMING === '1') {
      console.log(`[cache] SET ${cacheKey} (TTL ${CACHE_TTL}s)`);
    }
  }

  return result;
}

/**
 * List items in a scope (industry + domain).
 *
 * @param {Object} params
 * @param {string} params.industry
 * @param {string} params.domain
 * @param {number} [params.limit]
 */
export async function dsContentList({ industry, domain, limit = 100 }) {
  ensureServerEnv();
  const namespace = resolveNamespace(industry);
  const scope = resolveScope(domain);

  const qs = new URLSearchParams({ limit: String(limit) });
  const url = `${buildContentBaseUrl()}/${encodeURIComponent(namespace)}/${encodeURIComponent(scope)}?${qs}`;

  const res = await timedFetch('dsContentList', url, { headers: buildHeaders() });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Content list failed: ${res.status} ${res.statusText} ${text}`);
  }
  return res.json();
}

/**
 * Update existing content items in a scope.
 *
 * @param {Object} params
 * @param {string} params.industry
 * @param {string} params.domain
 * @param {Array<{name: string, content: any}>} params.items
 */
export async function dsContentUpdate({ industry, domain, items }) {
  ensureServerEnv();
  const namespace = resolveNamespace(industry);
  const scope = resolveScope(domain);

  const url = `${buildContentBaseUrl()}/${encodeURIComponent(namespace)}/${encodeURIComponent(scope)}`;
  const payload = {
    items: (items || []).map((item) => ({
      name: item.name,
      content:
        typeof item.content === 'string'
          ? item.content
          : JSON.stringify(item.content ?? {}),
    })),
  };

  const res = await timedFetch('dsContentUpdate', url, {
    method: 'PUT',
    headers: buildHeaders(true),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Content update failed: ${res.status} ${res.statusText} ${text}`);
  }
  return res.json();
}

/**
 * Bulk retrieve content items.
 * Returns { items: [{ filename, content: string|null }] }
 * Runs parallel single retrieves; missing items have content: null.
 *
 * @param {Object} params
 * @param {string} params.industry
 * @param {string} params.domain
 * @param {Array<string>} params.filenames
 */
export async function dsContentBulkRetrieve({ industry, domain, filenames }) {
  if (!filenames || filenames.length === 0) return { items: [] };
  const results = await Promise.all(
    filenames.map(async (filename) => {
      const data = await dsContentRetrieve({ industry, domain, filename });
      return { filename, content: data != null ? JSON.stringify(data) : null };
    })
  );
  return { items: results };
}

/**
 * Delete a single item in a scope.
 */
export async function dsContentDeleteItem({ industry, domain, filename }) {
  ensureServerEnv();
  const namespace = resolveNamespace(industry);
  const scope = resolveScope(domain);

  const url = `${buildContentBaseUrl()}/${encodeURIComponent(namespace)}/${encodeURIComponent(scope)}/${encodeURIComponent(filename)}`;
  const res = await timedFetch('dsContentDeleteItem', url, {
    method: 'DELETE',
    headers: buildHeaders(),
  });

  if (!res.ok && res.status !== 404) {
    const text = await res.text().catch(() => '');
    throw new Error(`Content delete item failed: ${res.status} ${res.statusText} ${text}`);
  }
  return true;
}

/**
 * Delete an entire scope (all items for an industry + domain).
 */
export async function dsContentDeleteScope({ industry, domain }) {
  ensureServerEnv();
  const namespace = resolveNamespace(industry);
  const scope = resolveScope(domain);

  const url = `${buildContentBaseUrl()}/${encodeURIComponent(namespace)}/${encodeURIComponent(scope)}`;
  const res = await timedFetch('dsContentDeleteScope', url, {
    method: 'DELETE',
    headers: buildHeaders(),
  });

  if (!res.ok && res.status !== 404) {
    const text = await res.text().catch(() => '');
    throw new Error(`Content delete scope failed: ${res.status} ${res.statusText} ${text}`);
  }
  return true;
}

/**
 * Bulk delete content items in a scope.
 *
 * @param {Object} params
 * @param {string} params.industry
 * @param {string} params.domain
 * @param {Array<string>} params.items  – filenames to delete
 */
export async function dsContentBulkDelete({ industry, domain, items }) {
  ensureServerEnv();
  const namespace = resolveNamespace(industry);
  const scope = resolveScope(domain);

  const url = `${DATASTORE_BASE}/api/v1/projects/${encodeURIComponent(DATASTORE_PROJECT)}/content/bulk/delete`;
  const payload = { namespace, scope, items: items || [] };

  const res = await timedFetch('dsContentBulkDelete', url, {
    method: 'POST',
    headers: buildHeaders(true),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Content bulk delete failed: ${res.status} ${res.statusText} ${text}`);
  }
  return res.json();
}

// ---------------------------------------------------------------------------
// Object API — binary / S3 store
// ---------------------------------------------------------------------------

/**
 * Upload a single binary object (e.g. image) for an industry + domain.
 * Uses multipart/form-data — do NOT pass JSON here.
 *
 * @param {Object} params
 * @param {string} params.industry
 * @param {string} params.domain
 * @param {Blob|File} params.file
 * @param {string} [params.filename]
 */
export async function dsObjectUpload({ industry, domain, file, filename }) {
  ensureServerEnv();
  if (!file) throw new Error('dsObjectUpload: file is required');

  const namespace = resolveNamespace(industry);
  const scope = resolveScope(domain);

  const formData = new FormData();
  formData.set('namespace', namespace);
  formData.set('scope', scope);
  if (filename) {
    formData.append('file', file, filename);
  } else {
    formData.append('file', file);
  }

  const res = await timedFetch('dsObjectUpload', buildObjectsBaseUrl(), {
    method: 'POST',
    headers: { 'X-API-Key': DATASTORE_API_KEY },
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Object upload failed: ${res.status} ${res.statusText} ${text}`);
  }
  return res.json();
}

/**
 * List objects for an industry + domain.
 *
 * @param {Object} params
 * @param {string} params.industry
 * @param {string} params.domain
 * @param {number} [params.maxKeys]
 */
export async function dsObjectsList({ industry, domain, maxKeys = 100 }) {
  ensureServerEnv();
  const namespace = resolveNamespace(industry);
  const scope = resolveScope(domain);

  const qs = new URLSearchParams({ max_keys: String(maxKeys) });
  const url = `${buildObjectsBaseUrl()}/${encodeURIComponent(namespace)}/${encodeURIComponent(scope)}?${qs}`;

  const res = await timedFetch('dsObjectsList', url, { headers: buildHeaders() });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Objects list failed: ${res.status} ${res.statusText} ${text}`);
  }
  return res.json();
}

/**
 * Download an object and return raw bytes + metadata.
 * Returns null when the key is not found (404).
 *
 * @param {Object} params
 * @param {string} params.industry
 * @param {string} params.domain
 * @param {string} params.key
 * @returns {Promise<{ body: Uint8Array, contentType?: string, contentLength?: number }|null>}
 */
export async function dsObjectDownload({ industry, domain, key }) {
  ensureServerEnv();
  const namespace = resolveNamespace(industry);
  const scope = resolveScope(domain);

  // Check external Redis cache first
  if (cacheEnabled()) {
    const cacheKey = `img:${namespace}:${scope}:${key}`;
    const cached = await cacheGet(cacheKey);
    if (cached !== null) {
      if (process.env.DATASTORE_LOG_TIMING === '1') {
        console.log(`[cache] HIT ${cacheKey}`);
      }
      return {
        body: new Uint8Array(Buffer.from(cached.b64, 'base64')),
        contentType: cached.contentType,
        contentLength: cached.contentLength,
      };
    }
  }

  // key may contain '/' (e.g. "hero/hero.webp") — encode each segment separately
  const encodedKey = key.split('/').map(encodeURIComponent).join('/');
  const url = `${buildObjectsBaseUrl()}/${encodeURIComponent(namespace)}/${encodeURIComponent(scope)}/${encodedKey}`;
  const res = await timedFetch('dsObjectDownload', url, { headers: buildHeaders() });

  if (res.status === 404) return null;
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Object download failed: ${res.status} ${res.statusText} ${text}`);
  }

  // The API returns JSON with base64-encoded content, not raw binary.
  // Response shape: { data: { object: { key, content, content_type, size } } }
  const json = await res.json();
  const obj = json?.data?.object;
  if (!obj?.content) return null;

  const contentType = obj.content_type || undefined;
  const b64 = obj.content;
  // Decode base64 → Uint8Array (works in both Node.js and Edge runtime)
  const binary = Buffer.from(b64, 'base64');

  // Cache the base64 content in Redis (avoid re-encoding)
  if (cacheEnabled()) {
    const cacheKey = `img:${namespace}:${scope}:${key}`;
    await cacheSet(cacheKey, { b64, contentType, contentLength: obj.size ?? binary.length }, IMAGE_CACHE_TTL);
    if (process.env.DATASTORE_LOG_TIMING === '1') {
      console.log(`[cache] SET ${cacheKey} (TTL ${IMAGE_CACHE_TTL}s)`);
    }
  }

  return {
    body: new Uint8Array(binary),
    contentType,
    contentLength: obj.size ?? binary.length,
  };
}

/**
 * Fetch object metadata only (HEAD).
 * Returns null when the key is not found (404).
 *
 * @param {Object} params
 * @param {string} params.industry
 * @param {string} params.domain
 * @param {string} params.key
 */
export async function dsObjectHead({ industry, domain, key }) {
  ensureServerEnv();
  const namespace = resolveNamespace(industry);
  const scope = resolveScope(domain);

  const encodedKey = key.split('/').map(encodeURIComponent).join('/');
  const url = `${buildObjectsBaseUrl()}/${encodeURIComponent(namespace)}/${encodeURIComponent(scope)}/${encodedKey}`;
  const res = await timedFetch('dsObjectHead', url, {
    method: 'HEAD',
    headers: buildHeaders(),
  });

  if (res.status === 404) return null;
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Object head failed: ${res.status} ${res.statusText} ${text}`);
  }

  const len = res.headers.get('content-length');
  return {
    contentType: res.headers.get('content-type') || undefined,
    contentLength: len ? Number(len) : undefined,
    lastModified: res.headers.get('last-modified') || undefined,
    etag: res.headers.get('etag') || undefined,
  };
}

/**
 * Delete a single object for an industry + domain.
 */
export async function dsObjectDelete({ industry, domain, key }) {
  ensureServerEnv();
  const namespace = resolveNamespace(industry);
  const scope = resolveScope(domain);

  const encodedKey = key.split('/').map(encodeURIComponent).join('/');
  const url = `${buildObjectsBaseUrl()}/${encodeURIComponent(namespace)}/${encodeURIComponent(scope)}/${encodedKey}`;
  const res = await timedFetch('dsObjectDelete', url, {
    method: 'DELETE',
    headers: buildHeaders(),
  });

  if (!res.ok && res.status !== 404) {
    const text = await res.text().catch(() => '');
    throw new Error(`Object delete failed: ${res.status} ${res.statusText} ${text}`);
  }
  return true;
}

/**
 * Bulk upload multiple objects via multipart/form-data.
 *
 * @param {Object} params
 * @param {string} params.industry
 * @param {string} params.domain
 * @param {Array<{ file: Blob|File, filename?: string }>} params.files
 */
export async function dsObjectsBulkUpload({ industry, domain, files }) {
  ensureServerEnv();
  if (!Array.isArray(files) || files.length === 0) {
    throw new Error('dsObjectsBulkUpload: files array is required');
  }

  const namespace = resolveNamespace(industry);
  const scope = resolveScope(domain);

  const formData = new FormData();
  formData.set('namespace', namespace);
  formData.set('scope', scope);
  for (const f of files) {
    if (!f?.file) continue;
    if (f.filename) {
      formData.append('files', f.file, f.filename);
    } else {
      formData.append('files', f.file);
    }
  }

  const res = await timedFetch('dsObjectsBulkUpload', `${buildObjectsBaseUrl()}/bulk`, {
    method: 'POST',
    headers: { 'X-API-Key': DATASTORE_API_KEY },
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Objects bulk upload failed: ${res.status} ${res.statusText} ${text}`);
  }
  return res.json();
}

/**
 * Bulk retrieve objects by keys.
 *
 * @param {Object} params
 * @param {string} params.industry
 * @param {string} params.domain
 * @param {Array<string>} params.keys
 */
export async function dsObjectsBulkRetrieve({ industry, domain, keys }) {
  ensureServerEnv();
  const namespace = resolveNamespace(industry);
  const scope = resolveScope(domain);

  const res = await timedFetch('dsObjectsBulkRetrieve', `${buildObjectsBaseUrl()}/bulk/retrieve`, {
    method: 'POST',
    headers: buildHeaders(true),
    body: JSON.stringify({ namespace, scope, keys: keys || [] }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Objects bulk retrieve failed: ${res.status} ${res.statusText} ${text}`);
  }
  return res.json();
}

/**
 * Bulk delete objects by keys.
 *
 * @param {Object} params
 * @param {string} params.industry
 * @param {string} params.domain
 * @param {Array<string>} params.keys
 */
export async function dsObjectsBulkDelete({ industry, domain, keys }) {
  ensureServerEnv();
  const namespace = resolveNamespace(industry);
  const scope = resolveScope(domain);

  const res = await timedFetch('dsObjectsBulkDelete', `${buildObjectsBaseUrl()}/bulk/delete`, {
    method: 'POST',
    headers: buildHeaders(true),
    body: JSON.stringify({ namespace, scope, keys: keys || [] }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Objects bulk delete failed: ${res.status} ${res.statusText} ${text}`);
  }
  return res.json();
}
