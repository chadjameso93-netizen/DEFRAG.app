#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

mkdir -p apps/web/src/components/{marketing,ui}
mkdir -p apps/web/src/app/api/health

cat > apps/web/src/components/ui/GlowButton.tsx <<'TSX'
import Link from "next/link"

export default function GlowButton({
  href,
  label,
  inverted = false,
}: {
  href: string
  label: string
  inverted?: boolean
}) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-medium transition duration-300",
        inverted
          ? "border border-white/10 bg-white/5 text-white hover:bg-white/10"
          : "bg-white text-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_8px_30px_rgba(255,255,255,0.08)] hover:bg-zinc-100"
      ].join(" ")}
    >
      {label}
    </Link>
  )
}
TSX

cat > apps/web/src/components/marketing/HeroLanding.tsx <<'TSX'
import { Network, BrainCircuit, Sparkles, ShieldCheck, Clock3, GitBranchPlus } from "lucide-react"
import BrandMesh from "@/components/brand/BrandMesh"
import PremiumPanel from "@/components/ui/PremiumPanel"
import GlowButton from "@/components/ui/GlowButton"
import PremiumFooter from "@/components/marketing/PremiumFooter"

function Pill({ text }: { text: string }) {
  return (
    <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">
      {text}
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
    <PremiumPanel className="p-6">
      <div className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 text-white shadow-sm">
        {icon}
      </div>
      <h3 className="mt-5 text-lg font-medium text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/60">{body}</p>
    </PremiumPanel>
  )
}

export default function HeroLanding() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09090b] px-3 py-3 text-white sm:px-4 sm:py-4 lg:px-6 lg:py-6">
      <BrandMesh />

      <div className="relative mx-auto max-w-7xl space-y-4 lg:space-y-6">
        <PremiumPanel className="overflow-hidden p-4 sm:p-6 lg:p-8">
          <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))] px-6 py-10 sm:px-8 lg:px-12 lg:py-16">
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <Pill text="Defrag platform" />

                <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[72px] lg:leading-[1.0]">
                  See the pattern.
                  <br />
                  Choose the next step with clarity.
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
                  Defrag is a relational intelligence platform that helps people organize relationships, track meaningful events over time, test possible responses, and receive practical guidance before the next important conversation.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <GlowButton href="/signup" label="Start free trial" />
                  <GlowButton href="/pricing" label="View pricing" inverted />
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Pill text="Relationship mapping" />
                  <Pill text="Timeline tracking" />
                  <Pill text="Simulations" />
                  <Pill text="AI guidance" />
                </div>
              </div>

              <PremiumPanel className="p-5 sm:p-6">
                <div className="rounded-[28px] border border-white/10 bg-black/20 p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">Platform preview</p>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/65">Live</span>
                  </div>

                  <div className="mt-5 grid gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Relationships</p>
                      <p className="mt-2 text-sm leading-7 text-white/65">Map the people in your system and review trust, tension, and role type.</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Timeline</p>
                      <p className="mt-2 text-sm leading-7 text-white/65">Track the events shaping the current pattern so the larger sequence becomes visible.</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Simulation</p>
                      <p className="mt-2 text-sm leading-7 text-white/65">Compare likely outcomes before acting so your next step is more intentional.</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Guidance</p>
                      <p className="mt-2 text-sm leading-7 text-white/65">Turn raw situations into structured insight and practical relational guidance.</p>
                    </div>
                  </div>
                </div>
              </PremiumPanel>
            </div>
          </div>
        </PremiumPanel>

        <section className="grid gap-4 md:grid-cols-3 md:gap-6">
          <Feature
            icon={<Network size={20} />}
            title="Relationship mapping"
            body="Organize the people in your system and see where influence, tension, and support are concentrated."
          />
          <Feature
            icon={<Clock3 size={20} />}
            title="Timeline awareness"
            body="Follow how the pattern formed by tracking conflict, repair, stress, and other key moments over time."
          />
          <Feature
            icon={<BrainCircuit size={20} />}
            title="Decision support"
            body="Use simulations and AI guidance to make the next move with more clarity and less reactivity."
          />
        </section>

        <section className="grid gap-4 md:grid-cols-3 md:gap-6">
          <Feature
            icon={<GitBranchPlus size={20} />}
            title="System view"
            body="Move beyond isolated moments and see the larger relationship system that is shaping the present problem."
          />
          <Feature
            icon={<Sparkles size={20} />}
            title="Daily insight"
            body="Receive practical, calm guidance that helps you slow down, clarify, and respond more intentionally."
          />
          <Feature
            icon={<ShieldCheck size={20} />}
            title="Healthier outcomes"
            body="Designed to reduce stigma, increase understanding, and support better relational choices."
          />
        </section>

        <PremiumFooter />
      </div>
    </main>
  )
}
TSX

cat > apps/web/src/app/api/health/route.ts <<'TS'
import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    ok: true,
    app: "defrag",
    status: "ready",
  })
}
TS

echo "phase_20_launch_polish_and_checks.sh completed"
