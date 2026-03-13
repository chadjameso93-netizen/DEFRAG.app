import type { FeatureVector } from "@defrag/feature-engine"

export type Pattern = {
  key: "pursue_withdraw" | "conflict_cycle" | "triangulation" | "emotional_cutoff" | "none"
  confidence: number
}

export function detectPatterns(features: FeatureVector): Pattern[] {
  if (features.conflict_frequency > 0.5 && features.repair_rate < 0.2) {
    return [{ key: "conflict_cycle", confidence: 0.62 }]
  }
  if (features.withdrawal_latency > 0.7) {
    return [{ key: "emotional_cutoff", confidence: 0.55 }]
  }
  return [{ key: "none", confidence: 0.4 }]
}
