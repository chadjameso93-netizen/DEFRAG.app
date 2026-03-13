import { beforeEach, describe, expect, it, vi } from "vitest"

const getRouteUserId = vi.fn()
const createInvite = vi.fn()
const listInvitesByOwner = vi.fn()

vi.mock("@/lib/auth/routeUser", () => ({
  getRouteUserId,
}))

vi.mock("@/lib/data/inviteRepository", () => ({
  createInvite,
  listInvitesByOwner,
}))

describe("/api/invites", () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it("returns 401 without auth", async () => {
    getRouteUserId.mockResolvedValue(null)
    const { POST } = await import("./route")

    const req = new Request("http://localhost/api/invites", {
      method: "POST",
      body: JSON.stringify({ email: "person@example.com" }),
      headers: { "content-type": "application/json" },
    })

    const res = await POST(req)
    expect(res.status).toBe(401)
  })

  it("returns 400 for invalid create payload", async () => {
    getRouteUserId.mockResolvedValue("user-1")
    const { POST } = await import("./route")

    const req = new Request("http://localhost/api/invites", {
      method: "POST",
      body: JSON.stringify({}),
      headers: { "content-type": "application/json" },
    })

    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it("creates invite with authenticated owner", async () => {
    getRouteUserId.mockResolvedValue("user-123")
    createInvite.mockResolvedValue({ id: "i-1" })

    const { POST } = await import("./route")
    const req = new Request("http://localhost/api/invites", {
      method: "POST",
      body: JSON.stringify({ email: "person@example.com" }),
      headers: { "content-type": "application/json" },
    })

    const res = await POST(req)
    expect(res.status).toBe(201)
    expect(createInvite).toHaveBeenCalledWith(
      expect.objectContaining({
        createdByUserId: "user-123",
        email: "person@example.com",
      })
    )
  })

  it("lists invites for authenticated user", async () => {
    getRouteUserId.mockResolvedValue("user-456")
    listInvitesByOwner.mockResolvedValue([{ id: "i-1" }])

    const { GET } = await import("./route")
    const res = await GET()

    expect(res.status).toBe(200)
    expect(listInvitesByOwner).toHaveBeenCalledWith("user-456")
  })
})
