"use client"

import ReactFlow, { Background, Controls } from "reactflow"
import "reactflow/dist/style.css"

const nodeStyle = {
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.06)",
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(12px)",
  color: "#f5f5f0",
  padding: "12px 20px",
  fontSize: 13,
  boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
}

const nodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "You" },
    type: "default" as const,
    style: nodeStyle,
  },
  {
    id: "2",
    position: { x: 260, y: 140 },
    data: { label: "Person" },
    type: "default" as const,
    style: nodeStyle,
  },
]

const edges = [
  {
    id: "e1",
    source: "1",
    target: "2",
    style: { stroke: "rgba(255,255,255,0.15)", strokeWidth: 1 },
  },
]

export default function BowenMapCanvas() {
  return (
    <div className="glass-surface h-[400px] w-full overflow-hidden">
      <ReactFlow nodes={nodes} edges={edges} fitView proOptions={{ hideAttribution: true }}>
        <Background color="rgba(255,255,255,0.03)" gap={24} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  )
}
