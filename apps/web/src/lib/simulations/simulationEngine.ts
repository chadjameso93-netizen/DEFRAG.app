import type { RelationalEventRecord } from "@/lib/data/eventRepository"
import type { InsightRecord } from "@/lib/data/insightRepository"
import type { RelationshipRecord } from "@/lib/data/relationshipRepository"

export type SimulationAction = "slow_down" | "clarify" | "set_boundary" | "revisit_later"

export type SimulationResult = {
  action: SimulationAction
  estimated_short_term_effect: string
  estimated_risk_level: number
  estimated_repair_opportunity: number
  why: string
}

type SimulationContext = {
  relationship: RelationshipRecord
  events: RelationalEventRecord[]
  latestInsight: InsightRecord | null
}

export function simulateRelationshipAction(
  action: SimulationAction,
  context: SimulationContext
): SimulationResult {
  const metrics = buildMetrics(context)

  if (action === "slow_down") {
    const risk = clamp(metrics.baseRisk - 0.18 - metrics.conflictPressure * 0.12)
    const repair = clamp(metrics.baseRepair + 0.18 + metrics.repairMomentum * 0.08)

    return {
      action,
      estimated_short_term_effect: "Conversation pressure may decrease.",
      estimated_risk_level: risk,
      estimated_repair_opportunity: repair,
      why:
        metrics.conflictPressure > 0.45
          ? "Recent tension appears to rise when the pace stays fast."
          : "A slower pace usually gives both sides more room to respond without escalation.",
    }
  }

  if (action === "clarify") {
    const risk = clamp(metrics.baseRisk - 0.04 + metrics.boundarySensitivity * 0.03)
    const repair = clamp(
      metrics.baseRepair +
        (metrics.misunderstandingSignal ? 0.2 : 0.08) +
        metrics.repairMomentum * 0.06
    )

    return {
      action,
      estimated_short_term_effect: "Misunderstanding may reduce if the message becomes more specific.",
      estimated_risk_level: risk,
      estimated_repair_opportunity: repair,
      why: metrics.misunderstandingSignal
        ? "Recent notes suggest confusion or crossed meaning rather than pure hostility."
        : "Clarifying intent can help when the pattern is active but still responsive.",
    }
  }

  if (action === "set_boundary") {
    const risk = clamp(metrics.baseRisk + 0.08 + metrics.conflictPressure * 0.05)
    const repair = clamp(metrics.baseRepair + 0.04 + metrics.trustBuffer * 0.05)

    return {
      action,
      estimated_short_term_effect: "Short-term defensiveness may increase while expectations become clearer.",
      estimated_risk_level: risk,
      estimated_repair_opportunity: repair,
      why:
        "A clear boundary can create immediate friction, but it also reduces ambiguity and preserves clarity over time.",
    }
  }

  const risk = clamp(metrics.baseRisk - 0.14 - metrics.conflictPressure * 0.07)
  const repair = clamp(metrics.baseRepair + (metrics.conflictPressure > 0.45 ? 0.1 : -0.02))

  return {
    action,
    estimated_short_term_effect: "Immediate pressure may drop if the topic is revisited later.",
    estimated_risk_level: risk,
    estimated_repair_opportunity: repair,
    why:
      metrics.conflictPressure > 0.45
        ? "Recent conflict density is high enough that waiting briefly is likely to reduce reactivity."
        : "Waiting can help, but momentum may fade if the pattern is already relatively calm.",
  }
}

function buildMetrics(context: SimulationContext) {
  const { relationship, events, latestInsight } = context
  const recentEvents = events.slice(0, 6)
  const conflictEvents = recentEvents.filter((event) => event.event_type === "conflict")
  const repairEvents = recentEvents.filter((event) => event.event_type === "repair")
  const averageSeverity =
    recentEvents.length > 0
      ? recentEvents.reduce((sum, event) => sum + event.severity, 0) / recentEvents.length
      : relationship.tension_score

  const notes = recentEvents.map((event) => (event.notes ?? "").toLowerCase()).join(" ")
  const summary = (latestInsight?.summary ?? "").toLowerCase()

  return {
    baseRisk: clamp(relationship.tension_score * 0.65 + averageSeverity * 0.35),
    baseRepair: clamp(relationship.trust_score * 0.6 + repairEvents.length * 0.08),
    conflictPressure: clamp(conflictEvents.length / Math.max(recentEvents.length, 1)),
    repairMomentum: clamp(repairEvents.length / Math.max(recentEvents.length, 1)),
    trustBuffer: clamp(relationship.trust_score),
    boundarySensitivity: notes.includes("boundary") || summary.includes("boundary") ? 0.5 : 0,
    misunderstandingSignal:
      notes.includes("misunderstand") ||
      notes.includes("confus") ||
      summary.includes("clarify") ||
      summary.includes("expectation"),
  }
}

function clamp(value: number) {
  if (value < 0) return 0
  if (value > 1) return 1
  return Number(value.toFixed(2))
}
