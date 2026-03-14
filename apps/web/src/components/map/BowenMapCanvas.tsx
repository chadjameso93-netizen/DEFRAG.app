
"use client"

import ReactFlow, { Background, Controls } from "reactflow"
import "reactflow/dist/style.css"

const nodes = [
  {
    id:"1",
    position:{x:0,y:0},
    data:{label:"You"},
    type:"default"
  },
  {
    id:"2",
    position:{x:260,y:140},
    data:{label:"Person"},
    type:"default"
  }
]

const edges = [
  {
    id:"e1",
    source:"1",
    target:"2"
  }
]

export default function BowenMapCanvas(){

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      fitView
    >
      <Background/>
      <Controls/>
    </ReactFlow>
  )
}
