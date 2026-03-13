export type GuardrailIssue =
  | "banned_term"
  | "certainty_language"
  | "judgment_language"
  | "labeling_language"
  | "crisis_signal"

export type GuardrailResult = {
  text: string
  rewritten: boolean
  issues: GuardrailIssue[]
  simulationDisabled: boolean
  crisisDetected: boolean
}

const BANNED_TERMS = [
  "power grid",
  "encryption layer",
  "lateral stabilizer",
  "peripheral node",
]

const CERTAINTY_PATTERNS = ["always", "never", "guaranteed", "inevitable", "certain"]
const JUDGMENT_PATTERNS = ["fault", "blame", "toxic", "broken", "crazy", "irrational"]
const LABELING_PATTERNS = ["you are avoidant", "you are narcissistic", "manipulator", "narcissist"]
const CRISIS_PATTERNS = [
  "i want to die",
  "i want to hurt myself",
  "i want to hurt someone",
  "i can't go on",
  "i cant go on",
]

const CERTAINTY_REWRITES: Array<{ pattern: RegExp; replacement: string }> = [
  { pattern: /\balways\b/gi, replacement: "sometimes" },
  { pattern: /\bnever\b/gi, replacement: "rarely" },
  { pattern: /\bguaranteed\b/gi, replacement: "likely" },
  { pattern: /\binevitable\b/gi, replacement: "possible" },
  { pattern: /\bcertain\b/gi, replacement: "probable" },
]

const JUDGMENT_REWRITES: Array<{ pattern: RegExp; replacement: string }> = [
  { pattern: /\btoxic\b/gi, replacement: "high-pressure" },
  { pattern: /\bbroken\b/gi, replacement: "strained" },
  { pattern: /\bcrazy\b/gi, replacement: "overwhelming" },
  { pattern: /\birrational\b/gi, replacement: "hard to interpret" },
  { pattern: /\bblame\b/gi, replacement: "responsibility" },
  { pattern: /\bfault\b/gi, replacement: "contributing pattern" },
]

const LABELING_REWRITES: Array<{ pattern: RegExp; replacement: string }> = [
  { pattern: /\byou are avoidant\b/gi, replacement: "distance may be increasing" },
  { pattern: /\byou are narcissistic\b/gi, replacement: "the interaction may feel one-sided" },
  { pattern: /\bmanipulator\b/gi, replacement: "pressure dynamic" },
  { pattern: /\bnarcissist\b/gi, replacement: "self-focused pattern" },
]

export function enforceLanguageGuardrails(input: string): GuardrailResult {
  const text = input ?? ""
  const lowered = text.toLowerCase()
  const issues = new Set<GuardrailIssue>()

  if (CRISIS_PATTERNS.some((term) => lowered.includes(term))) {
    issues.add("crisis_signal")
    return {
      text: buildCrisisResponse(),
      rewritten: true,
      issues: Array.from(issues),
      simulationDisabled: true,
      crisisDetected: true,
    }
  }

  let rewrittenText = text

  if (BANNED_TERMS.some((term) => lowered.includes(term))) {
    issues.add("banned_term")
    for (const term of BANNED_TERMS) {
      const pattern = new RegExp(escapeRegExp(term), "gi")
      rewrittenText = rewrittenText.replace(pattern, "relationship dynamic")
    }
  }

  if (CERTAINTY_PATTERNS.some((term) => lowered.includes(term))) {
    issues.add("certainty_language")
    for (const rewrite of CERTAINTY_REWRITES) {
      rewrittenText = rewrittenText.replace(rewrite.pattern, rewrite.replacement)
    }
  }

  if (JUDGMENT_PATTERNS.some((term) => lowered.includes(term))) {
    issues.add("judgment_language")
    for (const rewrite of JUDGMENT_REWRITES) {
      rewrittenText = rewrittenText.replace(rewrite.pattern, rewrite.replacement)
    }
  }

  if (LABELING_PATTERNS.some((term) => lowered.includes(term))) {
    issues.add("labeling_language")
    for (const rewrite of LABELING_REWRITES) {
      rewrittenText = rewrittenText.replace(rewrite.pattern, rewrite.replacement)
    }
  }

  const rewritten = rewrittenText !== text

  return {
    text: rewrittenText,
    rewritten,
    issues: Array.from(issues),
    simulationDisabled: false,
    crisisDetected: false,
  }
}

export function getBannedTerms() {
  return [...BANNED_TERMS]
}

function buildCrisisResponse() {
  return [
    "It sounds like you're going through something extremely painful.",
    "Support is available and you don't have to face this alone.",
    "If you are in immediate danger, call emergency services now.",
    "You can also contact 988 in the U.S. for immediate crisis support.",
  ].join(" ")
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}
