/**
 * External Redis cache layer.
 *
 * Wraps ioredis with a singleton connection and provides simple get/set helpers.
 * Gracefully falls through (returns null) when Redis is unavailable so the
 * datastore API is always the fallback.
 *
 * Enable via EXTERNAL_CACHE=true in .env.
 */

import Redis from 'ioredis';

const CACHE_ENABLED = process.env.EXTERNAL_CACHE === 'true';
const CACHE_URL = process.env.EXTERNAL_CACHE_URL;
const DEFAULT_TTL = parseInt(process.env.EXTERNAL_CACHE_TTL || '3600', 10);

/** @type {Redis | null} */
let client = null;
let connectFailed = false;

function getClient() {
  if (!CACHE_ENABLED || !CACHE_URL) return null;
  if (connectFailed) return null;

  if (!client) {
    try {
      const useTls = CACHE_URL.startsWith('rediss://');

      const opts = {
        connectTimeout: 5000,
        commandTimeout: 5000,
        maxRetriesPerRequest: 2,
        retryStrategy(times) {
          if (times > 3) return null;
          return Math.min(times * 200, 2000);
        },
        enableReadyCheck: true,
        lazyConnect: true,
      };

      if (useTls) {
        let servername;
        try { servername = new URL(CACHE_URL).hostname; } catch { /* ignore */ }
        opts.tls = { rejectUnauthorized: false, servername };
      }

      client = new Redis(CACHE_URL, opts);

      client.on('error', (err) => {
        if (!connectFailed) {
          console.warn('[cache] Redis error:', err.message);
          connectFailed = true;
        }
      });

      client.on('ready', () => {
        connectFailed = false;
      });
    } catch (err) {
      console.warn('[cache] Failed to create Redis client:', err.message);
      connectFailed = true;
      return null;
    }
  }

  return client;
}

/**
 * Get a cached value by key.
 * @param {string} key
 * @returns {Promise<any|null>} Parsed JSON or null on miss/error.
 */
export async function cacheGet(key) {
  const redis = getClient();
  if (!redis) return null;

  try {
    const raw = await redis.get(key);
    if (raw === null) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Store a value in cache with a TTL.
 * @param {string} key
 * @param {any} value — will be JSON.stringified
 * @param {number} [ttlSeconds] — defaults to EXTERNAL_CACHE_TTL
 */
export async function cacheSet(key, value, ttlSeconds = DEFAULT_TTL) {
  const redis = getClient();
  if (!redis) return;

  try {
    await redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
  } catch {
    // Silently ignore — cache write failure is not critical
  }
}

/**
 * Delete cache keys matching a pattern.
 * @param {string} pattern — e.g. "ds:*" or "ds:Fireplace:example.com:*"
 */
export async function cacheDel(pattern) {
  const redis = getClient();
  if (!redis) return;

  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch {
    // Silently ignore
  }
}

/** Whether the external cache is enabled and potentially available. */
export function cacheEnabled() {
  return CACHE_ENABLED && Boolean(CACHE_URL);
}
