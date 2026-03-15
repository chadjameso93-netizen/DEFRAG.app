import { analyzeSystem } from "./systemEngine"

import type { SystemEvent } from "../schema/systemSchema"

export function predictConflict(events: SystemEvent[]) {

  const state = analyzeSystem(events)

  if(state.pressure>5){
    return {
      risk:"high",
      advice:"Allow time before addressing sensitive topics."
    }
  }

  if(state.pressure>2){
    return {
      risk:"moderate",
      advice:"Use calm tone and clarify intentions."
    }
  }

  return {
    risk:"low",
    advice:"Conditions appear stable."
  }

}
