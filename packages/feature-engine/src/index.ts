import type { Event, Relationship } from "@defrag/relational-schema"

export type FeatureVector = {
  conflict_frequency: number
  repair_rate: number
  withdrawal_latency: number
  conversation_density: number
}

export function buildFeatureVector(events: Event[], relationships: Relationship[]): FeatureVector {
  const total = events.length || 1
  const conflictCount = events.filter((e) => e.event_type === "conflict").length
  const repairCount = events.filter((e) => e.event_type === "repair").length
  const conversationCount = events.filter((e) => e.event_type === "conversation").length

  return {
    conflict_frequency: conflictCount / total,
    repair_rate: repairCount / total,
    withdrawal_latency: 0.5,
    conversation_density: conversationCount / total,
  }
}
