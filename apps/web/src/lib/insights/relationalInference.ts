export type RelationalEvent = {
  id: string
  event_type: string
  severity: number
  notes: string | null
  occurred_at: string
  actor: string | null
  target: string | null
}

export type FeatureSet = {
  conflictFrequency: number
  repairAttempts: number
  withdrawalCount: number
  averageSeverity: number
  conflictRepairRatio: number
}

export type PatternType = "recurring_conflict" | "repair_cycle" | "distance_cycle" | "stable_dynamic"

export type InsightDraft = {
  pattern: PatternType
  summary: string
  guidance: string
  confidence: number
  evidence: string[]
  alternateExplanations: string[]
  features: FeatureSet
}

export function extractFeatures(events: RelationalEvent[]): FeatureSet {
  const conflicts = events.filter((event) => event.event_type === "conflict")
  const repairs = events.filter((event) => event.event_type === "repair")
  const withdrawals = events.filter((event) => event.event_type === "withdrawal")
  const totalSeverity = events.reduce((acc, event) => acc + clampSeverity(event.severity), 0)

  return {
    conflictFrequency: conflicts.length,
    repairAttempts: repairs.length,
    withdrawalCount: withdrawals.length,
    averageSeverity: events.length ? totalSeverity / events.length : 0,
    conflictRepairRatio: conflicts.length / Math.max(repairs.length, 1),
  }
}

export function classifyPattern(features: FeatureSet): PatternType {
  if (features.conflictFrequency >= 3 && features.conflictRepairRatio >= 1.5) {
    return "recurring_conflict"
  }

  if (features.repairAttempts >= features.conflictFrequency && features.repairAttempts >= 2) {
    return "repair_cycle"
  }

  if (features.withdrawalCount >= 2) {
    return "distance_cycle"
  }

  return "stable_dynamic"
}

export function buildInsight(events: RelationalEvent[]): InsightDraft {
  const features = extractFeatures(events)
  const pattern = classifyPattern(features)

  if (pattern === "recurring_conflict") {
    return {
      pattern,
      summary: "A disagreement pattern may be repeating.",
      guidance: "Slow the pace and clarify expectations before returning to the core topic.",
      confidence: 0.72,
      evidence: [
        `${features.conflictFrequency} conflict events logged`,
        `${features.repairAttempts} repair attempts logged`,
      ],
      alternateExplanations: [
        "Recent stress may be amplifying normal disagreements.",
        "Timing of difficult conversations may be too compressed.",
      ],
      features,
    }
  }

  if (pattern === "repair_cycle") {
    return {
      pattern,
      summary: "Repair attempts are active after difficult moments.",
      guidance: "Keep check-ins short and consistent while repair momentum is present.",
      confidence: 0.68,
      evidence: [
        `${features.repairAttempts} repair events logged`,
        `average severity ${Math.round(features.averageSeverity * 100)}%`,
      ],
      alternateExplanations: [
        "Conversations may still be tiring even when they improve.",
      ],
      features,
    }
  }

  if (pattern === "distance_cycle") {
    return {
      pattern,
      summary: "Distance appears to be increasing after tense moments.",
      guidance: "Use a low-pressure check-in to reduce distance before discussing major decisions.",
      confidence: 0.64,
      evidence: [`${features.withdrawalCount} withdrawal events logged`],
      alternateExplanations: ["Scheduling pressure may be limiting communication windows."],
      features,
    }
  }

  return {
    pattern,
    summary: "The relationship pattern appears relatively steady.",
    guidance: "Continue clear communication and monitor for sudden pressure shifts.",
    confidence: 0.56,
    evidence: [`${events.length} events reviewed`],
    alternateExplanations: ["More event history will improve confidence."],
    features,
  }
}

function clampSeverity(value: number) {
  if (Number.isNaN(value)) return 0
  if (value < 0) return 0
  if (value > 1) return 1
  return value
}
