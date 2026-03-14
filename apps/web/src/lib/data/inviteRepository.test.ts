import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

describe("inviteRepository fallback rules", () => {
  const envBackup = { ...process.env }

  beforeEach(() => {
    vi.resetModules()
    process.env = { ...envBackup }
    delete process.env.NEXT_PUBLIC_SUPABASE_URL
    delete process.env.SUPABASE_SERVICE_ROLE_KEY
    delete process.env.ALLOW_MOCK_INVITE_FALLBACK
    delete process.env.VERCEL_ENV
  })

  afterEach(() => {
    process.env = { ...envBackup }
  })

  it("blocks fallback when dev flag is off", async () => {
    const repo = await import("./inviteRepository")
    await expect(repo.listInvites("user-1")).rejects.toThrow("Database is not configured")
  })

  it("allows fallback when ALLOW_MOCK_INVITE_FALLBACK=true", async () => {
    process.env.ALLOW_MOCK_INVITE_FALLBACK = "true"
    const repo = await import("./inviteRepository")
    const invites = await repo.listInvites("user-1")
    expect(Array.isArray(invites)).toBe(true)
  })

  it("blocks fallback in preview even when flag is true", async () => {
    process.env.ALLOW_MOCK_INVITE_FALLBACK = "true"
    process.env.VERCEL_ENV = "preview"
    const repo = await import("./inviteRepository")
    await expect(repo.listInvites("user-1")).rejects.toThrow("Database is not configured")
  })
})
