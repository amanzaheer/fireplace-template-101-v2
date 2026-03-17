/**
 * Simple in-memory sliding-window rate limiter.
 * Each call to `check(key)` returns { allowed, remaining, retryAfter }.
 *
 * Not shared across server instances — suitable for single-process or
 * low-traffic deployments. For multi-instance, swap in Redis.
 */
export function createRateLimiter({ windowMs = 60_000, max = 10 } = {}) {
  const hits = new Map(); // key → [timestamps]

  // Periodic cleanup to avoid memory leaks
  const cleanup = () => {
    const now = Date.now();
    for (const [key, timestamps] of hits) {
      const valid = timestamps.filter((t) => now - t < windowMs);
      if (valid.length === 0) hits.delete(key);
      else hits.set(key, valid);
    }
  };

  setInterval(cleanup, windowMs * 2).unref?.();

  return {
    check(key) {
      const now = Date.now();
      const timestamps = (hits.get(key) || []).filter((t) => now - t < windowMs);

      if (timestamps.length >= max) {
        const oldest = timestamps[0];
        const retryAfter = Math.ceil((oldest + windowMs - now) / 1000);
        return { allowed: false, remaining: 0, retryAfter };
      }

      timestamps.push(now);
      hits.set(key, timestamps);
      return { allowed: true, remaining: max - timestamps.length, retryAfter: 0 };
    },
  };
}
