export type GovernanceResult = {
  allowed: boolean
  reasons: string[]
}

const BLOCKLIST = ["diagnose", "you are abusive", "harm yourself", "kill"]

export function validateOutput(text: string): GovernanceResult {
  const lowered = text.toLowerCase()
  const hits = BLOCKLIST.filter((item) => lowered.includes(item))

  return {
    allowed: hits.length === 0,
    reasons: hits,
  }
}
