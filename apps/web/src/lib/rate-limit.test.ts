import { beforeEach, describe, expect, it } from "vitest"
import { __setRateLimitStore, checkRateLimit, getRateLimitHeaders } from "@/lib/rate-limit"
import { InMemoryRateLimitStore } from "@/lib/rate-limit-adapter"

describe("rate-limit", () => {
  beforeEach(() => {
    __setRateLimitStore(new InMemoryRateLimitStore())
  })

  it("allows requests within the configured window", async () => {
    const first = await checkRateLimit({ key: "user:1", limit: 2, windowMs: 1000, now: 0 })
    const second = await checkRateLimit({ key: "user:1", limit: 2, windowMs: 1000, now: 10 })
    const third = await checkRateLimit({ key: "user:1", limit: 2, windowMs: 1000, now: 20 })

    expect(first.allowed).toBe(true)
    expect(second.allowed).toBe(true)
    expect(third.allowed).toBe(false)
    expect(getRateLimitHeaders(third)).toMatchObject({
      "X-RateLimit-Limit": "2",
      "X-RateLimit-Remaining": "0",
    })
  })

  it("resets after the window elapses", async () => {
    await checkRateLimit({ key: "user:2", limit: 1, windowMs: 1000, now: 0 })
    const next = await checkRateLimit({ key: "user:2", limit: 1, windowMs: 1000, now: 1001 })

    expect(next.allowed).toBe(true)
    expect(next.remaining).toBe(0)
  })
})
