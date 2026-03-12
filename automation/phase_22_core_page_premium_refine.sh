#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

mkdir -p apps/web/src/components/{relationships,timeline,sim,onboarding,settings,pricing}

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
        <div
          key={rel.id}
          className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:border-white/15 hover:bg-white/[0.06]"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-base font-medium text-white">
                {rel.source_name} → {rel.target_name}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/40">
                {rel.relationship_type}
              </p>
            </div>

            <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-medium text-white/65">
              Live signal
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">Tension</p>
                <p className="text-xs text-white/55">{Math.round(rel.tension_score * 100)}%</p>
              </div>
              <div className="h-2 rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-white"
                  style={{ width: `${Math.max(8, rel.tension_score * 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">Trust</p>
                <p className="text-xs text-white/55">{Math.round(rel.trust_score * 100)}%</p>
              </div>
              <div className="h-2 rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full rounded-full bg-sky-300"
                  style={{ width: `${Math.max(8, rel.trust_score * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
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
        <div
          key={event.id}
          className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:border-white/15 hover:bg-white/[0.06]"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
              {event.event_type}
            </p>
            <p className="text-xs text-white/45">
              {new Date(event.created_at).toLocaleString()}
            </p>
          </div>

          <p className="mt-4 text-sm text-white/75">
            <span className="font-medium text-white">{event.actor}</span> →{" "}
            <span className="font-medium text-white">{event.target}</span>
          </p>

          <p className="mt-3 text-sm leading-7 text-white/60">{event.notes}</p>

          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.18em] text-white/40">Severity</p>
              <p className="text-xs text-white/55">{Math.round(event.severity * 100)}%</p>
            </div>
            <div className="h-2 rounded-full bg-white/10">
              <div
                className="h-2 rounded-full bg-fuchsia-300"
                style={{ width: `${Math.max(8, event.severity * 100)}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
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
  const [loading, setLoading] = useState(false)

  async function run(action: "direct_confrontation" | "calm_boundary" | "delay") {
    setLoading(true)
    try {
      const res = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      })
      const data = await res.json()
      setResult(data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Simulation</p>
      <h2 className="mt-4 text-xl font-medium text-white">Compare likely outcomes</h2>
      <p className="mt-3 text-sm leading-7 text-white/60">
        Use this to pressure-test a response before you send it or say it.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button onClick={() => run("direct_confrontation")} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10">
          Direct
        </button>
        <button onClick={() => run("calm_boundary")} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10">
          Boundary
        </button>
        <button onClick={() => run("delay")} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10">
          Wait
        </button>
      </div>

      <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
        {loading ? (
          <p className="text-sm text-white/60">Running simulation...</p>
        ) : result ? (
          <div className="space-y-3 text-sm text-white/70">
            {result.outcome ? <p><span className="font-medium text-white">Outcome:</span> {result.outcome}</p> : null}
            {typeof result.probability === "number" ? <p><span className="font-medium text-white">Probability:</span> {result.probability}</p> : null}
            {typeof result.risk === "number" ? <p><span className="font-medium text-white">Risk:</span> {result.risk}</p> : null}
            {typeof result.repair === "number" ? <p><span className="font-medium text-white">Repair potential:</span> {result.repair}</p> : null}
            {result.note ? <p><span className="font-medium text-white">Guidance:</span> {result.note}</p> : null}
          </div>
        ) : (
          <p className="text-sm text-white/60">Choose an option to preview the likely pattern shift.</p>
        )}
      </div>
    </div>
  )
}
TSX

cat > apps/web/src/components/onboarding/ProfileSetupForm.tsx <<'TSX'
"use client"

import { useState } from "react"

export default function ProfileSetupForm() {
  const [fullName, setFullName] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [birthTime, setBirthTime] = useState("")
  const [birthPlace, setBirthPlace] = useState("")
  const [message, setMessage] = useState("")

  async function saveProfile() {
    setMessage("Saving...")
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, birthDate, birthTime, birthPlace }),
      })

      const data = await res.json()

      if (!res.ok || !data?.ok) {
        setMessage("Could not save profile.")
        return
      }

      setMessage("Profile saved.")
      window.location.href = "/dashboard"
    } catch {
      setMessage("Could not save profile.")
    }
  }

  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8">
      <h2 className="text-xl font-medium text-white">Set up your profile</h2>
      <p className="mt-2 text-sm leading-7 text-white/60">
        This creates the starting context for your dashboard and guidance layers.
      </p>

      <div className="mt-6 grid gap-4">
        <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20" type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} />
        <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20" placeholder="Birth place" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} />

        <button onClick={saveProfile} className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-100">
          Continue
        </button>

        {message ? <p className="text-sm text-white/60">{message}</p> : null}
      </div>
    </div>
  )
}
TSX

cat > apps/web/src/components/settings/SettingsPanels.tsx <<'TSX'
import GlowCard from "@/components/ui/GlowCard"

export default function SettingsPanels() {
  return (
    <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
      <GlowCard className="p-6">
        <h3 className="text-lg font-medium text-white">Account</h3>
        <p className="mt-2 text-sm leading-7 text-white/60">Manage email, access, and future authentication controls.</p>
        <div className="mt-6 grid gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">Email notifications</div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">Password reset</div>
        </div>
      </GlowCard>

      <GlowCard className="p-6">
        <h3 className="text-lg font-medium text-white">Subscription</h3>
        <p className="mt-2 text-sm leading-7 text-white/60">Review the current plan and the next billing state.</p>
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Current plan</p>
          <p className="mt-2 text-lg font-medium text-white">Core Trial</p>
          <p className="mt-2 text-sm text-white/60">Billing activates after the trial period unless canceled.</p>
        </div>
      </GlowCard>
    </div>
  )
}
TSX

cat > apps/web/src/components/pricing/PricingPlans.tsx <<'TSX'
"use client"

import GlowCard from "@/components/ui/GlowCard"

async function checkout() {
  try {
    const res = await fetch("/api/billing/create-checkout", { method: "POST" })
    const data = await res.json()
    if (data?.url) {
      window.location.href = data.url
      return
    }
  } catch {}
  window.location.href = "/signup"
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
    <GlowCard className={`p-6 ${featured ? "border-white/20 bg-white/[0.07]" : ""}`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">{name}</p>
      <p className="mt-4 text-4xl font-semibold tracking-tight text-white">{price}</p>
      <p className="mt-3 text-sm leading-7 text-white/60">{description}</p>

      <div className="mt-6 space-y-3">
        {points.map((point) => (
          <div key={point} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
            {point}
          </div>
        ))}
      </div>

      <button
        onClick={checkout}
        className={`mt-8 w-full rounded-2xl px-5 py-3 text-sm font-medium transition ${
          featured ? "bg-white text-zinc-950 hover:bg-zinc-100" : "bg-white/10 text-white hover:bg-white/15"
        }`}
      >
        Choose plan
      </button>
    </GlowCard>
  )
}

export default function PricingPlans() {
  return (
    <section className="grid gap-4 lg:grid-cols-3 lg:gap-6">
      <Plan
        name="Starter"
        price="Free"
        description="Explore the platform structure and core surfaces."
        points={["Core onboarding", "Basic dashboard", "Relationship overview"]}
      />
      <Plan
        name="Core"
        price="$24/mo"
        description="Use the full product for ongoing relationship analysis."
        featured
        points={["Dashboard access", "Simulations", "AI guidance", "Timeline tracking"]}
      />
      <Plan
        name="Practitioner"
        price="$99/mo"
        description="For deeper use cases and expanded workflow support."
        points={["Multiple profiles", "Expanded reporting", "Advanced workflow support"]}
      />
    </section>
  )
}
TSX

echo "phase_22_core_page_premium_refine.sh completed"
