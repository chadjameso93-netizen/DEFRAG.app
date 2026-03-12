#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

mkdir -p apps/web/src/components/{brand,ui,layout,marketing,dashboard}
mkdir -p apps/web/src/app/{dashboard,pricing,settings}

cat > apps/web/src/components/brand/BrandGradient.tsx <<'TSX'
export default function BrandGradient() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[-10%] top-[-10%] h-[28rem] w-[28rem] rounded-full bg-fuchsia-200/30 blur-3xl" />
      <div className="absolute right-[-10%] top-[10%] h-[24rem] w-[24rem] rounded-full bg-sky-200/30 blur-3xl" />
      <div className="absolute bottom-[-10%] left-[20%] h-[20rem] w-[20rem] rounded-full bg-emerald-200/20 blur-3xl" />
    </div>
  )
}
TSX

cat > apps/web/src/components/ui/Surface.tsx <<'TSX'
import type { ReactNode } from "react"

export default function Surface({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={["rounded-[28px] border border-white/60 bg-white/80 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl", className].join(" ")}>
      {children}
    </div>
  )
}
TSX

cat > apps/web/src/components/layout/AppShell.tsx <<'TSX'
import type { ReactNode } from "react"
import Link from "next/link"
import BrandGradient from "@/components/brand/BrandGradient"
import Surface from "@/components/ui/Surface"

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="rounded-2xl px-4 py-3 text-sm font-medium text-zinc-600 transition hover:bg-zinc-950 hover:text-white">
      {label}
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
    <main className="relative min-h-screen overflow-hidden bg-[#f5f7fb] text-zinc-950">
      <BrandGradient />
      <div className="relative mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 gap-6 p-4 xl:grid-cols-[290px_1fr] xl:p-6">
        <Surface className="p-6 xl:p-8">
          <div className="mb-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-500">Defrag</p>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950">Relational intelligence</h1>
            <p className="mt-3 text-sm leading-6 text-zinc-600">Understand patterns in relationships, families, and teams.</p>
          </div>

          <nav className="grid gap-2">
            <NavItem href="/dashboard" label="Dashboard" />
            <NavItem href="/relationships" label="Relationships" />
            <NavItem href="/timeline" label="Timeline" />
            <NavItem href="/simulations" label="Simulations" />
            <NavItem href="/pricing" label="Pricing" />
            <NavItem href="/settings" label="Settings" />
          </nav>
        </Surface>

        <div className="space-y-6">
          <Surface className="p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Defrag Workspace</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950">{title}</h2>
            {subtitle ? <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-600">{subtitle}</p> : null}
          </Surface>
          {children}
        </div>
      </div>
    </main>
  )
}
TSX

cat > apps/web/src/components/marketing/Hero.tsx <<'TSX'
import BrandGradient from "@/components/brand/BrandGradient"

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[36px] border border-white/60 bg-white/80 px-8 py-20 shadow-[0_10px_50px_rgba(0,0,0,0.06)] backdrop-blur-xl sm:px-12">
      <BrandGradient />
      <div className="relative max-w-4xl">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-zinc-500">Defrag</p>
        <h1 className="text-5xl font-semibold tracking-tight text-zinc-950 sm:text-6xl">Understand the patterns shaping your relationships.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">Clear, practical insight for communication, conflict, and recurring dynamics.</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href="/signup" className="rounded-2xl bg-zinc-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800">Start free trial</a>
          <a href="/pricing" className="rounded-2xl border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50">View pricing</a>
        </div>
      </div>
    </section>
  )
}
TSX

cat > apps/web/src/components/dashboard/StatCard.tsx <<'TSX'
import Surface from "@/components/ui/Surface"

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
    <Surface className="p-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">{label}</p>
      <p className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950">{value}</p>
      <p className="mt-3 text-sm leading-6 text-zinc-600">{note}</p>
    </Surface>
  )
}
TSX

cat > apps/web/src/app/page.tsx <<'TSX'
import Hero from "@/components/marketing/Hero"
import Surface from "@/components/ui/Surface"

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <Surface className="p-6">
      <h3 className="text-lg font-medium text-zinc-950">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-zinc-600">{body}</p>
    </Surface>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] px-4 py-4 text-zinc-950 sm:px-6 sm:py-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <Hero />
        <section className="grid gap-6 md:grid-cols-3">
          <Feature title="See relationship patterns" body="Map the people, tension points, and recurring cycles shaping your daily experience." />
          <Feature title="Prepare for difficult conversations" body="Explore likely outcomes before you act." />
          <Feature title="Follow daily insight" body="Get clear guidance about timing, pressure, and ways to reduce avoidable friction." />
        </section>
      </div>
    </main>
  )
}
TSX

cat > apps/web/src/app/dashboard/page.tsx <<'TSX'
import AppShell from "@/components/layout/AppShell"
import StatCard from "@/components/dashboard/StatCard"
import Surface from "@/components/ui/Surface"

export default function DashboardPage() {
  return (
    <AppShell
      title="Relational intelligence"
      subtitle="A clearer view of your current system, relationship pressure, and likely communication patterns."
    >
      <section className="grid gap-6 md:grid-cols-3">
        <StatCard label="System state" value="Elevated" note="Recent conflict signals suggest higher sensitivity." />
        <StatCard label="Repair potential" value="Moderate" note="Small clarifications may improve outcomes." />
        <StatCard label="Daily insight" value="Pause first" note="Allow a beat before reacting to sensitive messages." />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Surface className="p-6">
          <h2 className="text-lg font-medium text-zinc-950">Relationship map</h2>
          <p className="mt-2 text-sm text-zinc-600">Visual overview of the current relationship system.</p>
          <div className="mt-6 h-[360px] rounded-2xl bg-zinc-100" />
        </Surface>

        <Surface className="p-6">
          <h2 className="text-lg font-medium text-zinc-950">AI guidance</h2>
          <p className="mt-2 text-sm text-zinc-600">Describe a situation and Defrag will return practical guidance.</p>
          <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
            Defrag sees a pattern worth slowing down for. Reduce urgency, clarify what you need, and avoid reacting too quickly.
          </div>
        </Surface>
      </section>
    </AppShell>
  )
}
TSX

cat > apps/web/src/app/pricing/page.tsx <<'TSX'
import AppShell from "@/components/layout/AppShell"
import Surface from "@/components/ui/Surface"

export default function PricingPage() {
  return (
    <AppShell title="Simple pricing" subtitle="Choose the level of depth that fits how you want to use Defrag.">
      <section className="grid gap-6 lg:grid-cols-3">
        <Surface className="p-6">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">Starter</p>
          <p className="mt-4 text-4xl font-semibold tracking-tight">Free</p>
          <p className="mt-3 text-sm leading-6 text-zinc-600">A simple entry point for exploring the product.</p>
        </Surface>
        <Surface className="border-zinc-900 bg-zinc-950 p-6 text-white">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-300">Core</p>
          <p className="mt-4 text-4xl font-semibold tracking-tight">$24/mo</p>
          <p className="mt-3 text-sm leading-6 text-zinc-300">The main plan for ongoing personal use.</p>
        </Surface>
        <Surface className="p-6">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">Practitioner</p>
          <p className="mt-4 text-4xl font-semibold tracking-tight">$99/mo</p>
          <p className="mt-3 text-sm leading-6 text-zinc-600">For coaches, facilitators, and advanced use.</p>
        </Surface>
      </section>
    </AppShell>
  )
}
TSX

cat > apps/web/src/app/settings/page.tsx <<'TSX'
import AppShell from "@/components/layout/AppShell"
import Surface from "@/components/ui/Surface"

export default function SettingsPage() {
  return (
    <AppShell title="Settings" subtitle="Manage profile details, access, and account preferences.">
      <Surface className="max-w-3xl p-6">
        <h2 className="text-lg font-medium text-zinc-950">Account settings</h2>
        <p className="mt-2 text-sm text-zinc-600">Manage profile details, access, and future notification preferences.</p>
      </Surface>
    </AppShell>
  )
}
TSX

echo "upgrade_defrag_polish.sh completed"
