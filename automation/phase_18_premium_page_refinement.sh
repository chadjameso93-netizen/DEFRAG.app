#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

mkdir -p apps/web/src/components/{relationships,timeline,sim,ui}

cat > apps/web/src/components/ui/InfoCard.tsx <<'TSX'
import PremiumPanel from "@/components/ui/PremiumPanel"

export default function InfoCard({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string
  title: string
  body: string
}) {
  return (
    <PremiumPanel className="p-5 sm:p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">{eyebrow}</p>
      <h3 className="mt-4 text-lg font-medium text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/60">{body}</p>
    </PremiumPanel>
  )
}
TSX

cat > apps/web/src/components/relationships/AddRelationshipForm.tsx <<'TSX'
"use client"

import { useState } from "react"
import PremiumPanel from "@/components/ui/PremiumPanel"

export default function AddRelationshipForm() {
  const [target, setTarget] = useState("")
  const [type, setType] = useState("personal")
  const [message, setMessage] = useState("")

  async function submit() {
    if (!target.trim()) return

    const res = await fetch("/api/relationships", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source_name: "You",
        target_name: target,
        relationship_type: type,
        tension_score: 0.35,
        trust_score: 0.5,
      }),
    })

    const data = await res.json()
    setMessage(data?.ok ? "Relationship added. Refresh to view changes." : "Unable to add relationship.")
    setTarget("")
  }

  return (
    <PremiumPanel className="p-5 sm:p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Add connection</p>
      <h3 className="mt-4 text-lg font-medium text-white">Add a person to your relationship system</h3>
      <p className="mt-3 text-sm leading-7 text-white/60">
        Add the people who meaningfully affect the pattern you are tracking.
      </p>

      <div className="mt-6 grid gap-3">
        <input
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20"
          placeholder="Person name"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        <select
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="personal">Personal</option>
          <option value="family">Family</option>
          <option value="team">Team</option>
        </select>
        <button
          onClick={submit}
          className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-100"
        >
          Save relationship
        </button>
        {message ? <p className="text-sm text-white/60">{message}</p> : null}
      </div>
    </PremiumPanel>
  )
}
TSX

cat > apps/web/src/components/timeline/AddEventForm.tsx <<'TSX'
"use client"

import { useState } from "react"
import PremiumPanel from "@/components/ui/PremiumPanel"

export default function AddEventForm() {
  const [eventType, setEventType] = useState("observation")
  const [target, setTarget] = useState("")
  const [notes, setNotes] = useState("")
  const [message, setMessage] = useState("")

  async function submit() {
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_type: eventType,
        actor: "You",
        target: target || "Other",
        severity: 0.4,
        notes: notes || "No notes provided.",
      }),
    })

    const data = await res.json()
    setMessage(data?.ok ? "Event added. Refresh to view changes." : "Unable to add event.")
    setNotes("")
    setTarget("")
  }

  return (
    <PremiumPanel className="p-5 sm:p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Add timeline event</p>
      <h3 className="mt-4 text-lg font-medium text-white">Capture the moment that changed the pattern</h3>
      <p className="mt-3 text-sm leading-7 text-white/60">
        Log conflict, repair, stress, or observations so the larger sequence becomes easier to read.
      </p>

      <div className="mt-6 grid gap-3">
        <select
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        >
          <option value="observation">Observation</option>
          <option value="conflict">Conflict</option>
          <option value="repair">Repair</option>
          <option value="stress">Stress</option>
        </select>
        <input
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20"
          placeholder="Target"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        <textarea
          className="min-h-[120px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20"
          placeholder="Describe what happened"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button
          onClick={submit}
          className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-100"
        >
          Save event
        </button>
        {message ? <p className="text-sm text-white/60">{message}</p> : null}
      </div>
    </PremiumPanel>
  )
}
TSX

cat > apps/web/src/components/sim/SimulationPanel.tsx <<'TSX'
"use client"

import { useState } from "react"

type SimResult = {
  risk?: number
  repair?: number
  note?: string
  outcome?: string
  probability?: number
}

export default function SimulationPanel() {
  const [result, setResult] = useState<SimResult | null>(null)

  async function run(action: "direct_confrontation" | "calm_boundary" | "delay") {
    const res = await fetch("/api/simulate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    })
    const data = await res.json()
    setResult(data)
  }

  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Simulation</p>
      <h2 className="mt-4 text-lg font-medium text-white">Test likely outcomes before you act</h2>
      <p className="mt-3 text-sm leading-7 text-white/60">
        Compare approaches before the conversation happens. Use this to prepare, not to chase certainty.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button onClick={() => run("direct_confrontation")} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10">
          Direct
        </button>
        <button onClick={() => run("calm_boundary")} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10">
          Boundary
        </button>
        <button onClick={() => run("delay")} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10">
          Wait
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
        {result ? (
          <div className="space-y-3 text-sm text-white/70">
            {result.outcome ? <p><span className="font-medium text-white">Outcome:</span> {result.outcome}</p> : null}
            {typeof result.probability === "number" ? <p><span className="font-medium text-white">Probability:</span> {result.probability}</p> : null}
            {typeof result.risk === "number" ? <p><span className="font-medium text-white">Risk:</span> {result.risk}</p> : null}
            {typeof result.repair === "number" ? <p><span className="font-medium text-white">Repair potential:</span> {result.repair}</p> : null}
            {result.note ? <p><span className="font-medium text-white">Guidance:</span> {result.note}</p> : null}
          </div>
        ) : (
          <p className="text-sm text-white/60">Choose an option to preview a likely outcome.</p>
        )}
      </div>
    </div>
  )
}
TSX

cat > apps/web/src/app/relationships/page.tsx <<'TSX'
import AppShell from "@/components/layout/AppShell"
import PremiumPanel from "@/components/ui/PremiumPanel"
import InfoCard from "@/components/ui/InfoCard"
import RelationshipList from "@/components/relationships/RelationshipList"
import AddRelationshipForm from "@/components/relationships/AddRelationshipForm"
import { mockRelationships } from "@/lib/mock/systemData"

export default function RelationshipsPage() {
  return (
    <AppShell
      title="Relationships"
      subtitle="Build and maintain the relationship layer of the platform."
    >
      <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
        <InfoCard eyebrow="Purpose" title="Map the people in the system" body="Track the connections that meaningfully affect the dynamic you are trying to understand." />
        <InfoCard eyebrow="Use" title="Review trust and tension" body="Each relationship can be reviewed through connection type, tension level, and overall trust signal." />
        <InfoCard eyebrow="Outcome" title="Create a clearer system view" body="This makes it easier to spot where strain, influence, or repair potential is actually located." />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr] xl:gap-6">
        <PremiumPanel className="p-5 sm:p-6">
          <h3 className="text-lg font-medium text-white">Relationship overview</h3>
          <p className="mt-2 text-sm leading-7 text-white/60">
            Review the active people in your system and how each connection is currently functioning.
          </p>
          <div className="mt-6">
            <RelationshipList relationships={mockRelationships} />
          </div>
        </PremiumPanel>

        <AddRelationshipForm />
      </div>
    </AppShell>
  )
}
TSX

cat > apps/web/src/app/timeline/page.tsx <<'TSX'
import AppShell from "@/components/layout/AppShell"
import PremiumPanel from "@/components/ui/PremiumPanel"
import InfoCard from "@/components/ui/InfoCard"
import EventTimeline from "@/components/timeline/EventTimeline"
import AddEventForm from "@/components/timeline/AddEventForm"
import { mockEvents } from "@/lib/mock/systemData"

export default function TimelinePage() {
  return (
    <AppShell
      title="Timeline"
      subtitle="Track what happened, when it happened, and how it shaped the current pattern."
    >
      <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
        <InfoCard eyebrow="Purpose" title="Log key moments" body="Capture the events that changed the system, including conflict, repair, stress, or meaningful observations." />
        <InfoCard eyebrow="Use" title="Follow sequence, not fragments" body="The timeline helps you understand how today’s pattern formed instead of reacting to a single moment." />
        <InfoCard eyebrow="Outcome" title="See the build-up clearly" body="This creates better context for simulations, dashboard interpretation, and future decisions." />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr] xl:gap-6">
        <PremiumPanel className="p-5 sm:p-6">
          <h3 className="text-lg font-medium text-white">Event timeline</h3>
          <p className="mt-2 text-sm leading-7 text-white/60">
            Review the sequence of key moments that are shaping the current dynamic.
          </p>
          <div className="mt-6">
            <EventTimeline events={mockEvents} />
          </div>
        </PremiumPanel>

        <AddEventForm />
      </div>
    </AppShell>
  )
}
TSX

cat > apps/web/src/app/simulations/page.tsx <<'TSX'
import AppShell from "@/components/layout/AppShell"
import PremiumPanel from "@/components/ui/PremiumPanel"
import InfoCard from "@/components/ui/InfoCard"
import SimulationPanel from "@/components/sim/SimulationPanel"

export default function SimulationsPage() {
  return (
    <AppShell
      title="Simulations"
      subtitle="Use scenario testing to compare possible approaches before the next conversation happens."
    >
      <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
        <InfoCard eyebrow="Purpose" title="Prepare before acting" body="Simulations help you compare options when you are deciding how to respond inside a live relationship pattern." />
        <InfoCard eyebrow="Use" title="Test different approaches" body="Compare direct confrontation, calm boundaries, or waiting, then use the result to sharpen your judgment." />
        <InfoCard eyebrow="Outcome" title="Make the next move with more clarity" body="The goal is not certainty. The goal is a more informed, less reactive decision." />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr] xl:gap-6">
        <PremiumPanel className="p-5 sm:p-6">
          <SimulationPanel />
        </PremiumPanel>

        <PremiumPanel className="p-5 sm:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">How to use this</p>
          <h3 className="mt-4 text-lg font-medium text-white">Use simulations as preparation, not prediction.</h3>
          <p className="mt-4 text-sm leading-7 text-white/60">
            This page helps you think through likely outcomes so your next step is more intentional, measured, and aligned with what the platform is showing.
          </p>
        </PremiumPanel>
      </div>
    </AppShell>
  )
}
TSX

echo "phase_18_premium_page_refinement.sh completed"
