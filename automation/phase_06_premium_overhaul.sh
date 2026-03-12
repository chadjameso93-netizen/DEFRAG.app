#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

mkdir -p apps/web/src/components/{brand,ui,layout,marketing,auth,dashboard}

cat > apps/web/src/components/brand/BrandBackground.tsx <<'TSX'
export default function BrandBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#f8fafc,white_30%,#f8fafc)]" />
      <div className="absolute left-[-10%] top-[-5%] h-[28rem] w-[28rem] rounded-full bg-violet-200/30 blur-3xl" />
      <div className="absolute right-[-6%] top-[10%] h-[24rem] w-[24rem] rounded-full bg-sky-200/30 blur-3xl" />
      <div className="absolute bottom-[-10%] left-[18%] h-[22rem] w-[22rem] rounded-full bg-fuchsia-200/20 blur-3xl" />
    </div>
  )
}
TSX

cat > apps/web/src/components/ui/GlassPanel.tsx <<'TSX'
import type { ReactNode } from "react"
import { cn } from "@/lib/cn"

export default function GlassPanel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-[32px] border border-white/70 bg-white/85 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl",
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
import { LayoutDashboard, Users, Clock3, Sparkles, CreditCard, Settings } from "lucide-react"
import BrandBackground from "@/components/brand/BrandBackground"
import GlassPanel from "@/components/ui/GlassPanel"

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
      className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-zinc-600 transition hover:bg-zinc-950 hover:text-white"
    >
      {icon}
      <span>{label}</span>
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
    <main className="relative min-h-screen overflow-hidden bg-[#f6f8fb] text-zinc-950">
      <BrandBackground />

      <div className="relative mx-auto max-w-[1600px] px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-6">
        <div className="grid gap-4 lg:grid-cols-[300px_1fr] lg:gap-6">
          <GlassPanel className="h-fit p-5 lg:sticky lg:top-6 lg:p-7">
            <Link href="/" className="text-[11px] font-semibold uppercase tracking-[0.34em] text-zinc-500">
              Defrag
            </Link>

            <h1 className="mt-4 text-2xl font-semibold tracking-tight">Relational intelligence</h1>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Clear insight for relationships, communication, and recurring patterns.
            </p>

            <nav className="mt-8 grid gap-2">
              <NavItem href="/dashboard" label="Dashboard" icon={<LayoutDashboard size={18} />} />
              <NavItem href="/relationships" label="Relationships" icon={<Users size={18} />} />
              <NavItem href="/timeline" label="Timeline" icon={<Clock3 size={18} />} />
              <NavItem href="/simulations" label="Simulations" icon={<Sparkles size={18} />} />
              <NavItem href="/pricing" label="Pricing" icon={<CreditCard size={18} />} />
              <NavItem href="/settings" label="Settings" icon={<Settings size={18} />} />
            </nav>

            <div className="mt-8 rounded-[24px] border border-zinc-200 bg-zinc-50 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Today</p>
              <p className="mt-3 text-sm leading-6 text-zinc-700">
                Slow pacing and short clarifications are more likely to help than urgency.
              </p>
            </div>
          </GlassPanel>

          <div className="space-y-4 lg:space-y-6">
            <GlassPanel className="p-6 sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-500">Defrag Workspace</p>
              {title ? <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2> : null}
              {subtitle ? <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-600">{subtitle}</p> : null}
            </GlassPanel>

            {children}
          </div>
        </div>
      </div>
    </main>
  )
}
TSX

cat > apps/web/src/components/auth/AuthShell.tsx <<'TSX'
import type { ReactNode } from "react"
import Link from "next/link"
import BrandBackground from "@/components/brand/BrandBackground"
import GlassPanel from "@/components/ui/GlassPanel"

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
    <main className="relative min-h-screen overflow-hidden bg-[#f6f8fb] px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-6">
      <BrandBackground />

      <div className="relative mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-7xl items-center gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        <GlassPanel className="p-7 sm:p-10">
          <Link href="/" className="text-[11px] font-semibold uppercase tracking-[0.34em] text-zinc-500">
            Defrag
          </Link>

          <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-600">{body}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Clear insight</p>
              <p className="mt-2 text-sm leading-6 text-zinc-700">Understand patterns before they become larger problems.</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Healthy outcomes</p>
              <p className="mt-2 text-sm leading-6 text-zinc-700">Guidance is designed to reduce stigma and improve communication.</p>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="mx-auto w-full max-w-md p-6 sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">{eyebrow}</p>
          <div className="mt-5">{children}</div>
          <p className="mt-6 text-sm text-zinc-600">
            {footerText}{" "}
            <Link href={footerLinkHref} className="font-medium text-zinc-950 underline-offset-4 hover:underline">
              {footerLinkLabel}
            </Link>
          </p>
        </GlassPanel>
      </div>
    </main>
  )
}
TSX

cat > apps/web/src/components/marketing/HeroLanding.tsx <<'TSX'
import Link from "next/link"
import { ArrowRight, Sparkles, ShieldCheck, Network, Brain, Clock3 } from "lucide-react"
import BrandBackground from "@/components/brand/BrandBackground"
import GlassPanel from "@/components/ui/GlassPanel"

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
    <GlassPanel className="p-6">
      <div className="inline-flex rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm">
        {icon}
      </div>
      <h3 className="mt-5 text-lg font-medium text-zinc-950">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-zinc-600">{body}</p>
    </GlassPanel>
  )
}

export default function HeroLanding() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6f8fb] px-3 py-3 text-zinc-950 sm:px-4 sm:py-4 lg:px-6 lg:py-6">
      <BrandBackground />

      <div className="relative mx-auto max-w-7xl space-y-4 lg:space-y-6">
        <GlassPanel className="overflow-hidden px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-zinc-500">Defrag</p>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Understand the patterns shaping your relationships.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 sm:text-lg">
                Defrag helps you make sense of communication, tension, timing, and recurring dynamics through clear, practical insight.
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

            <GlassPanel className="p-5 sm:p-6">
              <div className="rounded-[24px] border border-zinc-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-zinc-950">Daily relational insight</p>
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">Live</span>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">System state</p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight">Elevated</p>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">Recent signals suggest higher sensitivity around unresolved topics.</p>
                  </div>

                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Suggested approach</p>
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
            </GlassPanel>
          </div>
        </GlassPanel>

        <section className="grid gap-4 md:grid-cols-3 md:gap-6">
          <Feature
            icon={<Network size={20} />}
            title="See relationship patterns"
            body="Map the people, tension points, and recurring cycles that shape your daily experience."
          />
          <Feature
            icon={<Brain size={20} />}
            title="Prepare for difficult conversations"
            body="Explore likely outcomes before you act, with guidance aimed at healthier communication."
          />
          <Feature
            icon={<ShieldCheck size={20} />}
            title="Follow daily insight"
            body="Get calm, practical guidance about timing, pressure, and ways to reduce avoidable friction."
          />
        </section>

        <GlassPanel className="p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">How Defrag helps</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">A premium system for relational clarity</h2>
            </div>

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
        </GlassPanel>
      </div>
    </main>
  )
}
TSX

cat > apps/web/src/app/page.tsx <<'TSX'
import HeroLanding from "@/components/marketing/HeroLanding"

export default function HomePage() {
  return <HeroLanding />
}
TSX

echo "phase_06_premium_overhaul.sh completed"
