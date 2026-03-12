#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

mkdir -p apps/web/src/components/{brand,ui,layout,marketing,auth,dashboard,chat,graph,genogram,relationships,timeline,sim}

cat > apps/web/src/components/brand/BrandMesh.tsx <<'TSX'
export default function BrandMesh() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#f7f8fc]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.14),transparent_26%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.14),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.10),transparent_24%)]" />
      <div className="absolute left-[-10%] top-[-10%] h-[32rem] w-[32rem] rounded-full bg-fuchsia-200/25 blur-3xl" />
      <div className="absolute right-[-8%] top-[8%] h-[28rem] w-[28rem] rounded-full bg-sky-200/25 blur-3xl" />
      <div className="absolute bottom-[-12%] left-[25%] h-[24rem] w-[24rem] rounded-full bg-violet-200/20 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] [background-size:48px_48px]" />
    </div>
  )
}
TSX

cat > apps/web/src/components/ui/PremiumPanel.tsx <<'TSX'
import type { ReactNode } from "react"
import { cn } from "@/lib/cn"

export default function PremiumPanel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-[30px] border border-white/70 bg-white/82 shadow-[0_24px_100px_rgba(15,23,42,0.10)] backdrop-blur-2xl",
        className
      )}
    >
      {children}
    </div>
  )
}
TSX

cat > apps/web/src/components/layout/AppShell.tsx <<'TSX'
"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { LayoutDashboard, Users, Clock3, Sparkles, CreditCard, Settings, ChevronRight } from "lucide-react"
import BrandMesh from "@/components/brand/BrandMesh"
import PremiumPanel from "@/components/ui/PremiumPanel"

function NavItem({
  href,
  label,
  icon,
}: {
  href: string
  label: string
  icon: ReactNode
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-zinc-600 transition hover:bg-zinc-950 hover:text-white"
    >
      <span className="flex items-center gap-3">
        {icon}
        <span>{label}</span>
      </span>
      <ChevronRight size={16} className="opacity-0 transition group-hover:opacity-100" />
    </Link>
  )
}

export default function AppShell({
  children,
  title,
  subtitle,
}: {
  children: ReactNode
  title?: string
  subtitle?: string
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f8fc] text-zinc-950">
      <BrandMesh />

      <div className="relative mx-auto max-w-[1600px] px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-6">
        <div className="grid gap-4 lg:grid-cols-[320px_1fr] lg:gap-6">
          <PremiumPanel className="h-fit p-5 lg:sticky lg:top-6 lg:p-7">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-[11px] font-semibold uppercase tracking-[0.36em] text-zinc-500">
                Defrag
              </Link>
              <div className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11px] font-medium text-zinc-600">
                Beta
              </div>
            </div>

            <h1 className="mt-4 text-[26px] font-semibold tracking-tight">Relational intelligence</h1>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Clear insight for relationships, communication, and recurring patterns.
            </p>

            <div className="mt-7 rounded-[26px] border border-zinc-200 bg-[linear-gradient(180deg,#ffffff,#f5f7fb)] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">System status</p>
              <p className="mt-3 text-2xl font-semibold tracking-tight">Elevated</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                A pause-first approach is more likely to improve outcomes today.
              </p>
            </div>

            <nav className="mt-7 grid gap-2">
              <NavItem href="/dashboard" label="Dashboard" icon={<LayoutDashboard size={18} />} />
              <NavItem href="/relationships" label="Relationships" icon={<Users size={18} />} />
              <NavItem href="/timeline" label="Timeline" icon={<Clock3 size={18} />} />
              <NavItem href="/simulations" label="Simulations" icon={<Sparkles size={18} />} />
              <NavItem href="/pricing" label="Pricing" icon={<CreditCard size={18} />} />
              <NavItem href="/settings" label="Settings" icon={<Settings size={18} />} />
            </nav>

            <div className="mt-8 rounded-[26px] border border-zinc-200 bg-zinc-50/80 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Today</p>
              <p className="mt-3 text-sm leading-6 text-zinc-700">
                Short clarifications and calm boundaries are more effective than urgency.
              </p>
            </div>
          </PremiumPanel>

          <div className="space-y-4 lg:space-y-6">
            <PremiumPanel className="p-6 sm:p-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-zinc-500">Defrag Workspace</p>
                  {title ? <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[42px]">{title}</h2> : null}
                  {subtitle ? <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-600">{subtitle}</p> : null}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-zinc-500">State</p>
                    <p className="mt-2 text-sm font-medium text-zinc-950">Elevated</p>
                  </div>
                  <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-zinc-500">Repair</p>
                    <p className="mt-2 text-sm font-medium text-zinc-950">Moderate</p>
                  </div>
                  <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-zinc-500">Timing</p>
                    <p className="mt-2 text-sm font-medium text-zinc-950">Pause first</p>
                  </div>
                </div>
              </div>
            </PremiumPanel>

            {children}
          </div>
        </div>
      </div>
    </main>
  )
}
TSX

cat > apps/web/src/components/marketing/HeroLanding.tsx <<'TSX'
import Link from "next/link"
import { ArrowRight, ShieldCheck, Sparkles, Network, Clock3, BrainCircuit } from "lucide-react"
import BrandMesh from "@/components/brand/BrandMesh"
import PremiumPanel from "@/components/ui/PremiumPanel"

function Feature({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode
  title: string
  body: string
}) {
  return (
    <PremiumPanel className="p-6">
      <div className="inline-flex rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm">
        {icon}
      </div>
      <h3 className="mt-5 text-lg font-medium text-zinc-950">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-zinc-600">{body}</p>
    </PremiumPanel>
  )
}

export default function HeroLanding() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f8fc] px-3 py-3 text-zinc-950 sm:px-4 sm:py-4 lg:px-6 lg:py-6">
      <BrandMesh />

      <div className="relative mx-auto max-w-7xl space-y-4 lg:space-y-6">
        <PremiumPanel className="overflow-hidden px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-zinc-500 shadow-sm">
                Defrag
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[64px] lg:leading-[1.02]">
                Understand the patterns shaping your relationships.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 sm:text-lg">
                Defrag helps you make sense of communication, tension, timing, and recurring dynamics through clear, practical insight designed to support healthier outcomes.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
                >
                  Start free trial
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-2xl border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50"
                >
                  View pricing
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-3 text-sm text-zinc-700">Relationship maps</div>
                <div className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-3 text-sm text-zinc-700">Simulations</div>
                <div className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-3 text-sm text-zinc-700">AI guidance</div>
              </div>
            </div>

            <PremiumPanel className="p-5 sm:p-6">
              <div className="rounded-[26px] border border-zinc-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-zinc-950">Daily relational insight</p>
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">Live</span>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-zinc-500">System state</p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight">Elevated</p>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">Recent signals suggest higher sensitivity around unresolved topics.</p>
                  </div>

                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-zinc-500">Suggested approach</p>
                    <p className="mt-2 text-sm leading-7 text-zinc-700">Use short clarifications, avoid urgency, and pause before reacting to sensitive messages.</p>
                  </div>

                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-zinc-950">Repair potential</span>
                      <span className="text-sm text-zinc-600">Moderate</span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-zinc-200">
                      <div className="h-2 w-[62%] rounded-full bg-zinc-950" />
                    </div>
                  </div>
                </div>
              </div>
            </PremiumPanel>
          </div>
        </PremiumPanel>

        <section className="grid gap-4 md:grid-cols-3 md:gap-6">
          <Feature
            icon={<Network size={20} />}
            title="See relationship patterns"
            body="Map the people, tension points, and recurring cycles that shape your daily experience."
          />
          <Feature
            icon={<BrainCircuit size={20} />}
            title="Prepare for difficult conversations"
            body="Explore likely outcomes before you act, with guidance aimed at healthier communication."
          />
          <Feature
            icon={<ShieldCheck size={20} />}
            title="Follow daily insight"
            body="Get calm, practical guidance about timing, pressure, and ways to reduce avoidable friction."
          />
        </section>

        <PremiumPanel className="p-6 sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">How Defrag helps</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">A premium system for relational clarity</h2>
              <p className="mt-4 text-sm leading-7 text-zinc-600">
                Built to help individuals, families, and teams understand recurring dynamics with more context and less stigma.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-zinc-200 bg-white/80 p-5">
                <div className="inline-flex rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm">
                  <Clock3 size={18} />
                </div>
                <h3 className="mt-4 text-base font-medium">Timeline awareness</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600">Track how events build over time instead of reacting to isolated moments.</p>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white/80 p-5">
                <div className="inline-flex rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm">
                  <Sparkles size={18} />
                </div>
                <h3 className="mt-4 text-base font-medium">Calm AI guidance</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600">Receive practical insight designed to support healthier outcomes for everyone involved.</p>
              </div>
            </div>
          </div>
        </PremiumPanel>
      </div>
    </main>
  )
}
TSX

cat > apps/web/src/components/auth/AuthShell.tsx <<'TSX'
import type { ReactNode } from "react"
import Link from "next/link"
import BrandMesh from "@/components/brand/BrandMesh"
import PremiumPanel from "@/components/ui/PremiumPanel"

export default function AuthShell({
  eyebrow,
  title,
  body,
  children,
  footerText,
  footerLinkLabel,
  footerLinkHref,
}: {
  eyebrow: string
  title: string
  body: string
  children: ReactNode
  footerText: string
  footerLinkLabel: string
  footerLinkHref: string
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f8fc] px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-6">
      <BrandMesh />

      <div className="relative mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-7xl items-center gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        <PremiumPanel className="p-7 sm:p-10 lg:p-12">
          <Link href="/" className="text-[11px] font-semibold uppercase tracking-[0.34em] text-zinc-500">
            Defrag
          </Link>

          <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-600">{body}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white/80 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-zinc-500">Clear insight</p>
              <p className="mt-2 text-sm leading-6 text-zinc-700">Understand patterns before they become larger problems.</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white/80 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-zinc-500">Healthy outcomes</p>
              <p className="mt-2 text-sm leading-6 text-zinc-700">Guidance is designed to reduce stigma and improve communication.</p>
            </div>
          </div>
        </PremiumPanel>

        <PremiumPanel className="mx-auto w-full max-w-md p-6 sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">{eyebrow}</p>
          <div className="mt-5">{children}</div>
          <p className="mt-6 text-sm text-zinc-600">
            {footerText}{" "}
            <Link href={footerLinkHref} className="font-medium text-zinc-950 underline-offset-4 hover:underline">
              {footerLinkLabel}
            </Link>
          </p>
        </PremiumPanel>
      </div>
    </main>
  )
}
TSX

cat > apps/web/src/components/dashboard/StatCard.tsx <<'TSX'
import PremiumPanel from "@/components/ui/PremiumPanel"

export default function StatCard({
  label,
  value,
  note,
}: {
  label: string
  value: string
  note: string
}) {
  return (
    <PremiumPanel className="p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">{label}</p>
      <p className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950">{value}</p>
      <p className="mt-3 text-sm leading-6 text-zinc-600">{note}</p>
    </PremiumPanel>
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
      <p className="mt-2 text-sm text-zinc-600">Clear guidance for real relationship dynamics.</p>

      <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm leading-7 text-zinc-700">
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

cat > apps/web/src/components/graph/RelationshipGraph.tsx <<'TSX'
"use client"

export default function RelationshipGraph() {
  return (
    <div className="relative h-[340px] w-full overflow-hidden rounded-[26px] border border-zinc-200 bg-[linear-gradient(180deg,#ffffff,#f5f7fb)]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 900 340" fill="none">
        <path d="M450 70 C 340 130, 245 165, 180 235" stroke="#a1a1aa" strokeWidth="2" />
        <path d="M450 70 C 560 130, 655 165, 720 235" stroke="#a1a1aa" strokeWidth="2" />
        <path d="M450 70 C 450 130, 450 180, 450 260" stroke="#a1a1aa" strokeWidth="2" />
      </svg>

      <div className="absolute left-1/2 top-10 -translate-x-1/2 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm font-medium shadow-sm">
        You
      </div>
      <div className="absolute left-12 top-44 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm shadow-sm">
        Partner
      </div>
      <div className="absolute right-12 top-44 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm shadow-sm">
        Parent
      </div>
      <div className="absolute left-1/2 bottom-10 -translate-x-1/2 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm shadow-sm">
        Sibling
      </div>
    </div>
  )
}
TSX

cat > apps/web/src/components/genogram/FamilyGraph.tsx <<'TSX'
"use client"

export default function FamilyGraph() {
  return (
    <div className="rounded-[26px] border border-zinc-200 bg-[linear-gradient(180deg,#ffffff,#f5f7fb)] p-6">
      <div className="grid gap-10">
        <div className="flex items-center justify-center gap-10 sm:gap-20">
          <div className="rounded-2xl border border-zinc-300 bg-white px-6 py-4 text-sm shadow-sm">Parent A</div>
          <div className="rounded-2xl border border-zinc-300 bg-white px-6 py-4 text-sm shadow-sm">Parent B</div>
        </div>

        <div className="mx-auto h-8 w-px bg-zinc-300" />

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          <div className="rounded-2xl border border-zinc-300 bg-white px-6 py-4 text-sm shadow-sm">You</div>
          <div className="rounded-2xl border border-zinc-300 bg-white px-6 py-4 text-sm shadow-sm">Sibling</div>
          <div className="rounded-2xl border border-zinc-300 bg-white px-6 py-4 text-sm shadow-sm">Relative</div>
        </div>
      </div>
    </div>
  )
}
TSX

cat > apps/web/src/app/page.tsx <<'TSX'
import HeroLanding from "@/components/marketing/HeroLanding"

export default function HomePage() {
  return <HeroLanding />
}
TSX

cat > apps/web/src/app/dashboard/page.tsx <<'TSX'
import AppShell from "@/components/layout/AppShell"
import StatCard from "@/components/dashboard/StatCard"
import PremiumPanel from "@/components/ui/PremiumPanel"
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

      <section className="grid gap-4 lg:gap-6 2xl:grid-cols-[1.15fr_0.85fr]">
        <PremiumPanel className="p-5 sm:p-6">
          <h2 className="text-lg font-medium text-zinc-950">Relationship map</h2>
          <p className="mt-2 text-sm text-zinc-600">Visual overview of the current relationship system.</p>
          <div className="mt-6">
            <RelationshipGraph />
          </div>
        </PremiumPanel>

        <PremiumPanel className="p-5 sm:p-6">
          <AIChat />
        </PremiumPanel>
      </section>

      <section className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        <PremiumPanel className="p-5 sm:p-6">
          <h2 className="text-lg font-medium text-zinc-950">Family system map</h2>
          <p className="mt-2 text-sm text-zinc-600">View the wider family pattern and key roles.</p>
          <div className="mt-6">
            <FamilyGraph />
          </div>
        </PremiumPanel>

        <PremiumPanel className="p-5 sm:p-6">
          <SimulationPanel />
        </PremiumPanel>
      </section>

      <section className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        <PremiumPanel className="p-5 sm:p-6">
          <h2 className="text-lg font-medium text-zinc-950">Current relationships</h2>
          <p className="mt-2 text-sm text-zinc-600">Track trust and tension across your current system.</p>
          <div className="mt-6">
            <RelationshipList relationships={mockRelationships} />
          </div>
        </PremiumPanel>

        <PremiumPanel className="p-5 sm:p-6">
          <h2 className="text-lg font-medium text-zinc-950">Event timeline</h2>
          <p className="mt-2 text-sm text-zinc-600">Review the moments shaping the current pattern.</p>
          <div className="mt-6">
            <EventTimeline events={mockEvents} />
          </div>
        </PremiumPanel>
      </section>
    </AppShell>
  )
}
TSX

echo "phase_07_true_premium_ui.sh completed"
