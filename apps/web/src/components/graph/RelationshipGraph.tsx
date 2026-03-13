"use client"

import ReactFlow, { Background, Controls, type Edge, type Node } from "reactflow"
import "reactflow/dist/style.css"

const nodes: Node[] = [
  {
    id: "self",
    position: { x: 320, y: 48 },
    data: { label: "You" },
    style: {
      borderRadius: 999,
      border: "1px solid rgba(255,255,255,0.2)",
      background: "#111111",
      color: "#f5f5f5",
      padding: "16px 22px",
      fontSize: 14,
      minWidth: 110,
      textAlign: "center",
      boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
    },
  },
  {
    id: "partner",
    position: { x: 70, y: 210 },
    data: { label: "Partner" },
    style: {
      borderRadius: 999,
      border: "1px solid rgba(255,255,255,0.2)",
      background: "#1a1a1a",
      color: "#f5f5f5",
      padding: "14px 20px",
      fontSize: 13,
      minWidth: 118,
      textAlign: "center",
    },
  },
  {
    id: "parent",
    position: { x: 560, y: 210 },
    data: { label: "Parent" },
    style: {
      borderRadius: 999,
      border: "1px solid rgba(255,255,255,0.2)",
      background: "#1a1a1a",
      color: "#f5f5f5",
      padding: "14px 20px",
      fontSize: 13,
      minWidth: 118,
      textAlign: "center",
    },
  },
  {
    id: "sibling",
    position: { x: 310, y: 360 },
    data: { label: "Sibling" },
    style: {
      borderRadius: 999,
      border: "1px solid rgba(233,223,207,0.6)",
      background: "#161514",
      color: "#f5f5f5",
      padding: "14px 20px",
      fontSize: 13,
      minWidth: 118,
      textAlign: "center",
    },
  },
]

const edges: Edge[] = [
  {
    id: "self-partner",
    source: "self",
    target: "partner",
    animated: true,
    label: "repair",
    style: { stroke: "#d6d3d1", strokeWidth: 1.5 },
    labelStyle: { fill: "#d6d3d1", fontSize: 11, fontWeight: 600 },
  },
  {
    id: "self-parent",
    source: "self",
    target: "parent",
    animated: true,
    label: "pressure",
    style: { stroke: "#a3a3a3", strokeWidth: 1.5 },
    labelStyle: { fill: "#a3a3a3", fontSize: 11, fontWeight: 600 },
  },
  {
    id: "self-sibling",
    source: "self",
    target: "sibling",
    animated: true,
    label: "distance",
    style: { stroke: "#e9dfcf", strokeWidth: 2 },
    labelStyle: { fill: "#e9dfcf", fontSize: 11, fontWeight: 600 },
  },
]

export default function RelationshipGraph() {
  return (
    <div className="relative h-[520px] w-full overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,#12110f,#0b0a09)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_40%)]" />
      <div className="absolute left-5 top-5 z-10 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/68">
        Live relationship display
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.22 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#2b2a28" gap={22} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  )
}
