#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="${1:-$HOME/DEFRAG.app}"
cd "$REPO_DIR"

mkdir -p apps/web/src/{app/{api/{events,profile,relationships,status,subscription,insight,simulate,stripe/webhook},dashboard,login,onboarding,pricing,relationships,settings,simulations,signup,timeline},components/{chat,dashboard,genogram,graph,layout,marketing,onboarding,pricing,relationships,sim,timeline},hooks,lib/{mock}}
mkdir -p apps/api/app/{routers,schemas,services}
mkdir -p infra/supabase .github/workflows automation

cat > apps/web/src/components/layout/AppShell.tsx <<'TSX'
import type { ReactNode } from "react"
import Link from "next/link"

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950">
      <span>{label}</span>
    </Link>
  )
}

export default function AppShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 xl:grid-cols-[280px_1fr]">
        <aside className="border-r border-zinc-200 bg-white/90 px-6 py-8">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">Defrag</p>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight">Relational intelligence</h1>
            <p className="mt-2 text-sm leading-6 text-zinc-600">Understand patterns in relationships, families, and teams.</p>
          </div>
          <nav className="space-y-2">
            <NavItem href="/dashboard" label="Dashboard" />
            <NavItem href="/relationships" label="Relationships" />
            <NavItem href="/timeline" label="Timeline" />
            <NavItem href="/simulations" label="Simulations" />
            <NavItem href="/pricing" label="Pricing" />
            <NavItem href="/settings" label="Settings" />
          </nav>
          <div className="mt-10 rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">Today</p>
            <p className="mt-3 text-sm leading-6 text-zinc-700">Calm pacing and short clarifications are more likely to help than urgency.</p>
          </div>
        </aside>
        <section className="px-6 py-8 md:px-8 xl:px-10">
          <div className="mb-8">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">Defrag Workspace</p>
            <h2 className="mt-2 text-4xl font-semibold tracking-tight">{title}</h2>
            {subtitle ? <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">{subtitle}</p> : null}
          </div>
          {children}
        </section>
      </div>
    </main>
  )
}
TSX

cat > apps/web/src/components/marketing/Hero.tsx <<'TSX'
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-4xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.24em] text-zinc-500">Defrag</p>
          <h1 className="text-5xl font-semibold tracking-tight text-zinc-950 sm:text-6xl">
            Understand the patterns shaping your relationships.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
            Defrag helps people make sense of communication, tension, timing, and recurring dynamics through clear, practical insight.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="/signup" className="rounded-2xl bg-zinc-950 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800">Start free trial</a>
            <a href="/login" className="rounded-2xl border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50">Log in</a>
          </div>
        </div>
      </div>
    </section>
  )
}
TSX

cat > apps/web/src/components/dashboard/StatCard.tsx <<'TSX'
export default function StatCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <p className="text-sm font-medium text-zinc-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">{value}</p>
      <p className="mt-2 text-sm leading-6 text-zinc-600">{note}</p>
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
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-medium text-zinc-950">Defrag AI</h2>
      <p className="text-sm text-zinc-600">Simple guidance for real dynamics.</p>
      <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 text-zinc-700">{reply}</div>
      <textarea className="mt-4 min-h-[120px] w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-zinc-400" placeholder="Describe the relationship situation you want to understand." value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button onClick={send} className="mt-4 rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800">Analyze</button>
    </div>
  )
}
TSX

cat > apps/web/src/components/graph/RelationshipGraph.tsx <<'TSX'
"use client"
export default function RelationshipGraph() {
  return (
    <div className="grid h-full place-items-center rounded-2xl bg-[linear-gradient(180deg,#fafafa,#f4f4f5)] p-6">
      <div className="relative h-full w-full max-w-[560px]">
        <div className="absolute left-1/2 top-8 -translate-x-1/2 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm font-medium shadow-sm">You</div>
        <div className="absolute left-10 top-40 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm shadow-sm">Partner</div>
        <div className="absolute right-10 top-40 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm shadow-sm">Parent</div>
        <div className="absolute left-1/2 bottom-10 -translate-x-1/2 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm shadow-sm">Sibling</div>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 560 360" fill="none">
          <path d="M280 55 C 180 95, 130 150, 95 195" stroke="#a1a1aa" strokeWidth="2" />
          <path d="M280 55 C 380 95, 430 150, 465 195" stroke="#a1a1aa" strokeWidth="2" />
          <path d="M280 55 C 280 150, 280 230, 280 305" stroke="#a1a1aa" strokeWidth="2" />
        </svg>
      </div>
    </div>
  )
}
TSX

cat > apps/web/src/components/genogram/FamilyGraph.tsx <<'TSX'
"use client"
export default function FamilyGraph() {
  return (
    <div className="grid h-full place-items-center rounded-2xl bg-[linear-gradient(180deg,#fafafa,#f4f4f5)] p-6">
      <div className="grid w-full max-w-2xl gap-10">
        <div className="flex items-center justify-center gap-20">
          <div className="rounded-2xl border border-zinc-300 bg-white px-6 py-4 text-sm shadow-sm">Parent A</div>
          <div className="rounded-2xl border border-zinc-300 bg-white px-6 py-4 text-sm shadow-sm">Parent B</div>
        </div>
        <div className="mx-auto h-8 w-px bg-zinc-300" />
        <div className="flex items-center justify-center gap-12">
          <div className="rounded-2xl border border-zinc-300 bg-white px-6 py-4 text-sm shadow-sm">You</div>
          <div className="rounded-2xl border border-zinc-300 bg-white px-6 py-4 text-sm shadow-sm">Sibling</div>
          <div className="rounded-2xl border border-zinc-300 bg-white px-6 py-4 text-sm shadow-sm">Relative</div>
        </div>
      </div>
    </div>
  )
}
TSX

cat > apps/web/src/components/sim/SimulationPanel.tsx <<'TSX'
"use client"
import { useState } from "react"

type SimResult = { risk: number; repair: number; note: string }

export default function SimulationPanel() {
  const [result, setResult] = useState<SimResult | null>(null)

  function run(action: "direct" | "boundary" | "wait") {
    const outcomes: Record<string, SimResult> = {
      direct: { risk: 0.72, repair: 0.18, note: "Direct confrontation may increase tension if the system is already activated." },
      boundary: { risk: 0.34, repair: 0.58, note: "A calm boundary often improves clarity, even if the first response is defensive." },
      wait: { risk: 0.22, repair: 0.41, note: "Waiting can reduce immediate friction, but unresolved issues may remain." },
    }
    setResult(outcomes[action])
  }

  return (
    <div>
      <h2 className="text-lg font-medium text-zinc-950">Simulation</h2>
      <p className="mt-2 text-sm text-zinc-600">Explore likely outcomes before acting.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button onClick={() => run("direct")} className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50">Direct</button>
        <button onClick={() => run("boundary")} className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50">Boundary</button>
        <button onClick={() => run("wait")} className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50">Wait</button>
      </div>
      <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
        {result ? (
          <div className="space-y-2 text-sm text-zinc-700">
            <p><span className="font-medium text-zinc-950">Risk:</span> {result.risk}</p>
            <p><span className="font-medium text-zinc-950">Repair potential:</span> {result.repair}</p>
            <p><span className="font-medium text-zinc-950">Guidance:</span> {result.note}</p>
          </div>
        ) : (
          <p className="text-sm text-zinc-600">Choose an option to preview a likely outcome.</p>
        )}
      </div>
    </div>
  )
}
TSX

cat > apps/web/src/components/timeline/EventTimeline.tsx <<'TSX'
type EventItem = { id: string; event_type: string; actor: string; target: string; severity: number; notes: string; created_at: string }

export default function EventTimeline({ events }: { events: EventItem[] }) {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">{event.event_type}</p>
            <p className="text-xs text-zinc-500">{new Date(event.created_at).toLocaleString()}</p>
          </div>
          <p className="mt-2 text-sm text-zinc-700"><span className="font-medium text-zinc-950">{event.actor}</span> → <span className="font-medium text-zinc-950">{event.target}</span></p>
          <p className="mt-2 text-sm leading-6 text-zinc-600">{event.notes}</p>
          <p className="mt-3 text-xs text-zinc-500">Severity: {event.severity}</p>
        </div>
      ))}
    </div>
  )
}
TSX

cat > apps/web/src/components/relationships/RelationshipList.tsx <<'TSX'
type RelationshipItem = { id: string; source_name: string; target_name: string; relationship_type: string; tension_score: number; trust_score: number }

export default function RelationshipList({ relationships }: { relationships: RelationshipItem[] }) {
  return (
    <div className="space-y-4">
      {relationships.map((rel) => (
        <div key={rel.id} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-zinc-950">{rel.source_name} → {rel.target_name}</p>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">{rel.relationship_type}</span>
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
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-medium text-zinc-950">Set up your profile</h2>
      <p className="mt-2 text-sm leading-6 text-zinc-600">Birth details are used to build optional timing layers and improve personal insight.</p>
      <div className="mt-6 grid gap-4">
        <input className="rounded-2xl border border-zinc-200 px-4 py-3" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <input className="rounded-2xl border border-zinc-200 px-4 py-3" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        <input className="rounded-2xl border border-zinc-200 px-4 py-3" type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} />
        <input className="rounded-2xl border border-zinc-200 px-4 py-3" placeholder="Birth place" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} />
        <button onClick={saveProfile} className="rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800">Continue</button>
        {message ? <p className="text-sm text-zinc-600">{message}</p> : null}
      </div>
    </div>
  )
}
TSX

cat > apps/web/src/components/pricing/PricingCard.tsx <<'TSX'
export default function PricingCard({ name, price, description, features, featured = false }: { name: string; price: string; description: string; features: string[]; featured?: boolean }) {
  return (
    <div className={`rounded-3xl border p-6 shadow-sm ${featured ? "border-zinc-900 bg-zinc-950 text-white" : "border-zinc-200 bg-white text-zinc-950"}`}>
      <p className={`text-sm font-medium uppercase tracking-[0.2em] ${featured ? "text-zinc-300" : "text-zinc-500"}`}>{name}</p>
      <p className="mt-4 text-4xl font-semibold tracking-tight">{price}</p>
      <p className={`mt-3 text-sm leading-6 ${featured ? "text-zinc-300" : "text-zinc-600"}`}>{description}</p>
      <ul className={`mt-6 space-y-3 text-sm ${featured ? "text-zinc-200" : "text-zinc-700"}`}>
        {features.map((feature) => <li key={feature}>• {feature}</li>)}
      </ul>
      <a href="/signup" className={`mt-8 inline-block rounded-2xl px-5 py-3 text-sm font-medium transition ${featured ? "bg-white text-zinc-950 hover:bg-zinc-100" : "bg-zinc-950 text-white hover:bg-zinc-800"}`}>Get started</a>
    </div>
  )
}
TSX

cat > apps/web/src/components/settings/SettingsPanel.tsx <<'TSX'
export default function SettingsPanel() {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-medium text-zinc-950">Account settings</h2>
      <p className="mt-2 text-sm leading-6 text-zinc-600">Manage profile details, access, and account preferences.</p>
      <div className="mt-6 grid gap-4">
        <div className="rounded-2xl border border-zinc-200 p-4">
          <p className="text-sm font-medium text-zinc-950">Password recovery</p>
          <p className="mt-2 text-sm text-zinc-600">Use the login screen if you need to reset your password.</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 p-4">
          <p className="text-sm font-medium text-zinc-950">Notifications</p>
          <p className="mt-2 text-sm text-zinc-600">Daily insight and account notifications will appear here later.</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 p-4">
          <p className="text-sm font-medium text-zinc-950">Subscription</p>
          <p className="mt-2 text-sm text-zinc-600">Manage your access plan from the pricing page.</p>
        </div>
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

cat > apps/web/src/app/page.tsx <<'TSX'
import Hero from "@/components/marketing/Hero"

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <h3 className="text-lg font-medium text-zinc-950">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-600">{body}</p>
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-zinc-50 to-white text-zinc-950">
      <Hero />
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">What Defrag helps with</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Clear insight for real relationships</h2>
          <p className="mt-4 text-zinc-600">Defrag is designed to make relationship patterns easier to understand, so people can communicate with more clarity and less friction.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Feature title="See relationship patterns" body="Map the people, tension points, and recurring cycles that shape your daily experience." />
          <Feature title="Prepare for difficult conversations" body="Explore likely outcomes before you act, with guidance aimed at healthier communication." />
          <Feature title="Follow daily insight" body="Get clear, calm guidance about timing, pressure, and ways to reduce avoidable friction." />
        </div>
      </section>
    </main>
  )
}
TSX

cat > apps/web/src/app/dashboard/page.tsx <<'TSX'
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
TSX

cat > apps/web/src/app/onboarding/page.tsx <<'TSX'
import AppShell from "@/components/layout/AppShell"
import ProfileSetupForm from "@/components/onboarding/ProfileSetupForm"

export default function OnboardingPage() {
  return (
    <AppShell title="Profile setup" subtitle="Add the basics so Defrag can personalize insight and build your first relationship system.">
      <div className="max-w-2xl"><ProfileSetupForm /></div>
    </AppShell>
  )
}
TSX

cat > apps/web/src/app/pricing/page.tsx <<'TSX'
import AppShell from "@/components/layout/AppShell"
import PricingCard from "@/components/pricing/PricingCard"

export default function PricingPage() {
  return (
    <AppShell title="Simple pricing" subtitle="Start with a free trial and upgrade when you are ready for deeper insight.">
      <section className="grid gap-6 lg:grid-cols-3">
        <PricingCard name="Starter" price="Free" description="A simple entry point for exploring Defrag." features={["Basic dashboard access", "Limited daily insight", "Simple relationship map"]} />
        <PricingCard name="Core" price="$24/mo" description="The main plan for personal use and steady insight." features={["Full dashboard", "Simulation tools", "Expanded system mapping", "Priority AI insight"]} featured />
        <PricingCard name="Practitioner" price="$99/mo" description="For coaches, facilitators, and professional use." features={["Multiple profiles", "Expanded reporting", "Longitudinal tracking", "Advanced workflow support"]} />
      </section>
    </AppShell>
  )
}
TSX

cat > apps/web/src/app/settings/page.tsx <<'TSX'
import AppShell from "@/components/layout/AppShell"
import SettingsPanel from "@/components/settings/SettingsPanel"

export default function SettingsPage() {
  return (
    <AppShell title="Settings" subtitle="Control profile information, access, and future notification preferences.">
      <div className="max-w-3xl"><SettingsPanel /></div>
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
    <AppShell title="Relationships" subtitle="Track trust, tension, and the current shape of your relationship system.">
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
import SimulationPanel from "@/components/sim/SimulationPanel"

export default function SimulationsPage() {
  return (
    <AppShell title="Simulations" subtitle="Explore likely outcomes before acting.">
      <div className="max-w-3xl rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"><SimulationPanel /></div>
    </AppShell>
  )
}
TSX

cat > apps/web/src/app/api/profile/route.ts <<'TS'
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()
  return NextResponse.json({
    ok: true,
    profile: {
      fullName: body.fullName || "",
      birthDate: body.birthDate || "",
      birthTime: body.birthTime || "",
      birthPlace: body.birthPlace || "",
    },
  })
}
TS

cat > apps/web/src/app/api/events/route.ts <<'TS'
import { NextResponse } from "next/server"
import { mockEvents } from "@/lib/mock/systemData"

export async function GET() {
  return NextResponse.json({ events: mockEvents })
}
TS

mkdir -p apps/web/src/app/api/relationships
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
  return NextResponse.json({
    ok: true,
    web: "running",
    build: "active",
  })
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
  const action = body?.action || "wait"

  const outcomes: Record<string, { risk: number; repair: number; note: string }> = {
    direct_confrontation: {
      risk: 0.72,
      repair: 0.18,
      note: "Direct confrontation may increase tension if the system is already activated.",
    },
    calm_boundary: {
      risk: 0.34,
      repair: 0.58,
      note: "A calm boundary often improves clarity, even if the first response is defensive.",
    },
    delay: {
      risk: 0.22,
      repair: 0.41,
      note: "Waiting can reduce immediate friction, but unresolved issues may remain.",
    },
  }

  return NextResponse.json(outcomes[action] || outcomes.delay)
}
TS

mkdir -p apps/web/src/app/api/stripe/webhook
cat > apps/web/src/app/api/stripe/webhook/route.ts <<'TS'
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.text()
  return NextResponse.json({ received: true, size: body.length })
}
TS

cat > apps/api/app/schemas/profile.py <<'PY'
from pydantic import BaseModel
from typing import Optional

class ProfileCreate(BaseModel):
    full_name: Optional[str] = None
    birth_date: Optional[str] = None
    birth_time: Optional[str] = None
    birth_place: Optional[str] = None
PY

cat > apps/api/app/schemas/relationship.py <<'PY'
from pydantic import BaseModel

class RelationshipCreate(BaseModel):
    source_name: str
    target_name: str
    relationship_type: str = "personal"
    tension_score: float = 0.2
    trust_score: float = 0.5
PY

cat > apps/api/app/schemas/event.py <<'PY'
from pydantic import BaseModel
from typing import Optional

class EventCreate(BaseModel):
    event_type: str
    actor: Optional[str] = None
    target: Optional[str] = None
    severity: float = 0.5
    notes: Optional[str] = None
PY

cat > apps/api/app/schemas/subscription.py <<'PY'
from pydantic import BaseModel
from typing import Optional

class SubscriptionState(BaseModel):
    status: str = "trial"
    plan: str = "core"
    trial_ends_at: Optional[str] = None
PY

cat > apps/api/app/services/profile_service.py <<'PY'
def save_profile(data: dict):
    return {"ok": True, "profile": data}
PY

cat > apps/api/app/services/relationship_service.py <<'PY'
def list_relationships():
    return {
        "relationships": [
            {"id": "rel_1", "source_name": "You", "target_name": "Partner", "relationship_type": "personal", "tension_score": 0.62, "trust_score": 0.58},
            {"id": "rel_2", "source_name": "You", "target_name": "Sibling", "relationship_type": "family", "tension_score": 0.71, "trust_score": 0.44},
        ]
    }

def create_relationship(data: dict):
    return {"ok": True, "relationship": data}
PY

cat > apps/api/app/services/event_service.py <<'PY'
def list_events():
    return {
        "events": [
            {"id": "evt_1", "event_type": "conflict", "actor": "You", "target": "Sibling", "severity": 0.7, "notes": "Tension increased after a short exchange."},
            {"id": "evt_2", "event_type": "repair", "actor": "You", "target": "Partner", "severity": 0.3, "notes": "Conversation became calmer after a pause."},
        ]
    }

def create_event(data: dict):
    return {"ok": True, "event": data}
PY

cat > apps/api/app/services/subscription_service.py <<'PY'
from datetime import datetime, timedelta

def get_subscription_state():
    return {
        "status": "trial",
        "plan": "core",
        "trial_ends_at": (datetime.utcnow() + timedelta(days=7)).isoformat()
    }
PY

cat > apps/api/app/routers/health.py <<'PY'
from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
def health():
    return {"status": "ok"}
PY

cat > apps/api/app/routers/profile.py <<'PY'
from fastapi import APIRouter
from app.schemas.profile import ProfileCreate
from app.services.profile_service import save_profile

router = APIRouter(prefix="/profile", tags=["profile"])

@router.post("/")
def create_profile(payload: ProfileCreate):
    return save_profile(payload.model_dump())
PY

cat > apps/api/app/routers/relationships.py <<'PY'
from fastapi import APIRouter
from app.schemas.relationship import RelationshipCreate
from app.services.relationship_service import list_relationships, create_relationship

router = APIRouter(prefix="/relationships", tags=["relationships"])

@router.get("/")
def get_relationships():
    return list_relationships()

@router.post("/")
def post_relationship(payload: RelationshipCreate):
    return create_relationship(payload.model_dump())
PY

cat > apps/api/app/routers/events.py <<'PY'
from fastapi import APIRouter
from app.schemas.event import EventCreate
from app.services.event_service import list_events, create_event

router = APIRouter(prefix="/events", tags=["events"])

@router.get("/")
def get_events():
    return list_events()

@router.post("/")
def post_event(payload: EventCreate):
    return create_event(payload.model_dump())
PY

cat > apps/api/app/routers/subscription.py <<'PY'
from fastapi import APIRouter
from app.services.subscription_service import get_subscription_state

router = APIRouter(prefix="/subscription", tags=["subscription"])

@router.get("/")
def read_subscription():
    return get_subscription_state()
PY

cat > apps/api/app/routers/status.py <<'PY'
from fastapi import APIRouter

router = APIRouter(prefix="/status", tags=["status"])

@router.get("/")
def read_status():
    return {"ok": True, "api": "running"}
PY

cat > apps/api/app/main.py <<'PY'
from fastapi import FastAPI
from app.routers import health, profile, relationships, events, subscription, status

app = FastAPI(title="Defrag API")

app.include_router(health.router)
app.include_router(profile.router)
app.include_router(relationships.router)
app.include_router(events.router)
app.include_router(subscription.router)
app.include_router(status.router)
PY

cat > .github/workflows/web-ci.yml <<'YAML'
name: Web CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  build-web:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: apps/web
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
YAML

cat > .github/workflows/api-ci.yml <<'YAML'
name: API CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  build-api:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: apps/api
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.11"
      - run: python -m pip install --upgrade pip
      - run: pip install -r requirements.txt
      - run: python -m compileall app
YAML

cat > infra/supabase/schema.sql <<'SQL'
create extension if not exists pgcrypto;

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique not null,
  full_name text,
  birth_date date,
  birth_time text,
  birth_place text,
  created_at timestamp with time zone default now()
);

create table if not exists relationships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  source_name text not null,
  target_name text not null,
  relationship_type text default 'personal',
  tension_score numeric default 0.2,
  trust_score numeric default 0.5,
  created_at timestamp with time zone default now()
);

create table if not exists system_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  event_type text not null,
  actor text,
  target text,
  severity numeric default 0.5,
  notes text,
  created_at timestamp with time zone default now()
);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique not null,
  status text default 'trial',
  trial_ends_at timestamp with time zone,
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamp with time zone default now()
);

create table if not exists invites (
  id uuid primary key default gen_random_uuid(),
  created_by_user_id uuid not null,
  invite_token text unique not null,
  email text,
  trial_days integer default 7,
  created_at timestamp with time zone default now(),
  expires_at timestamp with time zone
);
SQL

echo "Bootstrap complete."
