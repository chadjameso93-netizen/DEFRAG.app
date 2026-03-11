export interface Person {
  id:string
  name:string
  role:string
}

export interface Relationship {
  source:string
  target:string
  tension:number
  trust:number
}

export interface SystemEvent {
  id:string
  type:string
  actors:string[]
  timestamp:string
}

export interface SystemState {
  pressure:number
  stability:string
}
