import { beforeEach, describe, expect, it, vi } from "vitest"

const getRouteUserId = vi.fn()
const listRelationships = vi.fn()
const listRelationalEvents = vi.fn()
const listInsights = vi.fn()
const enforceLanguageGuardrails = vi.fn()
const simulateRelationshipAction = vi.fn()

vi.mock("@/lib/auth/routeUser", () => ({ getRouteUserId }))
vi.mock("@/lib/data/relationshipRepository", () => ({ listRelationships }))
vi.mock("@/lib/data/eventRepository", () => ({ listRelationalEvents }))
vi.mock("@/lib/data/insightRepository", () => ({ listInsights }))
vi.mock("@defrag/language-governor", () => ({ enforceLanguageGuardrails }))
vi.mock("@/lib/simulations/simulationEngine", () => ({ simulateRelationshipAction }))

describe("/api/simulation", () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it("returns 401 without auth", async () => {
    getRouteUserId.mockResolvedValue(null)
    const { POST } = await import("./route")

    const res = await POST(
      new Request("http://localhost/api/simulation", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          relationship_id: "11111111-1111-4111-8111-111111111111",
          action: "slow_down",
        }),
      })
    )

    expect(res.status).toBe(401)
  })

  it("returns 404 when relationship is missing", async () => {
    getRouteUserId.mockResolvedValue("user-1")
    enforceLanguageGuardrails.mockReturnValue({
      text: "",
      rewritten: false,
      issues: [],
      simulationDisabled: false,
      crisisDetected: false,
    })
    listRelationships.mockResolvedValue([])
    listRelationalEvents.mockResolvedValue([])
    listInsights.mockResolvedValue([])
    const { POST } = await import("./route")

    const res = await POST(
      new Request("http://localhost/api/simulation", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          relationship_id: "11111111-1111-4111-8111-111111111111",
          action: "slow_down",
        }),
      })
    )

    expect(res.status).toBe(404)
  })

  it("returns structured simulation for valid input", async () => {
    getRouteUserId.mockResolvedValue("user-1")
    enforceLanguageGuardrails.mockReturnValue({
      text: "note",
      rewritten: false,
      issues: [],
      simulationDisabled: false,
      crisisDetected: false,
    })
    listRelationships.mockResolvedValue([
      {
        id: "11111111-1111-4111-8111-111111111111",
        target_name: "Partner",
      },
    ])
    listRelationalEvents.mockResolvedValue([
      { relationship_id: "11111111-1111-4111-8111-111111111111", target: "Partner" },
    ])
    listInsights.mockResolvedValue([{ relationship_id: "11111111-1111-4111-8111-111111111111" }])
    simulateRelationshipAction.mockReturnValue({
      action: "slow_down",
      estimated_short_term_effect: "Conversation pressure may decrease.",
      estimated_risk_level: 0.22,
      estimated_repair_opportunity: 0.58,
      why: "Recent tension appears to rise when conversations move quickly.",
    })
    const { POST } = await import("./route")

    const res = await POST(
      new Request("http://localhost/api/simulation", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          relationship_id: "11111111-1111-4111-8111-111111111111",
          action: "slow_down",
          context_note: "Things escalate quickly.",
        }),
      })
    )

    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.simulation.action).toBe("slow_down")
    expect(json.guardrail.simulation_disabled).toBe(false)
  })

  it("disables simulation during crisis mode", async () => {
    getRouteUserId.mockResolvedValue("user-1")
    enforceLanguageGuardrails.mockReturnValue({
      text: "Support is available and you don't have to face this alone.",
      rewritten: true,
      issues: ["crisis_signal"],
      simulationDisabled: true,
      crisisDetected: true,
    })
    const { POST } = await import("./route")

    const res = await POST(
      new Request("http://localhost/api/simulation", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          relationship_id: "11111111-1111-4111-8111-111111111111",
          action: "slow_down",
          context_note: "I want to die",
        }),
      })
    )

    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.simulation).toBeNull()
    expect(json.guardrail.simulation_disabled).toBe(true)
  })
})
