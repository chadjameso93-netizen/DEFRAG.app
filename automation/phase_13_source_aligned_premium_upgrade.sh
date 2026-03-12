#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

mkdir -p apps/web/src/components/{marketing,layout,ui,dashboard,pricing,settings}
mkdir -p apps/web/src/app/{dashboard,pricing,settings}

cat > apps/web/src/components/ui/SectionHeading.tsx <<'TSX'
export default function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string
  title: string
  body?: string
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">{eyebrow}</p>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">{title}</h2>
      {body ? <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600">{body}</p> : null}
    </div>
  )
}
TSX

cat > apps/web/src/components/marketing/PremiumFooter.tsx <<'TSX'
import Link from "next/link"

export default function PremiumFooter() {
  return (
    <footer className="mt-8">
      <div className="rounded-[28px] border border-white/70 bg-white/82 px-6 py-6 shadow-[0_24px_100px_rgba(15,23,42,0.10),0_2px_8px_rgba(15,23,42,0.04)] backdrop-blur-2xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-zinc-500">Defrag</p>
            <p className="mt-3 text-sm leading-7 text-zinc-600">
              Premium relational intelligence for healthier communication and better outcomes.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-zinc-600">
            <Link href="/pricing" className="hover:text-zinc-950">Pricing</Link>
            <Link href="/login" className="hover:text-zinc-950">Login</Link>
            <Link href="/signup" className="hover:text-zinc-950">Start trial</Link>
            <Link href="/dashboard" className="hover:text-zinc-950">Dashboard</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
TSX

cat > apps/web/src/components/dashboard/DashboardHero.tsx <<'TSX'
import PremiumPanel from "@/components/ui/PremiumPanel"

export default function DashboardHero() {
  return (
    <PremiumPanel className="overflow-hidden p-5 sm:p-6 lg:p-8">
      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Today</p>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
            Relational field is elevated but workable.
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600">
            Recent signals suggest heightened sensitivity around unresolved topics. A slower tone, concise clarifications, and well-timed pauses are more likely to improve outcomes.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-zinc-500">System state</p>
              <p className="mt-2 text-lg font-semibold tracking-tight">Elevated</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-zinc-500">Repair</p>
              <p className="mt-2 text-lg font-semibold tracking-tight">Moderate</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-zinc-500">Suggested mode</p>
              <p className="mt-2 text-lg font-semibold tracking-tight">Pause first</p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-zinc-200 bg-[linear-gradient(180deg,#ffffff,#f5f7fb)] p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-zinc-500">Daily guidance</p>
          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-4">
              <p className="text-sm font-medium text-zinc-950">Communication</p>
              <p className="mt-2 text-sm leading-7 text-zinc-600">Keep language short and specific. Avoid stacking multiple unresolved points at once.</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-4">
              <p className="text-sm font-medium text-zinc-950">Timing</p>
              <p className="mt-2 text-sm leading-7 text-zinc-600">Pause before reacting to sensitive messages. Slight delays may improve clarity.</p>
            </div>
          </div>
        </div>
      </div>
    </PremiumPanel>
  )
}
TSX

cat > apps/web/src/app/dashboard/page.tsx <<'TSX'
import AppShell from "@/components/layout/AppShell"
import DashboardHero from "@/components/dashboard/DashboardHero"
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
      <DashboardHero />

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

cat > apps/web/src/app/pricing/page.tsx <<'TSX'
import AppShell from "@/components/layout/AppShell"
import PricingPlans from "@/components/pricing/PricingPlans"
import PremiumPanel from "@/components/ui/PremiumPanel"

export default function PricingPage() {
  return (
    <AppShell
      title="Simple pricing"
      subtitle="Choose the level of depth that fits how you want to use Defrag."
    >
      <PremiumPanel className="p-6 sm:p-8">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Plans</p>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950">Premium access designed for personal and professional use.</h3>
          <p className="mt-4 text-sm leading-7 text-zinc-600">
            Start simple, then upgrade when you want deeper insight, simulations, and broader relationship tracking.
          </p>
        </div>
      </PremiumPanel>

      <PricingPlans />
    </AppShell>
  )
}
TSX

cat > apps/web/src/app/settings/page.tsx <<'TSX'
import AppShell from "@/components/layout/AppShell"
import SettingsPanels from "@/components/settings/SettingsPanels"
import PremiumPanel from "@/components/ui/PremiumPanel"

export default function SettingsPage() {
  return (
    <AppShell
      title="Settings"
      subtitle="Manage profile details, access, and account preferences."
    >
      <PremiumPanel className="p-6 sm:p-8">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Account management</p>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950">Control access, profile details, and future subscription settings.</h3>
          <p className="mt-4 text-sm leading-7 text-zinc-600">
            Your profile, billing status, and future account preferences will be managed here.
          </p>
        </div>
      </PremiumPanel>

      <SettingsPanels />
    </AppShell>
  )
}
TSX

pkill -f "next dev" || true
cd apps/web
rm -rf .next
npm run dev
