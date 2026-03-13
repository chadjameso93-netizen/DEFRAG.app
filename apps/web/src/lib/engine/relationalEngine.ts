export function generateInsight(message: string) {
  if (!message) return "Describe a situation for analysis."

  const m = message.toLowerCase()

  if (m.includes("conflict"))
    return "Observation shows elevated tension. A slower response may improve outcomes."

  if (m.includes("family"))
    return "Family systems often repeat patterns. Small shifts can interrupt the loop."

  if (m.includes("work"))
    return "Hierarchy pressure detected. Clear boundaries may reduce tension."

  return "System state suggests increased relational sensitivity today."
}
