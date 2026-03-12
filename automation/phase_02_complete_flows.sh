#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

mkdir -p apps/web/src/components/{auth,flow,onboarding,relationships,timeline,sim,pricing,settings}
mkdir -p apps/web/src/lib/mock
mkdir -p apps/web/src/app/{login,signup,onboarding,relationships,timeline,simulations,pricing,settings}
mkdir -p apps/web/src/app/api/{profile,events,relationships,subscription,status,insight,simulate}
mkdir -p apps/web/src/app/api/stripe/webhook

cat > apps/web/src/components/flow/FlowIntro.tsx <<'TSX'
export default function FlowIntro({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string
  title: string
  body: string
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950">
        {title}
      </h1>
      <p className="mt-4 text-sm leading-7 text-zinc-600">
        {body}
      </p>
    </div>
  )
}
TSX

cat > apps/web/src/components/auth/AuthCard.tsx <<'TSX'
import type { ReactNode } from "react"
import Surface from "@/components/ui/Surface"

export default function AuthCard({ children }: { children: ReactNode }) {
  return <Surface className="max-w-md p-6 sm:p-8">{children}</Surface>
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
      await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, birthDate, birthTime, birthPlace }),
      })

      setMessage("Profile saved.")
      window.location.href = "/dashboard"
    } catch {
      setMessage("Could not save profile.")
    }
  }

  return (
    <div className="rounded-[28px] border border-white/60 bg-white/80 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl">
      <h2 className="text-xl font-medium text-zinc-950">Set up your profile</h2>
      <p className="mt-2 text-sm leading-6 text-zinc-600">
        Birth details are used to build optional timing layers and improve personal insight.
      </p>

      <div className="mt-6 grid gap-4">
        <input className="rounded-2xl border border-zinc-200 px-4 py-3" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <input className="rounded-2xl border border-zinc-200 px-4 py-3" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        <input className="rounded-2xl border border-zinc-200 px-4 py-3" type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} />
        <input className="rounded-2xl border border-zinc-200 px-4 py-3" placeholder="Birth place" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} />
        <button onClick={saveProfile} className="rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800">
          Continue
        </button>
        {message ? <p className="text-sm text-zinc-600">{message}</p> : null}
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
        <div key={rel.id} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-zinc-950">
              {rel.source_name} → {rel.target_name}
            </p>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
              {rel.relationship_type}
            </span>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
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
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
              {event.event_type}
            </p>
            <p className="text-xs text-zinc-500">{new Date(event.created_at).toLocaleString()}</p>
          </div>
          <p className="mt-2 text-sm text-zinc-700">
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

cat > apps/web/src/components/sim/SimulationPanel.tsx <<'TSX'
"use client"

import { useState } from "react"

type SimResult = {
  risk: number
  repair: number
  note: string
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
      <h2 className="text-lg font-medium text-zinc-950">Simulation</h2>
      <p className="mt-2 text-sm text-zinc-600">
        Explore likely outcomes before acting.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button onClick={() => run("direct_confrontation")} className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50">
          Direct
        </button>
        <button onClick={() => run("calm_boundary")} className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50">
          Boundary
        </button>
        <button onClick={() => run("delay")} className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50">
          Wait
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
        {result ? (
          <div className="space-y-2 text-sm text-zinc-700">
            <p><span className="font-medium text-zinc-950">Risk:</span> {result.risk}</p>
            <p><span className="font-medium text-zinc-950">Repair potential:</span> {result.repair}</p>
            <p><span className="font-medium text-zinc-950">Guidance:</span> {result.note}</p>
          </div>
        ) : (
          <p className="text-sm text-zinc-600">
            Choose an option to preview a likely outcome.
          </p>
        )}
      </div>
    </div>
  )
}
TSX

cat > apps/web/src/lib/mock/systemData.ts <<'TS'
export const mockRelationships = [
  { id: "rel_1", source_name: "You", target_name: "Partner", relationship_type: "personal", tension_score: 0.62, trust_score: 0.58 },
  { id: "rel_2", source_name: "You", target_name: "Parent", relationship_type: "family", tension_score: 0.48, trust_score: 0.66 },
  { id: "rel_3", source_name: "You", target_name: "Sibling", relationship_type: "family", tension_score: 0.71, trust_score: 0.44 },
]

export const mockEvents = [
  { id: "evt_1", event_type: "conflict", actor: "You", target: "Sibling", severity: 0.7, notes: "Tension increased after a short exchange.", created_at: new Date().toISOString() },
  { id: "evt_2", event_type: "repair", actor: "You", target: "Partner", severity: 0.3, notes: "Conversation became calmer after a pause.", created_at: new Date().toISOString() },
  { id: "evt_3", event_type: "stress", actor: "Parent", target: "You", severity: 0.5, notes: "Outside pressure appears to be affecting communication.", created_at: new Date().toISOString() },
]
TS

cat > apps/web/src/app/login/page.tsx <<'TSX'
"use client"

import { useState } from "react"
import AppShell from "@/components/layout/AppShell"
import FlowIntro from "@/components/flow/FlowIntro"
import AuthCard from "@/components/auth/AuthCard"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setMessage(error.message)
      return
    }
    window.location.href = "/dashboard"
  }

  return (
    <AppShell title="Log in" subtitle="Access your Defrag dashboard and continue where you left off.">
      <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <FlowIntro eyebrow="Access" title="Return to your workspace" body="Log in to view your dashboard, relationship system, and current insight." />
        <AuthCard>
          <h2 className="text-xl font-medium text-zinc-950">Welcome back</h2>
          <p className="mt-2 text-sm text-zinc-600">Use your email and password to continue.</p>
          <div className="mt-6 space-y-4">
            <input className="w-full rounded-2xl border border-zinc-200 px-4 py-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="w-full rounded-2xl border border-zinc-200 px-4 py-3" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin} className="w-full rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800">
              Log in
            </button>
            <p className="text-sm text-zinc-600">{message}</p>
          </div>
        </AuthCard>
      </div>
    </AppShell>
  )
}
TSX

cat > apps/web/src/app/signup/page.tsx <<'TSX'
"use client"

import { useState } from "react"
import AppShell from "@/components/layout/AppShell"
import FlowIntro from "@/components/flow/FlowIntro"
import AuthCard from "@/components/auth/AuthCard"
import { supabase } from "@/lib/supabase"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  async function handleSignup() {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setMessage(error.message)
      return
    }
    setMessage("Account created. Continue to onboarding.")
    setTimeout(() => {
      window.location.href = "/onboarding"
    }, 700)
  }

  return (
    <AppShell title="Create your account" subtitle="Start your Defrag workspace with a simple account setup.">
      <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <FlowIntro eyebrow="Start" title="Begin with a calm, simple setup" body="Create your account first. Then Defrag will guide you through a short onboarding flow." />
        <AuthCard>
          <h2 className="text-xl font-medium text-zinc-950">Start free trial</h2>
          <p className="mt-2 text-sm text-zinc-600">Create an account to begin your setup.</p>
          <div className="mt-6 space-y-4">
            <input className="w-full rounded-2xl border border-zinc-200 px-4 py-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="w-full rounded-2xl border border-zinc-200 px-4 py-3" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignup} className="w-full rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800">
              Create account
            </button>
            <p className="text-sm text-zinc-600">{message}</p>
          </div>
        </AuthCard>
      </div>
    </AppShell>
  )
}
TSX

cat > apps/web/src/app/onboarding/page.tsx <<'TSX'
import AppShell from "@/components/layout/AppShell"
import FlowIntro from "@/components/flow/FlowIntro"
import ProfileSetupForm from "@/components/onboarding/ProfileSetupForm"

export default function OnboardingPage() {
  return (
    <AppShell title="Profile setup" subtitle="Add the basics so Defrag can personalize insight and build your first system map.">
      <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <FlowIntro eyebrow="Onboarding" title="Build your starting profile" body="Birth details help Defrag build optional timing layers and more personalized insight. You can refine this later." />
        <div className="max-w-2xl">
          <ProfileSetupForm />
        </div>
      </div>
    </AppShell>
  )
}
TSX

cat > apps/web/src/app/relationships/page.tsx <<'TSX'
import AppShell from "@/components/layout/AppShell"
import RelationshipList from "@/components/relationships/RelationshipList"
import { mockRelationships } from "@/lib/mock/systemData"

export default function RelationshipsPage() {
  return (
    <AppShell title="Relationships" subtitle="View your current relationship system, including tension and trust across key connections.">
      <RelationshipList relationships={mockRelationships} />
    </AppShell>
  )
}
TSX

cat > apps/web/src/app/timeline/page.tsx <<'TSX'
import AppShell from "@/components/layout/AppShell"
import EventTimeline from "@/components/timeline/EventTimeline"
import { mockEvents } from "@/lib/mock/systemData"

export default function TimelinePage() {
  return (
    <AppShell title="Timeline" subtitle="Review the moments that are shaping the current dynamic.">
      <EventTimeline events={mockEvents} />
    </AppShell>
  )
}
TSX

cat > apps/web/src/app/simulations/page.tsx <<'TSX'
import AppShell from "@/components/layout/AppShell"
import Surface from "@/components/ui/Surface"
import SimulationPanel from "@/components/sim/SimulationPanel"

export default function SimulationsPage() {
  return (
    <AppShell title="Simulations" subtitle="Preview likely outcomes before acting.">
      <Surface className="max-w-3xl p-6">
        <SimulationPanel />
      </Surface>
    </AppShell>
  )
}
TSX

cat > apps/web/src/app/api/profile/route.ts <<'TS'
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()
  return NextResponse.json({ ok: true, profile: body })
}
TS

cat > apps/web/src/app/api/events/route.ts <<'TS'
import { NextResponse } from "next/server"
import { mockEvents } from "@/lib/mock/systemData"

export async function GET() {
  return NextResponse.json({ events: mockEvents })
}
TS

cat > apps/web/src/app/api/relationships/route.ts <<'TS'
import { NextResponse } from "next/server"
import { mockRelationships } from "@/lib/mock/systemData"

export async function GET() {
  return NextResponse.json({ relationships: mockRelationships })
}
TS

cat > apps/web/src/app/api/subscription/route.ts <<'TS'
import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    status: "trial",
    plan: "core",
    trialEndsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
  })
}
TS

cat > apps/web/src/app/api/status/route.ts <<'TS'
import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ ok: true, web: "running", build: "active" })
}
TS

cat > apps/web/src/app/api/insight/route.ts <<'TS'
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()
  const message = body?.message || "No message provided."

  return NextResponse.json({
    insight: `Defrag sees a pattern worth slowing down for. Based on what you shared — "${message}" — the healthiest next step may be to reduce urgency, clarify what you need, and avoid reacting too quickly.`,
  })
}
TS

cat > apps/web/src/app/api/simulate/route.ts <<'TS'
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()
  const action = body?.action || "delay"

  const outcomes: Record<string, { risk: number; repair: number; note: string }> = {
    direct_confrontation: { risk: 0.72, repair: 0.18, note: "Direct confrontation may increase tension if the system is already activated." },
    calm_boundary: { risk: 0.34, repair: 0.58, note: "A calm boundary often improves clarity, even if the first response is defensive." },
    delay: { risk: 0.22, repair: 0.41, note: "Waiting can reduce immediate friction, but unresolved issues may remain." },
  }

  return NextResponse.json(outcomes[action] || outcomes.delay)
}
TS

cat > apps/web/src/app/api/stripe/webhook/route.ts <<'TS'
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.text()
  return NextResponse.json({ received: true, size: body.length })
}
TS

echo "phase_02_complete_flows.sh completed"
