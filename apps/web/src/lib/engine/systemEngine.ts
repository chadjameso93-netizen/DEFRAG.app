import dayjs from "dayjs"
import { SystemEvent, SystemState } from "../schema/systemSchema"

export function analyzeSystem(events:SystemEvent[]):SystemState{

  const conflicts = events.filter(e=>e.type==="conflict")

  const pressure = conflicts.length

  let stability="stable"

  if(pressure>3) stability="elevated"
  if(pressure>6) stability="high"

  return {
    pressure,
    stability
  }

}

export function nextRiskWindow(events:SystemEvent[]){

  const last = events[events.length-1]

  if(!last) return null

  return dayjs(last.timestamp).add(3,"day").toISOString()

}
