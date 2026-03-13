import type { FeatureVector } from "@defrag/feature-engine"

export type RelationalState = "stable" | "strained" | "destabilizing" | "repairing" | "avoidant"

export function detectState(features: FeatureVector): RelationalState {
  if (features.conflict_frequency > 0.6) return "destabilizing"
  if (features.repair_rate > 0.4) return "repairing"
  if (features.conversation_density < 0.2) return "avoidant"
  if (features.conflict_frequency > 0.3) return "strained"
  return "stable"
}
