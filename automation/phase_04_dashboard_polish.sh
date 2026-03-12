#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

mkdir -p apps/web/src/components/{dashboard,graph,genogram,timeline,relationships,sim,chat}

cat > apps/web/src/components/graph/RelationshipGraph.tsx <<'TSX'
"use client"

import { motion } from "framer-motion"

export default function RelationshipGraph() {
  return (
    <div className="relative h-[320px] w-full overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),rgba(244,244,245,1))]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 320" fill="none">
        <path d="M400 64 C 300 120, 230 150, 160 220" stroke="#a1a1aa" strokeWidth="2" />
        <path d="M400 64 C 500 120, 570 150, 640 220" stroke="#a1a1aa" strokeWidth="2" />
        <path d="M400 64 C 400 120, 400 170, 400 250" stroke="#a1a1aa" strokeWidth="2" />
      </svg>

      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute left-1/2 top-10 -translate-x-1/2 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm font-medium shadow-sm">
        You
      </motion.div>

      <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="absolute left-16 top-44 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm shadow-sm">
        Partner
      </motion.div>

      <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="absolute right-16 top-44 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm shadow-sm">
        Parent
      </motion.div>

      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="absolute left-1/2 bottom-10 -translate-x-1/2 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm shadow-sm">
        Sibling
      </motion.div>
    </div>
  )
}
TSX

cat > apps/web/src/components/genogram/FamilyGraph.tsx <<'TSX'
"use client"

import { motion } from "framer-motion"

export default function FamilyGraph() {
  return (
    <div className="rounded-2xl bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),rgba(244,244,245,1))] p-6">
      <div className="grid gap-10">
        <div className="flex items-center justify-center gap-12 sm:gap-20">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-zinc-300 bg-white px-6 py-4 text-sm shadow-sm">
            Parent A
          </motion.div>
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl border border-zinc-300 bg-white px-6 py-4 text-sm shadow-sm">
            Parent B
          </motion.div>
        </div>

        <div className="mx-auto h-8 w-px bg-zinc-300" />

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="rounded-2xl border border-zinc-300 bg-white px-6 py-4 text-sm shadow-sm">
            You
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl border border-zinc-300 bg-white px-6 py-4 text-sm shadow-sm">
            Sibling
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="rounded-2xl border border-zinc-300 bg-white px-6 py-4 text-sm shadow-sm">
            Relative
          </motion.div>
        </div>
      </div>
    </div>
  )
}
TSX

cat > apps/web/src/components/chat/AIChat.tsx <<'TSX'
"use client"

import { useState } from "react"

export default function AIChat() {
  const [msg, setMsg] = useState("")
  const [reply, setReply] = useState("Describe a situation and Defrag will return a calm, practical interpretation.")

  async function send() {
    if (!msg.trim()) return

    const res = await fetch("/api/insight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg }),
    })

    const data = await res.json()
    setReply(data.insight || "No insight returned.")
  }

  return (
    <div>
      <h2 className="text-lg font-medium text-zinc-950">Defrag AI</h2>
      <p className="mt-2 text-sm text-zinc-600">
        Clear guidance for real relationship dynamics.
      </p>

      <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 text-zinc-700">
        {reply}
      </div>

      <textarea
        className="mt-4 min-h-[120px] w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-zinc-400"
        placeholder="Describe the situation you want help with."
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />

      <button
        onClick={send}
        className="mt-4 rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
      >
        Analyze
      </button>
    </div>
  )
}
TSX

cat > apps/web/src/components/timeline/EventTimeline.tsx <<'TSX'
type EventItem = {
  id: string
  event_type: string
  actor: string
  target: string
  severity: number
  notes: string
  created_at: string
}

export default function EventTimeline({ events }: { events: EventItem[] }) {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              {event.event_type}
            </p>
            <p className="text-xs text-zinc-500">
              {new Date(event.created_at).toLocaleString()}
            </p>
          </div>

          <p className="mt-3 text-sm text-zinc-700">
            <span className="font-medium text-zinc-950">{event.actor}</span> →{" "}
            <span className="font-medium text-zinc-950">{event.target}</span>
          </p>

          <p className="mt-2 text-sm leading-6 text-zinc-600">{event.notes}</p>
          <p className="mt-3 text-xs text-zinc-500">Severity: {event.severity}</p>
        </div>
      ))}
    </div>
  )
}
TSX

cat > apps/web/src/components/relationships/RelationshipList.tsx <<'TSX'
type RelationshipItem = {
  id: string
  source_name: string
  target_name: string
  relationship_type: string
  tension_score: number
  trust_score: number
}

export default function RelationshipList({
  relationships,
}: {
  relationships: RelationshipItem[]
}) {
  return (
    <div className="space-y-4">
      {relationships.map((rel) => (
        <div key={rel.id} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-zinc-950">
              {rel.source_name} → {rel.target_name}
            </p>
            <span className="w-fit rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
              {rel.relationship_type}
            </span>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Tension</p>
              <div className="mt-2 h-2 rounded-full bg-zinc-100">
                <div className="h-2 rounded-full bg-zinc-900" style={{ width: `${Math.max(8, rel.tension_score * 100)}%` }} />
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Trust</p>
              <div className="mt-2 h-2 rounded-full bg-zinc-100">
                <div className="h-2 rounded-full bg-zinc-400" style={{ width: `${Math.max(8, rel.trust_score * 100)}%` }} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
TSX

cat > apps/web/src/app/dashboard/page.tsx <<'TSX'
import AppShell from "@/components/layout/AppShell"
import StatCard from "@/components/dashboard/StatCard"
import Surface from "@/components/ui/Surface"
import RelationshipGraph from "@/components/graph/RelationshipGraph"
import FamilyGraph from "@/components/genogram/FamilyGraph"
import AIChat from "@/components/chat/AIChat"
import EventTimeline from "@/components/timeline/EventTimeline"
import RelationshipList from "@/components/relationships/RelationshipList"
import SimulationPanel from "@/components/sim/SimulationPanel"
import { mockEvents, mockRelationships } from "@/lib/mock/systemData"

export default function DashboardPage() {
  return (
    <AppShell
      title="Relational intelligence"
      subtitle="A clearer view of your current system, relationship pressure, and likely communication patterns."
    >
      <section className="grid gap-4 sm:gap-6 md:grid-cols-3">
        <StatCard label="System state" value="Elevated" note="Recent conflict signals suggest higher sensitivity." />
        <StatCard label="Repair potential" value="Moderate" note="Small clarifications may improve outcomes." />
        <StatCard label="Daily insight" value="Pause first" note="Allow a beat before reacting to sensitive messages." />
      </section>

      <section className="grid gap-6 2xl:grid-cols-[1.15fr_0.85fr]">
        <Surface className="p-5 sm:p-6">
          <h2 className="text-lg font-medium text-zinc-950">Relationship map</h2>
          <p className="mt-2 text-sm text-zinc-600">Visual overview of the current relationship system.</p>
          <div className="mt-6">
            <RelationshipGraph />
          </div>
        </Surface>

        <Surface className="p-5 sm:p-6">
          <AIChat />
        </Surface>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Surface className="p-5 sm:p-6">
          <h2 className="text-lg font-medium text-zinc-950">Family system map</h2>
          <p className="mt-2 text-sm text-zinc-600">View the wider family pattern and key roles.</p>
          <div className="mt-6">
            <FamilyGraph />
          </div>
        </Surface>

        <Surface className="p-5 sm:p-6">
          <SimulationPanel />
        </Surface>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Surface className="p-5 sm:p-6">
          <h2 className="text-lg font-medium text-zinc-950">Current relationships</h2>
          <p className="mt-2 text-sm text-zinc-600">Track trust and tension across your current system.</p>
          <div className="mt-6">
            <RelationshipList relationships={mockRelationships} />
          </div>
        </Surface>

        <Surface className="p-5 sm:p-6">
          <h2 className="text-lg font-medium text-zinc-950">Event timeline</h2>
          <p className="mt-2 text-sm text-zinc-600">Review the moments shaping the current pattern.</p>
          <div className="mt-6">
            <EventTimeline events={mockEvents} />
          </div>
        </Surface>
      </section>
    </AppShell>
  )
}
TSX

echo "phase_04_dashboard_polish.sh completed"
