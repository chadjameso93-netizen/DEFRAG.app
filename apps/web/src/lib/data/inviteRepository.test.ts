import { beforeEach, describe, expect, it, vi } from "vitest"

const createAdminClient = vi.fn()

vi.mock("@/lib/supabase/admin", () => ({
  createAdminClient,
}))

function buildClient(result: { data?: any; error?: any }) {
  const chain: any = {
    insert: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue(result),
    maybeSingle: vi.fn().mockResolvedValue(result),
    eq: vi.fn().mockReturnThis(),
    order: vi.fn().mockResolvedValue(result),
    update: vi.fn().mockReturnThis(),
    or: vi.fn().mockReturnThis(),
  }

  return {
    from: vi.fn(() => chain),
  }
}

describe("inviteRepository", () => {
  beforeEach(() => {
    vi.resetModules()
    vi.resetAllMocks()
    delete process.env.ALLOW_MOCK_INVITE_FALLBACK
    delete process.env.VERCEL_ENV
  })

  it("blocks fallback when dev flag is off", async () => {
    process.env.ALLOW_MOCK_INVITE_FALLBACK = "false"
    createAdminClient.mockReturnValue(buildClient({ error: new Error("db down") }))

    const repo = await import("./inviteRepository")

    await expect(
      repo.createInvite({
        createdByUserId: "user-1",
        email: "a@example.com",
      })
    ).rejects.toBeDefined()
  })

  it("uses fallback only when explicit dev flag is true", async () => {
    process.env.ALLOW_MOCK_INVITE_FALLBACK = "true"
    process.env.NODE_ENV = "development"
    createAdminClient.mockReturnValue(buildClient({ error: new Error("db down") }))

    const repo = await import("./inviteRepository")

    const invite = await repo.createInvite({
      createdByUserId: "user-2",
      email: "b@example.com",
    })

    expect(invite.created_by_user_id).toBe("user-2")
    expect(invite.email).toBe("b@example.com")
  })

  it("does not allow fallback in preview or production", async () => {
    process.env.ALLOW_MOCK_INVITE_FALLBACK = "true"
    process.env.VERCEL_ENV = "preview"
    createAdminClient.mockReturnValue(buildClient({ error: new Error("db down") }))

    const repo = await import("./inviteRepository")

    await expect(
      repo.listInvitesByOwner("user-3")
    ).rejects.toBeDefined()
  })
})
