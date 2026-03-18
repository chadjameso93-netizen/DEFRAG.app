import { beforeEach, describe, expect, it, vi } from "vitest"

const getUser = vi.fn()
const from = vi.fn()
const ensureProfile = vi.fn()

vi.mock("@/lib/supabase/server", () => ({
  createServerClient: vi.fn(async () => ({
    auth: {
      getUser,
    },
    from,
  })),
}))

vi.mock("@/lib/profile", async () => {
  const actual = await vi.importActual<typeof import("@/lib/profile")>("@/lib/profile")
  return {
    ...actual,
    ensureProfile,
  }
})

describe("/api/onboarding/submit", () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it("returns 401 when no authenticated user is present", async () => {
    getUser.mockResolvedValue({ data: { user: null } })
    const { POST } = await import("./route")

    const response = await POST(
      new Request("http://localhost/api/onboarding/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ dob: "1990-01-01" }),
      }),
    )

    expect(response.status).toBe(401)
  })

  it("returns 400 for invalid payloads", async () => {
    getUser.mockResolvedValue({ data: { user: { id: "user-1" } } })
    const { POST } = await import("./route")

    const response = await POST(
      new Request("http://localhost/api/onboarding/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ dob: "" }),
      }),
    )

    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toMatchObject({ error: "dob_required" })
  })

  it("writes the authenticated user id into the birthline upsert", async () => {
    getUser.mockResolvedValue({ data: { user: { id: "user-123" } } })

    const upsert = vi.fn().mockResolvedValue({ error: null })
    from.mockReturnValue({
      upsert,
    })

    const { POST } = await import("./route")

    const response = await POST(
      new Request("http://localhost/api/onboarding/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          full_name: "Alex",
          dob: "1990-01-01",
          birth_time: null,
          birth_city: "Boston",
          time_confidence: "unknown",
        }),
      }),
    )

    expect(response.status).toBe(200)
    expect(from).toHaveBeenCalledWith("birthlines")
    expect(upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: "user-123",
        timing_accuracy: "unknown",
      }),
      { onConflict: "user_id" },
    )
    expect(ensureProfile).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        userId: "user-123",
        birthDate: "1990-01-01",
      }),
    )
  })
})
