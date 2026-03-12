"use client"
import AppShell from "@/components/layout/AppShell"
import StatCard from "@/components/dashboard/StatCard"
import RelationshipGraph from "@/components/graph/RelationshipGraph"
import AIChat from "@/components/chat/AIChat"
import FamilyGraph from "@/components/genogram/FamilyGraph"
import SimulationPanel from "@/components/sim/SimulationPanel"
import EventTimeline from "@/components/timeline/EventTimeline"
import RelationshipList from "@/components/relationships/RelationshipList"
import { mockEvents, mockRelationships } from "@/lib/mock/systemData"

export default function Dashboard() {
  return (
    <AppShell title="Relational intelligence" subtitle="A clearer view of your current system, relationship pressure, and likely communication patterns.">
      <section className="grid gap-6 md:grid-cols-3">
        <StatCard label="System state" value="Elevated" note="Recent conflict signals suggest higher sensitivity." />
        <StatCard label="Repair potential" value="Moderate" note="Small clarifications may improve outcomes." />
        <StatCard label="Daily insight" value="Pause first" note="Allow a beat before reacting to sensitive messages." />
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium text-zinc-950">Relationship map</h2>
          <p className="mt-2 text-sm text-zinc-600">Visual overview of the current relationship system.</p>
          <div className="mt-6 h-[420px] overflow-hidden rounded-2xl border border-zinc-100"><RelationshipGraph /></div>
        </div>
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"><AIChat /></div>
      </section>
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium text-zinc-950">Family system map</h2>
          <p className="mt-2 text-sm text-zinc-600">View the wider family pattern and key roles.</p>
          <div className="mt-6 h-[360px] overflow-hidden rounded-2xl border border-zinc-100"><FamilyGraph /></div>
        </div>
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"><SimulationPanel /></div>
      </section>
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium text-zinc-950">Current relationships</h2>
          <p className="mt-2 text-sm text-zinc-600">Track tension and trust across your current system.</p>
          <div className="mt-6"><RelationshipList relationships={mockRelationships} /></div>
        </div>
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium text-zinc-950">Event timeline</h2>
          <p className="mt-2 text-sm text-zinc-600">Review key moments shaping the current pattern.</p>
          <div className="mt-6"><EventTimeline events={mockEvents} /></div>
        </div>
      </section>
    </AppShell>
  )
}
