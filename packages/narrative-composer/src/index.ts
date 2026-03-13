export type NarrativeInput = {
  acknowledgement: string
  patternContext: string
  insight: string
  guidance: string
  reflectionPrompt: string
}

export type NarrativeOutput = {
  narrative: string
  sections: {
    acknowledgement: string
    patternContext: string
    insight: string
    guidance: string
    reflectionPrompt: string
  }
}

export function composeNarrative(input: NarrativeInput): NarrativeOutput {
  const sections = {
    acknowledgement: normalize(input.acknowledgement),
    patternContext: normalize(input.patternContext),
    insight: normalize(input.insight),
    guidance: normalize(input.guidance),
    reflectionPrompt: normalize(input.reflectionPrompt),
  }

  const narrative = [
    `Acknowledgement: ${sections.acknowledgement}`,
    `Pattern Context: ${sections.patternContext}`,
    `Insight: ${sections.insight}`,
    `Guidance: ${sections.guidance}`,
    `Reflection Prompt: ${sections.reflectionPrompt}`,
  ].join("\n\n")

  return { narrative, sections }
}

function normalize(text: string) {
  return text.trim().replace(/\s+/g, " ")
}
