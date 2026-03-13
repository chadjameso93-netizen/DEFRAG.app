export type SimulationAction = "initiate_conversation" | "delay_response" | "set_boundary" | "withdraw" | "repair_attempt"

export type SimulationResult = {
  action: SimulationAction
  escalation_probability: number
  repair_probability: number
  stability_probability: number
}

export function simulateDecision(action: SimulationAction): SimulationResult {
  const base = {
    initiate_conversation: [0.25, 0.45, 0.3],
    delay_response: [0.4, 0.2, 0.4],
    set_boundary: [0.35, 0.35, 0.3],
    withdraw: [0.55, 0.1, 0.35],
    repair_attempt: [0.2, 0.6, 0.2],
  }[action]

  return {
    action,
    escalation_probability: base[0],
    repair_probability: base[1],
    stability_probability: base[2],
  }
}
