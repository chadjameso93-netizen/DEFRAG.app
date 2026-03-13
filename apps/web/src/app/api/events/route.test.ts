import { beforeEach, describe, expect, it, vi } from "vitest"

const getRouteUserId = vi.fn()
const createRelationalEvent = vi.fn()
const listRelationalEvents = vi.fn()

vi.mock("@/lib/auth/routeUser", () => ({ getRouteUserId }))
vi.mock("@/lib/data/eventRepository", () => ({
  createRelationalEvent,
  listRelationalEvents,
}))

describe("/api/events", () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it("returns 401 for unauthenticated list", async () => {
    getRouteUserId.mockResolvedValue(null)
    const { GET } = await import("./route")
    const res = await GET()
    expect(res.status).toBe(401)
  })

  it("creates event for authenticated user", async () => {
    getRouteUserId.mockResolvedValue("user-1")
    createRelationalEvent.mockResolvedValue({ id: "evt-1" })
    const { POST } = await import("./route")

    const res = await POST(
      new Request("http://localhost/api/events", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ eventType: "conflict", severity: 0.7, notes: "Raised voices" }),
      })
    )

    expect(res.status).toBe(201)
    expect(createRelationalEvent).toHaveBeenCalledWith(
      expect.objectContaining({ userId: "user-1", eventType: "conflict" })
    )
  })

  it("accepts relationship linkage on create", async () => {
    getRouteUserId.mockResolvedValue("user-1")
    createRelationalEvent.mockResolvedValue({ id: "evt-2", relationship_id: "11111111-1111-4111-8111-111111111111" })
    const { POST } = await import("./route")

    const res = await POST(
      new Request("http://localhost/api/events", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          relationshipId: "11111111-1111-4111-8111-111111111111",
          eventType: "repair",
          severity: 0.3,
        }),
      })
    )

    expect(res.status).toBe(201)
    expect(createRelationalEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        relationshipId: "11111111-1111-4111-8111-111111111111",
        eventType: "repair",
      })
    )
  })

  it("returns owned event records", async () => {
    getRouteUserId.mockResolvedValue("user-2")
    listRelationalEvents.mockResolvedValue([{ id: "evt-1", user_id: "user-2" }])

    const { GET } = await import("./route")
    const res = await GET()

    expect(res.status).toBe(200)
    expect(listRelationalEvents).toHaveBeenCalledWith("user-2")
    const json = await res.json()
    expect(json.events).toHaveLength(1)
  })
})
