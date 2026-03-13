import { beforeEach, describe, expect, it, vi } from "vitest"

const getRouteUserId = vi.fn()
const listRelationships = vi.fn()
const createRelationship = vi.fn()

vi.mock("@/lib/auth/routeUser", () => ({ getRouteUserId }))
vi.mock("@/lib/data/relationshipRepository", () => ({
  listRelationships,
  createRelationship,
}))

describe("/api/relationships", () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it("returns 401 for unauthenticated list", async () => {
    getRouteUserId.mockResolvedValue(null)
    const { GET } = await import("./route")

    const res = await GET()
    expect(res.status).toBe(401)
  })

  it("creates relationship for authenticated user", async () => {
    getRouteUserId.mockResolvedValue("user-1")
    createRelationship.mockResolvedValue({ id: "rel-1", user_id: "user-1" })

    const { POST } = await import("./route")
    const res = await POST(
      new Request("http://localhost/api/relationships", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ targetName: "Partner", relationshipType: "personal" }),
      })
    )

    expect(res.status).toBe(201)
    expect(createRelationship).toHaveBeenCalledWith(
      expect.objectContaining({ userId: "user-1", targetName: "Partner" })
    )
  })

  it("lists only owned relationships", async () => {
    getRouteUserId.mockResolvedValue("user-2")
    listRelationships.mockResolvedValue([{ id: "rel-1", user_id: "user-2" }])

    const { GET } = await import("./route")
    const res = await GET()

    expect(res.status).toBe(200)
    expect(listRelationships).toHaveBeenCalledWith("user-2")
    const json = await res.json()
    expect(json.relationships).toHaveLength(1)
  })
})
