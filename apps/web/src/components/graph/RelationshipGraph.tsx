"use client"

import ReactFlow, { Background, Controls } from "reactflow"
import "reactflow/dist/style.css"

const nodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "You" } },
  { id: "2", position: { x: 200, y: 100 }, data: { label: "Family Member" } }
]

const edges = [
  { id: "e1-2", source: "1", target: "2", label: "dynamic" }
]

export default function RelationshipGraph() {

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}
