import { beforeEach, describe, expect, it, vi } from "vitest"

const getRouteUserId = vi.fn()
const getInviteByToken = vi.fn()
const markInviteOpened = vi.fn()
const completeInvite = vi.fn()

vi.mock("@/lib/auth/routeUser", () => ({
  getRouteUserId,
}))

vi.mock("@/lib/data/inviteRepository", () => ({
  getInviteByToken,
  markInviteOpened,
  completeInvite,
}))

describe("/api/invites/[id]", () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it("gets a valid invite and marks opened", async () => {
    getInviteByToken.mockResolvedValue({ id: "inv_1", invite_token: "token-1" })
    getRouteUserId.mockResolvedValue("user-1")
    const { GET } = await import("./route")

    const res = await GET(new Request("http://localhost/api/invites/token-1"), {
      params: Promise.resolve({ id: "token-1" }),
    })

    expect(res.status).toBe(200)
    expect(markInviteOpened).toHaveBeenCalledWith("token-1", "user-1")
  })

  it("opens invite without auth context", async () => {
    getInviteByToken.mockResolvedValue({ id: "inv_1", invite_token: "token-1" })
    getRouteUserId.mockResolvedValue(null)
    const { GET } = await import("./route")

    const res = await GET(new Request("http://localhost/api/invites/token-1"), {
      params: Promise.resolve({ id: "token-1" }),
    })

    expect(res.status).toBe(200)
    expect(markInviteOpened).toHaveBeenCalledWith("token-1", null)
  })


  it("returns completed invite on refresh", async () => {
    getInviteByToken.mockResolvedValue({ id: "inv_1", invite_token: "token-1", status: "completed" })
    const { GET } = await import("./route")

    const res = await GET(new Request("http://localhost/api/invites/token-1"), {
      params: Promise.resolve({ id: "token-1" }),
    })

    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.invite.status).toBe("completed")
  })
  it("returns 404 for missing invite", async () => {
    getInviteByToken.mockResolvedValue(null)
    const { GET } = await import("./route")

    const res = await GET(new Request("http://localhost/api/invites/missing"), {
      params: Promise.resolve({ id: "missing" }),
    })

    expect(res.status).toBe(404)
  })

  it("persists intake completion", async () => {
    getRouteUserId.mockResolvedValue("actor-1")
    completeInvite.mockResolvedValue({
      ok: true,
      notFound: false,
      alreadyCompleted: false,
      invite: { id: "inv_1" },
    })

    const { POST } = await import("./route")
    const res = await POST(
      new Request("http://localhost/api/invites/token-1", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: "Pat Doe",
          birthDate: "1990-01-01",
          birthTime: "09:30",
          birthLocation: "Austin, TX",
        }),
      }),
      { params: Promise.resolve({ id: "token-1" }) }
    )

    expect(res.status).toBe(200)
    expect(completeInvite).toHaveBeenCalledWith(
      expect.objectContaining({ tokenOrId: "token-1", actorUserId: "actor-1" })
    )
  })

  it("returns alreadyCompleted on duplicate completion", async () => {
    completeInvite.mockResolvedValue({
      ok: true,
      notFound: false,
      alreadyCompleted: true,
      invite: { id: "inv_1" },
    })

    const { POST } = await import("./route")
    const res = await POST(
      new Request("http://localhost/api/invites/token-1", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: "Pat Doe",
          birthDate: "1990-01-01",
          birthTime: "09:30",
          birthLocation: "Austin, TX",
        }),
      }),
      { params: Promise.resolve({ id: "token-1" }) }
    )

    const json = await res.json()
    expect(res.status).toBe(200)
    expect(json.alreadyCompleted).toBe(true)
  })
})
