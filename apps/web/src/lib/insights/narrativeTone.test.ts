import { describe, expect, it } from "vitest"
import { composeNarrative } from "@defrag/narrative-composer"

describe("narrative composer", () => {
  it("returns five-part response shape", () => {
    const response = composeNarrative({
      acknowledgement: "That sounds difficult.",
      patternContext: "A pressure pattern may be repeating.",
      insight: "Conversations may be accelerating under stress.",
      guidance: "Slow the pace and clarify one expectation.",
      reflectionPrompt: "What changes when you pause first?",
    })

    expect(response.sections.acknowledgement).toBeTruthy()
    expect(response.sections.patternContext).toBeTruthy()
    expect(response.sections.insight).toBeTruthy()
    expect(response.sections.guidance).toBeTruthy()
    expect(response.sections.reflectionPrompt).toBeTruthy()

    expect(response.narrative).toContain("Acknowledgement:")
    expect(response.narrative).toContain("Pattern Context:")
    expect(response.narrative).toContain("Insight:")
    expect(response.narrative).toContain("Guidance:")
    expect(response.narrative).toContain("Reflection Prompt:")
  })
})
