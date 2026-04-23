type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const store = new Map<string, RateLimitEntry>();

const LIMITS: Record<string, { max: number; windowMs: number }> = {
  GENERATE_SUBTASKS:    { max: 10, windowMs: 60_000 },   // 10/min
  ESTIMATE_DEADLINE:    { max: 10, windowMs: 60_000 },
  SUMMARIZE_PROJECT:    { max: 5,  windowMs: 60_000 },   // 5/min — mais caro
  DETECT_BOTTLENECKS:   { max: 5,  windowMs: 60_000 },
};

export function checkRateLimit(
  userId: string,
  feature: string,
): { allowed: boolean; retryAfterMs?: number } {
  const limit = LIMITS[feature];
  if (!limit) return { allowed: true };

  const key = `${userId}:${feature}`;
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + limit.windowMs });
    return { allowed: true };
  }

  if (entry.count >= limit.max) {
    return { allowed: false, retryAfterMs: entry.resetAt - now };
  }

  entry.count++;
  return { allowed: true };
}