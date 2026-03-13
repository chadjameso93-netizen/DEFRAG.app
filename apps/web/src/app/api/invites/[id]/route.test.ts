import { beforeEach, describe, expect, it, vi } from "vitest"

const getInviteById = vi.fn()
const completeInvite = vi.fn()
const getOptionalAuthenticatedUserId = vi.fn()

vi.mock("@/lib/data/inviteRepository", () => ({
  getInviteById,
  completeInvite,
}))

vi.mock("@/lib/auth/routeUser", () => ({
  getOptionalAuthenticatedUserId,
}))

describe("/api/invites/[id] route", () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it("returns 404 for missing invite", async () => {
    getInviteById.mockResolvedValue(undefined)
    const { GET } = await import("./route")

    const res = await GET(new Request("http://localhost"), {
      params: Promise.resolve({ id: "missing" }),
    })

    expect(res.status).toBe(404)
  })

  it("completes intake and returns alreadyCompleted for duplicate", async () => {
    getOptionalAuthenticatedUserId.mockResolvedValue(null)
    completeInvite.mockResolvedValue({
      invite: { id: "inv-1", status: "completed" },
      alreadyCompleted: true,
    })

    const { POST } = await import("./route")

    const res = await POST(
      new Request("http://localhost", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          fullName: "Alex",
          birthDate: "1990-01-01",
          birthTime: "09:00",
          birthPlace: "Boston",
        }),
      }),
      { params: Promise.resolve({ id: "inv-1" }) }
    )

    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.alreadyCompleted).toBe(true)
  })

  it("rejects incomplete intake payload", async () => {
    const { POST } = await import("./route")

    const res = await POST(
      new Request("http://localhost", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ fullName: "" }),
      }),
      { params: Promise.resolve({ id: "inv-1" }) }
    )

    expect(res.status).toBe(400)
  })
})
