export type ExplanationInput = {
  summary: string
  confidence: number
  evidence: string[]
  alternate_explanations: string[]
}

export function buildNarrative(input: ExplanationInput) {
  const evidence = input.evidence.length ? input.evidence.join("; ") : "No strong evidence yet."
  const alternates = input.alternate_explanations.length ? input.alternate_explanations.join("; ") : "No alternate explanation found."

  return {
    narrative: `${input.summary} Evidence: ${evidence} Alternate: ${alternates}`,
  }
}
