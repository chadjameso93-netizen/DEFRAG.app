"use client"
import ReactFlow, { Background, Controls, type Edge, type Node } from "reactflow"
import "reactflow/dist/style.css"

const nodeStyle = {
  borderRadius: 18,
  border: "1px solid rgba(255,255,255,0.06)",
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(12px)",
  color: "#f5f5f0",
  padding: "14px 22px",
  fontSize: 13,
  fontWeight: 500,
  minWidth: 110,
  textAlign: "center" as const,
  boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
  transition: "transform 0.3s cubic-bezier(0.25,0.1,0.25,1), box-shadow 0.3s ease",
}

const nodes: Node[] = [
  {
    id: "self",
    position: { x: 320, y: 48 },
    data: { label: "You" },
    style: {
      ...nodeStyle,
      background: "rgba(255,255,255,0.06)",
      boxShadow: "0 10px 40px rgba(0,0,0,0.7)",
      padding: "16px 24px",
      fontSize: 14,
    },
  },
  {
    id: "partner",
    position: { x: 70, y: 210 },
    data: { label: "Partner" },
    style: nodeStyle,
  },
  {
    id: "parent",
    position: { x: 560, y: 210 },
    data: { label: "Parent" },
    style: nodeStyle,
  },
  {
    id: "sibling",
    position: { x: 310, y: 360 },
    data: { label: "Sibling" },
    style: nodeStyle,
  },
]

const edgeStyle = {
  stroke: "rgba(255,255,255,0.15)",
  strokeWidth: 1,
}

const labelStyle = {
  fill: "rgba(255,255,255,0.4)",
  fontSize: 10,
  fontWeight: 500,
  letterSpacing: "0.05em",
}

const edges: Edge[] = [
  {
    id: "self-partner",
    source: "self",
    target: "partner",
    animated: true,
    label: "repair",
    style: edgeStyle,
    labelStyle,
  },
  {
    id: "self-parent",
    source: "self",
    target: "parent",
    animated: true,
    label: "pressure",
    style: edgeStyle,
    labelStyle,
  },
  {
    id: "self-sibling",
    source: "self",
    target: "sibling",
    animated: true,
    label: "distance",
    style: { ...edgeStyle, stroke: "rgba(255,255,255,0.2)" },
    labelStyle,
  },
]

export default function RelationshipGraph() {
  return (
    <div className="glass-surface relative h-[520px] w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.03),transparent_50%)]" />
      <div className="absolute left-5 top-5 z-10 rounded-xl border border-[#1F1F1F] bg-[#0A0A0A] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#555555] backdrop-blur-xl">
        Relationship map
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
        <Background color="rgba(255,255,255,0.03)" gap={24} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  )
}
