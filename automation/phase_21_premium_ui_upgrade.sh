#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

mkdir -p apps/web/src/components/{ui,marketing,dashboard,chat}

cat > apps/web/src/components/ui/GlowCard.tsx <<'TSX'
import type { ReactNode } from "react"
import { cn } from "@/lib/cn"

export default function GlowCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition duration-300 hover:border-white/15 hover:bg-white/[0.06]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.10),transparent_28%)] opacity-80" />
      <div className="relative">{children}</div>
    </div>
  )
}
TSX

cat > apps/web/src/components/marketing/HeroLanding.tsx <<'TSX'
import Link from "next/link"
import { ArrowRight, BrainCircuit, Clock3, Network, ShieldCheck, Sparkles } from "lucide-react"
import BrandMesh from "@/components/brand/BrandMesh"
import GlowCard from "@/components/ui/GlowCard"

function Metric({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">{label}</p>
      <p className="mt-2 text-lg font-semibold tracking-tight text-white">{value}</p>
    </div>
  )
}

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
    <GlowCard className="p-6">
      <div className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 text-white">
        {icon}
      </div>
      <h3 className="mt-5 text-lg font-medium text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/60">{body}</p>
    </GlowCard>
  )
}

export default function HeroLanding() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09090b] px-3 py-3 text-white sm:px-4 sm:py-4 lg:px-6 lg:py-6">
      <BrandMesh />

      <div className="relative mx-auto max-w-7xl space-y-4 lg:space-y-6">
        <GlowCard className="p-4 sm:p-6 lg:p-8">
          <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] px-6 py-10 sm:px-8 lg:px-12 lg:py-16">
            <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
              <div>
                <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/50">
                  Defrag Platform
                </div>

                <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[72px] lg:leading-[0.98]">
                  Understand the relationship system before the next move.
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
                  Defrag helps you map people, track meaningful events, compare possible responses, and receive practical guidance before important conversations.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-100"
                  >
                    Start free trial
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                  >
                    View dashboard
                  </Link>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <Metric label="Map" value="Relationships" />
                  <Metric label="Track" value="Timeline" />
                  <Metric label="Prepare" value="Simulations" />
                </div>
              </div>

              <GlowCard className="p-5 sm:p-6">
                <div className="grid gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Relationship map</p>
                    <p className="mt-2 text-sm leading-7 text-white/65">See who is involved and where the strongest pressure points sit.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Timeline</p>
                    <p className="mt-2 text-sm leading-7 text-white/65">Track the events shaping the active dynamic instead of reacting to a single moment.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">AI guidance</p>
                    <p className="mt-2 text-sm leading-7 text-white/65">Turn situations into structured insight and clearer next steps.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Simulation</p>
                    <p className="mt-2 text-sm leading-7 text-white/65">Compare possible responses before the conversation happens.</p>
                  </div>
                </div>
              </GlowCard>
            </div>
          </div>
        </GlowCard>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 md:gap-6">
          <Feature icon={<Network size={20} />} title="Relationship mapping" body="Organize the people in your system and see how the connections influence each other." />
          <Feature icon={<Clock3 size={20} />} title="Timeline awareness" body="Review conflict, repair, and stress over time so the larger pattern becomes visible." />
          <Feature icon={<BrainCircuit size={20} />} title="Decision support" body="Use structured guidance to move with more clarity and less reactivity." />
          <Feature icon={<ShieldCheck size={20} />} title="Healthier outcomes" body="Built to support better conversations, better timing, and more grounded choices." />
        </section>

        <GlowCard className="p-6 sm:p-8 lg:p-10">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <Sparkles size={18} className="text-white" />
              <h3 className="mt-4 text-base font-medium text-white">Premium interface</h3>
              <p className="mt-3 text-sm leading-7 text-white/60">Dark glass surfaces, stronger hierarchy, and cleaner spacing across every core screen.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <Network size={18} className="text-white" />
              <h3 className="mt-4 text-base font-medium text-white">Organized system view</h3>
              <p className="mt-3 text-sm leading-7 text-white/60">The dashboard, relationships, and timeline pages all point back to the same platform purpose.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <BrainCircuit size={18} className="text-white" />
              <h3 className="mt-4 text-base font-medium text-white">Action-oriented guidance</h3>
              <p className="mt-3 text-sm leading-7 text-white/60">Simulations and AI guidance are framed around real next-step preparation.</p>
            </div>
          </div>
        </GlowCard>
      </div>
    </main>
  )
}
TSX

cat > apps/web/src/components/dashboard/DashboardHero.tsx <<'TSX'
import GlowCard from "@/components/ui/GlowCard"

export default function DashboardHero() {
  return (
    <GlowCard className="overflow-hidden p-5 sm:p-6 lg:p-8">
      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">Dashboard</p>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Your relationship system, organized in one place.
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">
            Review the people involved, the events shaping the pattern, and the likely outcomes before deciding what to do next.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Mapped</p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-white">Relationships</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Tracked</p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-white">Events</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Prepared</p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-white">Next steps</p>
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">What to do here</p>
            <p className="mt-2 text-sm leading-7 text-white/65">Start with the relationship map, then review the timeline, then test possible responses in simulations.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Current use</p>
            <p className="mt-2 text-sm leading-7 text-white/65">This dashboard is the central workspace for understanding the system before acting inside it.</p>
          </div>
        </div>
      </div>
    </GlowCard>
  )
}
TSX

cat > apps/web/src/components/dashboard/StatCard.tsx <<'TSX'
import GlowCard from "@/components/ui/GlowCard"

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
    <GlowCard className="p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">{label}</p>
      <p className="mt-4 text-4xl font-semibold tracking-tight text-white">{value}</p>
      <p className="mt-3 text-sm leading-6 text-white/60">{note}</p>
    </GlowCard>
  )
}
TSX

cat > apps/web/src/components/chat/AIChat.tsx <<'TSX'
"use client"

import { useState } from "react"
import GlowCard from "@/components/ui/GlowCard"

export default function AIChat() {
  const [msg, setMsg] = useState("")
  const [reply, setReply] = useState("Describe a relationship situation, and Defrag will return structured guidance based on the pattern you describe.")
  const [loading, setLoading] = useState(false)

  async function send() {
    if (!msg.trim()) return
    setLoading(true)

    try {
      const res = await fetch("/api/insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      })
      const data = await res.json()
      setReply(data.insight || "No insight returned.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <GlowCard className="p-5 sm:p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">AI guidance</p>
      <h2 className="mt-4 text-lg font-medium text-white">Turn the situation into clearer next steps</h2>
      <p className="mt-3 text-sm leading-7 text-white/60">
        Use this when you need help interpreting a live relationship dynamic before responding.
      </p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/70">
        {loading ? "Analyzing…" : reply}
      </div>

      <textarea
        className="mt-4 min-h-[140px] w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20"
        placeholder="Example: A family member keeps going quiet after conflict, and I do not know whether to reach out now or wait."
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />

      <button
        onClick={send}
        disabled={loading}
        className="mt-4 rounded-2xl bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-100 disabled:opacity-60"
      >
        {loading ? "Analyzing..." : "Analyze situation"}
      </button>
    </GlowCard>
  )
}
TSX

echo "phase_21_premium_ui_upgrade.sh completed"
