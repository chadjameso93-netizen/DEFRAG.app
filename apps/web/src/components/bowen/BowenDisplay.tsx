"use client"

import ReactFlow, { Background, Edge, Node } from "reactflow"
import "reactflow/dist/style.css"

type Relationship = {
  id: string
  source_name: string
  target_name: string
  tension_score: number
  trust_score: number
}

type TimelineEvent = {
  actor: string
  target: string
  event_type: string
}

const stateStyles: Record<string, string> = {
  calm: "border-white/20 bg-white/5 text-white/80",
  activated: "border-white/25 bg-white/10 text-white",
  distant: "border-white/15 bg-white/5 text-white/70",
  stabilizing: "border-white/30 bg-white/10 text-white",
}

function PersonNode({ data }: { data: { name: string; state: string; descriptor: string } }) {
  const style = stateStyles[data.state] || stateStyles.calm
  return (
    <div className={`min-w-[140px] rounded-2xl border px-4 py-3 text-xs uppercase tracking-[0.2em] ${style}`}>
      <p className="text-[11px] text-white/60">{data.descriptor}</p>
      <p className="mt-2 text-sm font-medium text-white">{data.name}</p>
      <p className="mt-1 text-[11px] text-white/60">{data.state}</p>
    </div>
  )
}

const nodeTypes = { person: PersonNode }

function buildGraph(relationships: Relationship[], events: TimelineEvent[]) {
  if (!relationships.length) {
    return {
      nodes: [
        {
          id: "you",
          type: "person",
          position: { x: 260, y: 120 },
          data: { name: "You", state: "stabilizing", descriptor: "center" },
        },
      ] as Node[],
      edges: [] as Edge[],
    }
  }

  const relatedNames = Array.from(new Set(relationships.map((item) => item.target_name))).slice(0, 4)

  const nodes: Node[] = [
    {
      id: "you",
      type: "person",
      position: { x: 260, y: 40 },
      data: { name: "You", state: "stabilizing", descriptor: "center" },
    },
    ...relatedNames.map((name, index) => {
      const angle = (Math.PI * 2 * index) / Math.max(relatedNames.length, 1)
      const x = 260 + Math.round(Math.cos(angle) * 210)
      const y = 210 + Math.round(Math.sin(angle) * 150)
      const relatedEvents = events.filter((event) => event.target === name || event.actor === name)
      const hasConflict = relatedEvents.some((event) => event.event_type === "conflict")
      const hasRepair = relatedEvents.some((event) => event.event_type === "repair")
      const state = hasConflict ? "activated" : hasRepair ? "stabilizing" : "calm"

      return {
        id: `person-${name}`,
        type: "person",
        position: { x, y },
        data: {
          name,
          state,
          descriptor: hasConflict ? "pressure" : hasRepair ? "repair" : "connected",
        },
      }
    }),
  ]

  const edges: Edge[] = relatedNames.map((name, index) => {
    const match = relationships.find((item) => item.target_name === name)
    const tension = match?.tension_score ?? 0.2
    const label = tension >= 0.6 ? "tension" : tension >= 0.35 ? "active" : "steady"

    return {
      id: `edge-${index}`,
      source: "you",
      target: `person-${name}`,
      style: { stroke: "#d6d3d1" },
      label,
      labelStyle: { fill: "#d4d4d4", fontSize: 10 },
    }
  })

  return { nodes, edges }
}

export default function BowenDisplay({
  relationships = [],
  events = [],
}: {
  relationships?: Relationship[]
  events?: TimelineEvent[]
}) {
  const { nodes, edges } = buildGraph(relationships, events)

  return (
    <div className="h-[420px] rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,#1c1b18,#0b0a09)]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        zoomOnScroll={false}
        panOnScroll
        nodesDraggable={false}
        nodesConnectable={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#312f2a" gap={24} />
      </ReactFlow>
    </div>
  )
}
