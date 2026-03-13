import { describe, expect, it } from "vitest"
import { buildInsight, classifyPattern, extractFeatures } from "./relationalInference"

describe("relationalInference", () => {
  it("extracts conflict and repair features", () => {
    const features = extractFeatures([
      { id: "1", event_type: "conflict", severity: 0.7, notes: null, occurred_at: "2026-01-01", actor: null, target: null },
      { id: "2", event_type: "repair", severity: 0.3, notes: null, occurred_at: "2026-01-02", actor: null, target: null },
    ])

    expect(features.conflictFrequency).toBe(1)
    expect(features.repairAttempts).toBe(1)
    expect(features.conflictRepairRatio).toBe(1)
  })

  it("classifies recurring conflict", () => {
    const pattern = classifyPattern({
      conflictFrequency: 3,
      repairAttempts: 1,
      withdrawalCount: 0,
      averageSeverity: 0.7,
      conflictRepairRatio: 3,
    })

    expect(pattern).toBe("recurring_conflict")
  })

  it("builds stable insight when events are low", () => {
    const insight = buildInsight([])
    expect(insight.pattern).toBe("stable_dynamic")
    expect(insight.summary).toContain("relatively steady")
  })
})
