#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

mkdir -p apps/web/src/components/{marketing,auth,onboarding,chat,graph,genogram,relationships,timeline,sim}
mkdir -p apps/web/src/app/api/status
mkdir -p apps/web/public

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
    <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_24px_100px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-8">
      <h2 className="text-xl font-medium text-white">Set up your profile</h2>
      <p className="mt-2 text-sm leading-7 text-white/60">
        Add the details Defrag uses to personalize your dashboard, timing layers, and guidance.
      </p>

      <div className="mt-6 grid gap-4">
        <input
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20"
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        <input
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20"
          type="time"
          value={birthTime}
          onChange={(e) => setBirthTime(e.target.value)}
        />
        <input
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20"
          placeholder="Birth place"
          value={birthPlace}
          onChange={(e) => setBirthPlace(e.target.value)}
        />

        <button
          onClick={saveProfile}
          className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-100"
        >
          Continue
        </button>

        {message ? <p className="text-sm text-white/60">{message}</p> : null}
      </div>
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
        <div key={rel.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-white">
              {rel.source_name} → {rel.target_name}
            </p>
            <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
              {rel.relationship_type}
            </span>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/40">Tension</p>
              <div className="mt-2 h-2 rounded-full bg-white/10">
                <div className="h-2 rounded-full bg-white" style={{ width: `${Math.max(8, rel.tension_score * 100)}%` }} />
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/40">Trust</p>
              <div className="mt-2 h-2 rounded-full bg-white/10">
                <div className="h-2 rounded-full bg-sky-300" style={{ width: `${Math.max(8, rel.trust_score * 100)}%` }} />
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
        <div key={event.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              {event.event_type}
            </p>
            <p className="text-xs text-white/45">
              {new Date(event.created_at).toLocaleString()}
            </p>
          </div>

          <p className="mt-3 text-sm text-white/75">
            <span className="font-medium text-white">{event.actor}</span> →{" "}
            <span className="font-medium text-white">{event.target}</span>
          </p>

          <p className="mt-2 text-sm leading-6 text-white/60">{event.notes}</p>
          <p className="mt-3 text-xs text-white/45">Severity: {event.severity}</p>
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
        Compare different approaches before the conversation happens.
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

cat > apps/web/src/app/api/status/route.ts <<'TS'
import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    ok: true,
    web: "running",
    auth: "configured",
    billing: "configured",
    data: "active",
    ui: "premium-dark",
  })
}
TS

cat > apps/web/vercel.json <<'JSON'
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install"
}
JSON

cat > .env.example <<'ENV'
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_PRICE_ID=
ENV

echo "phase_19_working_state_finalize.sh completed"
