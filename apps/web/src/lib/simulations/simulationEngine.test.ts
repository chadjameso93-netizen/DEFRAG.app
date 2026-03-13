import { describe, expect, it } from "vitest"
import { simulateRelationshipAction } from "./simulationEngine"

const relationship = {
  id: "rel-1",
  user_id: "user-1",
  source_name: "You",
  target_name: "Partner",
  relationship_type: "personal",
  tension_score: 0.68,
  trust_score: 0.52,
  created_at: "2026-03-13T00:00:00.000Z",
}

const escalatingEvents = [
  {
    id: "evt-1",
    user_id: "user-1",
    relationship_id: "rel-1",
    event_type: "conflict",
    actor: "You",
    target: "Partner",
    severity: 0.8,
    notes: "Conversation escalated quickly.",
    occurred_at: "2026-03-12T00:00:00.000Z",
    created_at: "2026-03-12T00:00:00.000Z",
  },
  {
    id: "evt-2",
    user_id: "user-1",
    relationship_id: "rel-1",
    event_type: "conflict",
    actor: "Partner",
    target: "You",
    severity: 0.72,
    notes: "Misunderstanding about expectations.",
    occurred_at: "2026-03-11T00:00:00.000Z",
    created_at: "2026-03-11T00:00:00.000Z",
  },
  {
    id: "evt-3",
    user_id: "user-1",
    relationship_id: "rel-1",
    event_type: "repair",
    actor: "You",
    target: "Partner",
    severity: 0.25,
    notes: "Boundary conversation helped later.",
    occurred_at: "2026-03-10T00:00:00.000Z",
    created_at: "2026-03-10T00:00:00.000Z",
  },
]

const insight = {
  id: "ins-1",
  user_id: "user-1",
  relationship_id: "rel-1",
  summary: "Clarify expectations and slow the pace when pressure is rising.",
  confidence: 0.72,
  evidence: [],
  alternate_explanations: [],
  created_at: "2026-03-13T00:00:00.000Z",
}

describe("simulationEngine", () => {
  it("slow_down lowers risk when escalation pressure is present", () => {
    const result = simulateRelationshipAction("slow_down", {
      relationship,
      events: escalatingEvents,
      latestInsight: insight,
    })

    expect(result.estimated_risk_level).toBeLessThan(0.6)
    expect(result.estimated_short_term_effect).toContain("pressure")
  })

  it("clarify raises repair opportunity for misunderstanding patterns", () => {
    const result = simulateRelationshipAction("clarify", {
      relationship,
      events: escalatingEvents,
      latestInsight: insight,
    })

    expect(result.estimated_repair_opportunity).toBeGreaterThan(0.45)
    expect(result.why.toLowerCase()).toContain("confusion")
  })

  it("set_boundary can increase short-term defensiveness while preserving clarity", () => {
    const result = simulateRelationshipAction("set_boundary", {
      relationship,
      events: escalatingEvents,
      latestInsight: insight,
    })

    expect(result.estimated_short_term_effect.toLowerCase()).toContain("defensiveness")
    expect(result.estimated_risk_level).toBeGreaterThan(0.5)
  })

  it("revisit_later lowers pressure when recent conflict density is high", () => {
    const result = simulateRelationshipAction("revisit_later", {
      relationship,
      events: escalatingEvents,
      latestInsight: insight,
    })

    expect(result.estimated_risk_level).toBeLessThan(0.6)
    expect(result.why.toLowerCase()).toContain("conflict density")
  })
})
