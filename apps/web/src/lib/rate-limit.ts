import { InMemoryRateLimitStore, type RateLimitStore, type RateLimitStoreResult } from "@/lib/rate-limit-adapter"

export interface RateLimitOptions {
  key: string
  limit?: number
  windowMs?: number
  now?: number
}

const DEFAULT_LIMIT = 30
const DEFAULT_WINDOW_MS = 60_000

let rateLimitStore: RateLimitStore = new InMemoryRateLimitStore()

export async function checkRateLimit(options: RateLimitOptions): Promise<RateLimitStoreResult> {
  return rateLimitStore.consume(
    options.key,
    options.limit ?? DEFAULT_LIMIT,
    options.windowMs ?? DEFAULT_WINDOW_MS,
    options.now,
  )
}

export function getRateLimitHeaders(result: RateLimitStoreResult): Record<string, string> {
  return {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(result.resetAt),
  }
}

export function __setRateLimitStore(store: RateLimitStore) {
  rateLimitStore = store
}
