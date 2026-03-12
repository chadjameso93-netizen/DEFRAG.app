#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

mkdir -p apps/web/src/components/{pricing,settings,relationships,timeline,sim,onboarding}
mkdir -p apps/web/src/app/{relationships,timeline,simulations,pricing,settings}

cat > apps/web/src/components/pricing/PricingPlans.tsx <<'TSX'
"use client"

import PremiumPanel from "@/components/ui/PremiumPanel"

async function checkout() {
  const res = await fetch("/api/billing/create-checkout", { method: "POST" })
  const data = await res.json()
  if (data?.url) window.location.href = data.url
}

function Plan({
  name,
  price,
  description,
  featured = false,
  points,
}: {
  name: string
  price: string
  description: string
  featured?: boolean
  points: string[]
}) {
  return (
    <PremiumPanel className={`p-6 ${featured ? "border-zinc-900 bg-zinc-950 text-white" : ""}`}>
      <p className={`text-[11px] font-semibold uppercase tracking-[0.24em] ${featured ? "text-zinc-300" : "text-zinc-500"}`}>{name}</p>
      <p className="mt-4 text-4xl font-semibold tracking-tight">{price}</p>
      <p className={`mt-3 text-sm leading-7 ${featured ? "text-zinc-300" : "text-zinc-600"}`}>{description}</p>

      <div className="mt-6 space-y-3">
        {points.map((point) => (
          <div key={point} className={`rounded-2xl border px-4 py-3 text-sm ${featured ? "border-zinc-800 bg-zinc-900/70 text-zinc-200" : "border-zinc-200 bg-white/80 text-zinc-700"}`}>
            {point}
          </div>
        ))}
      </div>

      <button
        onClick={checkout}
        className={`mt-8 w-full rounded-2xl px-5 py-3 text-sm font-medium transition ${featured ? "bg-white text-zinc-950 hover:bg-zinc-100" : "bg-zinc-950 text-white hover:bg-zinc-800"}`}
      >
        Choose plan
      </button>
    </PremiumPanel>
  )
}

export default function PricingPlans() {
  return (
    <section className="grid gap-4 lg:grid-cols-3 lg:gap-6">
      <Plan
        name="Starter"
        price="Free"
        description="A simple entry point for exploring the product."
        points={[
          "Core onboarding",
          "Basic daily insight",
          "Relationship overview",
        ]}
      />
      <Plan
        name="Core"
        price="$24/mo"
        description="The main plan for ongoing personal use."
        featured
        points={[
          "Full dashboard access",
          "Simulations and AI guidance",
          "Expanded relationship views",
        ]}
      />
      <Plan
        name="Practitioner"
        price="$99/mo"
        description="For coaches, facilitators, and advanced use."
        points={[
          "Multiple profiles",
          "Expanded reporting",
          "Advanced workflow support",
        ]}
      />
    </section>
  )
}
TSX

cat > apps/web/src/components/settings/SettingsPanels.tsx <<'TSX'
"use client"

import PremiumPanel from "@/components/ui/PremiumPanel"

export default function SettingsPanels() {
  return (
    <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
      <PremiumPanel className="p-6">
        <h3 className="text-lg font-medium text-zinc-950">Account</h3>
        <p className="mt-2 text-sm leading-7 text-zinc-600">Manage email, password recovery, and account access.</p>
        <div className="mt-6 grid gap-3">
          <div className="rounded-2xl border border-zinc-200 bg-white/80 p-4 text-sm text-zinc-700">Email notifications</div>
          <div className="rounded-2xl border border-zinc-200 bg-white/80 p-4 text-sm text-zinc-700">Password reset</div>
        </div>
      </PremiumPanel>

      <PremiumPanel className="p-6">
        <h3 className="text-lg font-medium text-zinc-950">Subscription</h3>
        <p className="mt-2 text-sm leading-7 text-zinc-600">View current plan and future billing actions.</p>
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white/80 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-zinc-500">Current plan</p>
          <p className="mt-2 text-lg font-medium text-zinc-950">Core Trial</p>
          <p className="mt-2 text-sm text-zinc-600">Billing activates after the trial period unless canceled.</p>
        </div>
      </PremiumPanel>
    </div>
  )
}
TSX

cat > apps/web/src/components/relationships/AddRelationshipForm.tsx <<'TSX'
"use client"

import { useState } from "react"

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
    <div className="rounded-[26px] border border-zinc-200 bg-white/80 p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Add relationship</p>
      <div className="mt-4 grid gap-3">
        <input
          className="rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-zinc-400"
          placeholder="Person name"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        <select
          className="rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-zinc-400"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="personal">Personal</option>
          <option value="family">Family</option>
          <option value="team">Team</option>
        </select>
        <button
          onClick={submit}
          className="rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          Save relationship
        </button>
        {message ? <p className="text-sm text-zinc-600">{message}</p> : null}
      </div>
    </div>
  )
}
TSX

cat > apps/web/src/components/timeline/AddEventForm.tsx <<'TSX'
"use client"

import { useState } from "react"

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
    <div className="rounded-[26px] border border-zinc-200 bg-white/80 p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Add event</p>
      <div className="mt-4 grid gap-3">
        <select
          className="rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-zinc-400"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        >
          <option value="observation">Observation</option>
          <option value="conflict">Conflict</option>
          <option value="repair">Repair</option>
          <option value="stress">Stress</option>
        </select>
        <input
          className="rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-zinc-400"
          placeholder="Target"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        <textarea
          className="min-h-[110px] rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-zinc-400"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button
          onClick={submit}
          className="rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          Save event
        </button>
        {message ? <p className="text-sm text-zinc-600">{message}</p> : null}
      </div>
    </div>
  )
}
TSX

cat > apps/web/src/app/relationships/page.tsx <<'TSX'
import AppShell from "@/components/layout/AppShell"
import PremiumPanel from "@/components/ui/PremiumPanel"
import RelationshipList from "@/components/relationships/RelationshipList"
import AddRelationshipForm from "@/components/relationships/AddRelationshipForm"
import { mockRelationships } from "@/lib/mock/systemData"

export default function RelationshipsPage() {
  return (
    <AppShell
      title="Relationships"
      subtitle="View your current relationship system, including tension and trust across key connections."
    >
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr] xl:gap-6">
        <PremiumPanel className="p-5 sm:p-6">
          <h3 className="text-lg font-medium text-zinc-950">Relationship overview</h3>
          <p className="mt-2 text-sm leading-7 text-zinc-600">Track connection quality across your current system.</p>
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
import EventTimeline from "@/components/timeline/EventTimeline"
import AddEventForm from "@/components/timeline/AddEventForm"
import { mockEvents } from "@/lib/mock/systemData"

export default function TimelinePage() {
  return (
    <AppShell
      title="Timeline"
      subtitle="Review the moments that are shaping the current dynamic."
    >
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr] xl:gap-6">
        <PremiumPanel className="p-5 sm:p-6">
          <h3 className="text-lg font-medium text-zinc-950">Event timeline</h3>
          <p className="mt-2 text-sm leading-7 text-zinc-600">Track moments over time to better understand larger patterns.</p>
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
import SimulationPanel from "@/components/sim/SimulationPanel"

export default function SimulationsPage() {
  return (
    <AppShell
      title="Simulations"
      subtitle="Preview likely outcomes before acting."
    >
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr] xl:gap-6">
        <PremiumPanel className="p-5 sm:p-6">
          <SimulationPanel />
        </PremiumPanel>

        <PremiumPanel className="p-5 sm:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">How to use</p>
          <h3 className="mt-4 text-lg font-medium text-zinc-950">Try a few options before you act</h3>
          <p className="mt-4 text-sm leading-7 text-zinc-600">
            Compare direct confrontation, calm boundaries, or waiting. Use the result as guidance, not certainty.
          </p>
        </PremiumPanel>
      </div>
    </AppShell>
  )
}
TSX

cat > apps/web/src/app/pricing/page.tsx <<'TSX'
import AppShell from "@/components/layout/AppShell"
import PricingPlans from "@/components/pricing/PricingPlans"

export default function PricingPage() {
  return (
    <AppShell
      title="Simple pricing"
      subtitle="Choose the level of depth that fits how you want to use Defrag."
    >
      <PricingPlans />
    </AppShell>
  )
}
TSX

cat > apps/web/src/app/settings/page.tsx <<'TSX'
import AppShell from "@/components/layout/AppShell"
import SettingsPanels from "@/components/settings/SettingsPanels"

export default function SettingsPage() {
  return (
    <AppShell
      title="Settings"
      subtitle="Manage profile details, access, and account preferences."
    >
      <SettingsPanels />
    </AppShell>
  )
}
TSX

cd apps/web
pkill -f "next dev" || true
rm -rf .next
npm run dev
