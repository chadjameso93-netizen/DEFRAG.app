import { analyzeSystem } from "./systemEngine"

export function predictConflict(events:any[]){

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
