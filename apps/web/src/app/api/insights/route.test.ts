import { beforeEach, describe, expect, it, vi } from "vitest"

const getRouteUserId = vi.fn()
const listRelationalEvents = vi.fn()
const createInsight = vi.fn()
const listInsights = vi.fn()
const buildInsight = vi.fn()
const composeNarrative = vi.fn()
const enforceLanguageGuardrails = vi.fn()

vi.mock("@/lib/auth/routeUser", () => ({ getRouteUserId }))
vi.mock("@/lib/data/eventRepository", () => ({ listRelationalEvents }))
vi.mock("@/lib/data/insightRepository", () => ({ createInsight, listInsights }))
vi.mock("@/lib/insights/relationalInference", () => ({ buildInsight }))
vi.mock("@defrag/narrative-composer", () => ({ composeNarrative }))
vi.mock("@defrag/language-governor", () => ({ enforceLanguageGuardrails }))

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
    composeNarrative.mockReturnValue({
      narrative: "Acknowledgement: That sounds difficult.\n\nPattern Context: Pressure is rising.\n\nInsight: A disagreement pattern may be repeating.\n\nGuidance: Slow the pace.\n\nReflection Prompt: What changes when things slow down?",
      sections: {},
    })
    enforceLanguageGuardrails
      .mockReturnValueOnce({
        text: "normal input",
        rewritten: false,
        issues: [],
        simulationDisabled: false,
        crisisDetected: false,
      })
      .mockReturnValueOnce({
        text: "Acknowledgement: That sounds difficult.\n\nPattern Context: Pressure is rising.\n\nInsight: A disagreement pattern may be repeating.\n\nGuidance: Slow the pace.\n\nReflection Prompt: What changes when things slow down?",
        rewritten: false,
        issues: [],
        simulationDisabled: false,
        crisisDetected: false,
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
    expect(json.ok).toBe(true)
    expect(json.narrative).toContain("Acknowledgement:")
    expect(json.guardrail).toEqual({
      rewritten: false,
      issues: [],
      simulation_disabled: false,
    })
    expect(json.pattern).toBe("recurring_conflict")
    expect(json.features).toEqual(expect.objectContaining({ conflictFrequency: 3 }))
  })

  it("short-circuits to safe response for crisis language", async () => {
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
      new Request("http://localhost/api/insights", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: "I want to die" }),
      })
    )

    expect(res.status).toBe(200)
    expect(createInsight).not.toHaveBeenCalled()
    const json = await res.json()
    expect(json.guardrail.simulation_disabled).toBe(true)
    expect(json.guardrail.issues).toContain("crisis_signal")
  })

  it("returns rewritten guardrail metadata when language is softened", async () => {
    getRouteUserId.mockResolvedValue("user-1")
    listRelationalEvents.mockResolvedValue([])
    buildInsight.mockReturnValue({
      pattern: "stable_dynamic",
      summary: "The relationship pattern appears relatively steady.",
      guidance: "Continue clear communication.",
      confidence: 0.56,
      evidence: ["0 events reviewed"],
      alternateExplanations: ["More events improve confidence"],
      features: { conflictFrequency: 0 },
    })
    composeNarrative.mockReturnValue({
      narrative: "Acknowledgement: This always gets toxic.\n\nPattern Context: Pressure appears.\n\nInsight: ...\n\nGuidance: ...\n\nReflection Prompt: ...",
      sections: {},
    })
    enforceLanguageGuardrails
      .mockReturnValueOnce({
        text: "safe input",
        rewritten: false,
        issues: [],
        simulationDisabled: false,
        crisisDetected: false,
      })
      .mockReturnValueOnce({
        text: "Acknowledgement: This sometimes gets high-pressure.",
        rewritten: true,
        issues: ["certainty_language", "judgment_language"],
        simulationDisabled: false,
        crisisDetected: false,
      })
    createInsight.mockResolvedValue({ id: "ins-2", summary: "Acknowledgement: This sometimes gets high-pressure." })

    const { POST } = await import("./route")
    const res = await POST(
      new Request("http://localhost/api/insights", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: "help me understand this" }),
      })
    )

    expect(res.status).toBe(201)
    const json = await res.json()
    expect(json.guardrail.rewritten).toBe(true)
    expect(json.guardrail.issues).toEqual(expect.arrayContaining(["certainty_language", "judgment_language"]))
  })
})
