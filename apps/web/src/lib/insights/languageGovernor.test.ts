import { describe, expect, it } from "vitest"
import { enforceLanguageGuardrails } from "@defrag/language-governor"

describe("language governor", () => {
  it("rewrites banned and certainty language", () => {
    const result = enforceLanguageGuardrails("This always fails in the power grid.")

    expect(result.rewritten).toBe(true)
    expect(result.issues).toContain("banned_term")
    expect(result.issues).toContain("certainty_language")
    expect(result.text.toLowerCase()).not.toContain("power grid")
    expect(result.text.toLowerCase()).not.toContain("always")
  })

  it("rewrites labeling and judgment language", () => {
    const result = enforceLanguageGuardrails("You are avoidant and this is toxic.")

    expect(result.issues).toContain("labeling_language")
    expect(result.issues).toContain("judgment_language")
    expect(result.text.toLowerCase()).not.toContain("toxic")
  })

  it("short-circuits crisis language and disables simulation", () => {
    const result = enforceLanguageGuardrails("I want to die")

    expect(result.crisisDetected).toBe(true)
    expect(result.simulationDisabled).toBe(true)
    expect(result.issues).toContain("crisis_signal")
  })
})
