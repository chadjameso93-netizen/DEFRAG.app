import { beforeEach, describe, expect, it, vi } from "vitest"

const requireAuthenticatedUserId = vi.fn()
const listInvites = vi.fn()
const createInvite = vi.fn()

vi.mock("@/lib/auth/routeUser", () => ({
  requireAuthenticatedUserId,
}))

vi.mock("@/lib/data/inviteRepository", () => ({
  listInvites,
  createInvite,
}))

describe("/api/invites route", () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it("returns 401 for unauthenticated create", async () => {
    requireAuthenticatedUserId.mockResolvedValue(null)
    const { POST } = await import("./route")

    const req = new Request("http://localhost:3000/api/invites", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "Alex", deliveryMethod: "manual" }),
    })

    const res = await POST(req)
    expect(res.status).toBe(401)
  })

  it("returns 400 for invalid create payload", async () => {
    requireAuthenticatedUserId.mockResolvedValue("user-1")
    const { POST } = await import("./route")

    const req = new Request("http://localhost:3000/api/invites", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "", deliveryMethod: "email" }),
    })

    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it("stores authenticated owner id on create", async () => {
    requireAuthenticatedUserId.mockResolvedValue("user-123")
    createInvite.mockResolvedValue({ id: "inv-1", name: "Alex" })

    const { POST } = await import("./route")

    const req = new Request("http://localhost:3000/api/invites", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "Alex", relationship: "personal", deliveryMethod: "manual" }),
    })

    const res = await POST(req)
    expect(res.status).toBe(200)
    expect(createInvite).toHaveBeenCalledWith(
      expect.objectContaining({
        createdByUserId: "user-123",
      })
    )
  })

  it("returns 401 for unauthenticated list", async () => {
    requireAuthenticatedUserId.mockResolvedValue(null)
    const { GET } = await import("./route")

    const res = await GET()
    expect(res.status).toBe(401)
  })

  it("returns invites for authenticated list", async () => {
    requireAuthenticatedUserId.mockResolvedValue("user-123")
    listInvites.mockResolvedValue([{ id: "inv-1" }])
    const { GET } = await import("./route")

    const res = await GET()
    expect(res.status).toBe(200)
  })
})
