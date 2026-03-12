#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

mkdir -p apps/web/src/components/{brand,ui,layout,marketing,auth}
mkdir -p apps/web/src/app

cat > apps/web/src/components/brand/BrandMesh.tsx <<'TSX'
export default function BrandMesh() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#09090b]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.16),transparent_24%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.14),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.10),transparent_22%)]" />
      <div className="absolute left-[-10%] top-[-12%] h-[34rem] w-[34rem] rounded-full bg-fuchsia-500/12 blur-3xl" />
      <div className="absolute right-[-8%] top-[4%] h-[30rem] w-[30rem] rounded-full bg-sky-500/12 blur-3xl" />
      <div className="absolute bottom-[-14%] left-[18%] h-[24rem] w-[24rem] rounded-full bg-violet-500/10 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(9,9,11,0.72),rgba(9,9,11,0.88))]" />
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
        "rounded-[32px] border border-white/10 bg-white/5 shadow-[0_24px_100px_rgba(0,0,0,0.28),0_2px_10px_rgba(0,0,0,0.30)] backdrop-blur-2xl transition duration-300 hover:border-white/15 hover:bg-white/[0.07]",
        className
      )}
    >
      {children}
    </div>
  )
}
TSX

cat > apps/web/src/components/layout/MobileTopBar.tsx <<'TSX'
"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"

const items = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/relationships", label: "Relationships" },
  { href: "/timeline", label: "Timeline" },
  { href: "/simulations", label: "Simulations" },
  { href: "/pricing", label: "Pricing" },
  { href: "/settings", label: "Settings" },
]

export default function MobileTopBar() {
  const [open, setOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-between rounded-[24px] border border-white/10 bg-white/5 px-4 py-4 shadow-[0_16px_50px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
        <Link href="/" className="text-[11px] font-semibold uppercase tracking-[0.34em] text-white/60">
          Defrag
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/80 transition hover:bg-white/10"
          aria-label="Toggle navigation"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open ? (
        <div className="mt-3 rounded-[24px] border border-white/10 bg-black/40 p-3 shadow-[0_16px_50px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
          <nav className="grid gap-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
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
import MobileTopBar from "@/components/layout/MobileTopBar"

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
      className="group flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-white/65 transition duration-300 hover:bg-white/10 hover:text-white"
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
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <BrandMesh />

      <div className="relative mx-auto max-w-[1600px] px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-6">
        <MobileTopBar />

        <div className="mt-3 grid gap-4 lg:mt-0 lg:grid-cols-[320px_1fr] lg:gap-6">
          <PremiumPanel className="hidden h-fit p-5 lg:sticky lg:top-6 lg:block lg:p-7">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-[11px] font-semibold uppercase tracking-[0.36em] text-white/50">
                Defrag
              </Link>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/60">
                Premium Beta
              </div>
            </div>

            <h1 className="mt-4 text-[28px] font-semibold tracking-tight text-white">Relational intelligence</h1>
            <p className="mt-3 text-sm leading-6 text-white/60">
              Clear insight for relationships, communication, and recurring patterns.
            </p>

            <div className="mt-7 rounded-[28px] border border-white/10 bg-white/5 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">System status</p>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-white">Elevated</p>
              <p className="mt-2 text-sm leading-6 text-white/60">
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

            <div className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">Today</p>
              <p className="mt-3 text-sm leading-6 text-white/65">
                Short clarifications and calm boundaries are more effective than urgency.
              </p>
            </div>
          </PremiumPanel>

          <div className="space-y-4 lg:space-y-6">
            <PremiumPanel className="p-5 sm:p-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-white/45">Defrag Workspace</p>
                  {title ? <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[44px]">{title}</h2> : null}
                  {subtitle ? <p className="mt-4 max-w-3xl text-sm leading-7 text-white/60">{subtitle}</p> : null}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">State</p>
                    <p className="mt-2 text-sm font-medium text-white">Elevated</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Repair</p>
                    <p className="mt-2 text-sm font-medium text-white">Moderate</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Timing</p>
                    <p className="mt-2 text-sm font-medium text-white">Pause first</p>
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
    <main className="relative min-h-screen overflow-hidden bg-[#09090b] px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-6">
      <BrandMesh />

      <div className="relative mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-7xl items-center gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        <PremiumPanel className="p-7 sm:p-10 lg:p-12">
          <Link href="/" className="text-[11px] font-semibold uppercase tracking-[0.34em] text-white/45">
            Defrag
          </Link>

          <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/60">{body}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Clear insight</p>
              <p className="mt-2 text-sm leading-6 text-white/65">Understand patterns before they become larger problems.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Healthy outcomes</p>
              <p className="mt-2 text-sm leading-6 text-white/65">Guidance is designed to reduce stigma and improve communication.</p>
            </div>
          </div>
        </PremiumPanel>

        <PremiumPanel className="mx-auto w-full max-w-md p-6 sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">{eyebrow}</p>
          <div className="mt-5">{children}</div>
          <p className="mt-6 text-sm text-white/55">
            {footerText}{" "}
            <Link href={footerLinkHref} className="font-medium text-white underline-offset-4 hover:underline">
              {footerLinkLabel}
            </Link>
          </p>
        </PremiumPanel>
      </div>
    </main>
  )
}
TSX

cat > apps/web/src/components/marketing/HeroLanding.tsx <<'TSX'
import Link from "next/link"
import { ArrowRight, ShieldCheck, Sparkles, Network, BrainCircuit, Clock3, PlayCircle } from "lucide-react"
import BrandMesh from "@/components/brand/BrandMesh"
import PremiumPanel from "@/components/ui/PremiumPanel"

function Metric({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
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
    <PremiumPanel className="p-6">
      <div className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 text-white shadow-sm transition duration-300 hover:bg-white/10">
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
          <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
            <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-white/50 shadow-sm">
                  Defrag
                </div>

                <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[68px] lg:leading-[1.02]">
                  Know what is happening in your relationships before it becomes a larger problem.
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
                  Defrag is a premium relational insight platform that helps people understand communication, tension, timing, and recurring patterns across families, teams, and partnerships through clear, practical guidance.
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
                    href="/pricing"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                  >
                    View pricing
                  </Link>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <Metric label="What it does" value="Maps patterns" />
                  <Metric label="Why it matters" value="Reduce friction" />
                  <Metric label="Guidance" value="Calm and clear" />
                </div>
              </div>

              <PremiumPanel className="p-5 sm:p-6">
                <div className="rounded-[28px] border border-white/10 bg-black/20 p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">Today’s relational field</p>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/65">Updated</span>
                  </div>

                  <div className="mt-5 space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">System state</p>
                      <p className="mt-2 text-2xl font-semibold tracking-tight text-white">Elevated</p>
                      <p className="mt-2 text-sm leading-6 text-white/60">Recent signals suggest higher sensitivity around unresolved topics.</p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Recommended approach</p>
                      <p className="mt-2 text-sm leading-7 text-white/65">Use short clarifications, avoid urgency, and pause before reacting to sensitive messages.</p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Repair</p>
                        <div className="mt-3 h-2 rounded-full bg-white/10">
                          <div className="h-2 w-[62%] rounded-full bg-white" />
                        </div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Guidance mode</p>
                        <p className="mt-2 text-sm font-medium text-white">Pause first</p>
                      </div>
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
            title="What it is"
            body="A relational intelligence platform that turns events, tension, and interaction patterns into structured insight."
          />
          <Feature
            icon={<BrainCircuit size={20} />}
            title="What it does"
            body="Shows relationship maps, simulations, timelines, and calm AI interpretation across your most important dynamics."
          />
          <Feature
            icon={<ShieldCheck size={20} />}
            title="Why people need it"
            body="It helps people see larger patterns sooner, reduce avoidable friction, and move toward healthier outcomes."
          />
        </section>

        <PremiumPanel className="p-6 sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">How Defrag helps</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white lg:text-[40px]">A system for relational clarity and better decisions.</h2>
              <p className="mt-4 text-sm leading-7 text-white/60">
                Built for people who want to understand larger patterns, reduce avoidable friction, and approach important conversations with more awareness.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-100"
                >
                  Open dashboard
                  <PlayCircle size={16} />
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:bg-white/10">
                <div className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 shadow-sm">
                  <Clock3 size={18} />
                </div>
                <h3 className="mt-4 text-base font-medium text-white">Timeline awareness</h3>
                <p className="mt-3 text-sm leading-7 text-white/60">Track how events build over time instead of reacting to isolated moments.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:bg-white/10">
                <div className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 shadow-sm">
                  <Sparkles size={18} />
                </div>
                <h3 className="mt-4 text-base font-medium text-white">AI interpretation</h3>
                <p className="mt-3 text-sm leading-7 text-white/60">Turn raw experiences into clearer relational insight and practical next steps.</p>
              </div>
            </div>
          </div>
        </PremiumPanel>
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

echo "phase_14_dark_mode_ultra_premium.sh completed"
