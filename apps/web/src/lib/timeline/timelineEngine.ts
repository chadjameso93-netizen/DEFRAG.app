import { SystemEvent } from "../schema/systemSchema"

export function buildTimeline(events:SystemEvent[]){

  return events
    .sort((a,b)=>Date.parse(a.timestamp)-Date.parse(b.timestamp))
    .map(e=>({
      time:e.timestamp,
      label:e.type
    }))

}
