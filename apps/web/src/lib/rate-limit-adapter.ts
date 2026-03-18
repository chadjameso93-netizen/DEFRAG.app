export interface RateLimitRecord {
  count: number
  resetAt: number
}

export interface RateLimitStoreResult {
  allowed: boolean
  limit: number
  remaining: number
  resetAt: number
}

export interface RateLimitStore {
  consume(key: string, limit: number, windowMs: number, now?: number): Promise<RateLimitStoreResult>
}

export class InMemoryRateLimitStore implements RateLimitStore {
  private readonly records = new Map<string, RateLimitRecord>()

  async consume(key: string, limit: number, windowMs: number, now = Date.now()): Promise<RateLimitStoreResult> {
    const current = this.records.get(key)

    if (!current || current.resetAt <= now) {
      const resetAt = now + windowMs
      this.records.set(key, { count: 1, resetAt })
      return {
        allowed: true,
        limit,
        remaining: Math.max(0, limit - 1),
        resetAt,
      }
    }

    const nextCount = current.count + 1
    this.records.set(key, { count: nextCount, resetAt: current.resetAt })

    return {
      allowed: nextCount <= limit,
      limit,
      remaining: Math.max(0, limit - nextCount),
      resetAt: current.resetAt,
    }
  }
}
