import { beforeEach, describe, expect, it, vi } from "vitest"

const getRouteUserId = vi.fn()
const listRelationalEvents = vi.fn()
const createInsight = vi.fn()
const listInsights = vi.fn()
const buildInsight = vi.fn()

vi.mock("@/lib/auth/routeUser", () => ({ getRouteUserId }))
vi.mock("@/lib/data/eventRepository", () => ({ listRelationalEvents }))
vi.mock("@/lib/data/insightRepository", () => ({ createInsight, listInsights }))
vi.mock("@/lib/insights/relationalInference", () => ({ buildInsight }))

describe("/api/insights", () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it("returns 401 unauthenticated", async () => {
    getRouteUserId.mockResolvedValue(null)
    const { GET } = await import("./route")

    const res = await GET()
    expect(res.status).toBe(401)
  })

  it("lists persisted insights", async () => {
    getRouteUserId.mockResolvedValue("user-1")
    listInsights.mockResolvedValue([{ id: "ins-1" }])

    const { GET } = await import("./route")
    const res = await GET()

    expect(res.status).toBe(200)
    expect(listInsights).toHaveBeenCalledWith("user-1")
  })

  it("generates structured insight and persists it", async () => {
    getRouteUserId.mockResolvedValue("user-1")
    listRelationalEvents.mockResolvedValue([{ id: "evt-1", event_type: "conflict" }])
    buildInsight.mockReturnValue({
      pattern: "recurring_conflict",
      summary: "A disagreement pattern may be repeating.",
      guidance: "Slow the pace.",
      confidence: 0.72,
      evidence: ["3 conflict events logged"],
      alternateExplanations: ["Timing pressure"],
      features: { conflictFrequency: 3 },
    })
    createInsight.mockResolvedValue({ id: "ins-1", summary: "A disagreement pattern may be repeating. Slow the pace." })

    const { POST } = await import("./route")
    const res = await POST(
      new Request("http://localhost/api/insights", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({}),
      })
    )

    expect(res.status).toBe(201)
    expect(listRelationalEvents).toHaveBeenCalledWith("user-1")
    expect(createInsight).toHaveBeenCalled()

    const json = await res.json()
    expect(json.pattern).toBe("recurring_conflict")
    expect(json.features).toEqual(expect.objectContaining({ conflictFrequency: 3 }))
  })
})
