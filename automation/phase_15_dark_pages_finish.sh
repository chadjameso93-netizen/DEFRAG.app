#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

mkdir -p apps/web/src/components/{dashboard,pricing,settings,marketing}

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
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">{label}</p>
      <p className="mt-4 text-4xl font-semibold tracking-tight text-white">{value}</p>
      <p className="mt-3 text-sm leading-6 text-white/60">{note}</p>
    </PremiumPanel>
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
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">Today</p>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Relational field is elevated but workable.
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">
            Recent signals suggest heightened sensitivity around unresolved topics. Slower tone, concise clarifications, and well-timed pauses are more likely to improve outcomes.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">System</p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-white">Elevated</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Repair</p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-white">Moderate</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Mode</p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-white">Pause first</p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-black/20 p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Daily guidance</p>
          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-white">Communication</p>
              <p className="mt-2 text-sm leading-7 text-white/60">Keep language short and specific. Avoid stacking multiple unresolved points at once.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-white">Timing</p>
              <p className="mt-2 text-sm leading-7 text-white/60">Pause before reacting to sensitive messages. Slight delays may improve clarity.</p>
            </div>
          </div>
        </div>
      </div>
    </PremiumPanel>
  )
}
TSX

cat > apps/web/src/components/pricing/PricingPlans.tsx <<'TSX'
"use client"

import PremiumPanel from "@/components/ui/PremiumPanel"

async function checkout() {
  try {
    const res = await fetch("/api/billing/create-checkout", { method: "POST" })
    const data = await res.json()
    if (data?.url) {
      window.location.href = data.url
      return
    }
  } catch {}
  window.location.href = "/signup"
}

function Plan({
  name,
  price,
  description,
  featured = false,
  points,
}: {
  name: string
  price: string
  description: string
  featured?: boolean
  points: string[]
}) {
  return (
    <PremiumPanel className={`p-6 ${featured ? "border-white/20 bg-white/[0.08]" : ""}`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">{name}</p>
      <p className="mt-4 text-4xl font-semibold tracking-tight text-white">{price}</p>
      <p className="mt-3 text-sm leading-7 text-white/60">{description}</p>

      <div className="mt-6 space-y-3">
        {points.map((point) => (
          <div
            key={point}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70"
          >
            {point}
          </div>
        ))}
      </div>

      <button
        onClick={checkout}
        className={`mt-8 w-full rounded-2xl px-5 py-3 text-sm font-medium transition ${
          featured ? "bg-white text-zinc-950 hover:bg-zinc-100" : "bg-white/10 text-white hover:bg-white/15"
        }`}
      >
        Choose plan
      </button>
    </PremiumPanel>
  )
}

export default function PricingPlans() {
  return (
    <section className="grid gap-4 lg:grid-cols-3 lg:gap-6">
      <Plan
        name="Starter"
        price="Free"
        description="A simple entry point for exploring the product."
        points={[
          "Core onboarding",
          "Basic daily insight",
          "Relationship overview",
        ]}
      />
      <Plan
        name="Core"
        price="$24/mo"
        description="The main plan for ongoing personal use."
        featured
        points={[
          "Full dashboard access",
          "Simulations and AI guidance",
          "Expanded relationship views",
        ]}
      />
      <Plan
        name="Practitioner"
        price="$99/mo"
        description="For coaches, facilitators, and advanced use."
        points={[
          "Multiple profiles",
          "Expanded reporting",
          "Advanced workflow support",
        ]}
      />
    </section>
  )
}
TSX

cat > apps/web/src/components/settings/SettingsPanels.tsx <<'TSX'
"use client"

import PremiumPanel from "@/components/ui/PremiumPanel"

export default function SettingsPanels() {
  return (
    <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
      <PremiumPanel className="p-6">
        <h3 className="text-lg font-medium text-white">Account</h3>
        <p className="mt-2 text-sm leading-7 text-white/60">Manage email, password recovery, and account access.</p>
        <div className="mt-6 grid gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">Email notifications</div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">Password reset</div>
        </div>
      </PremiumPanel>

      <PremiumPanel className="p-6">
        <h3 className="text-lg font-medium text-white">Subscription</h3>
        <p className="mt-2 text-sm leading-7 text-white/60">View current plan and future billing actions.</p>
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Current plan</p>
          <p className="mt-2 text-lg font-medium text-white">Core Trial</p>
          <p className="mt-2 text-sm text-white/60">Billing activates after the trial period unless canceled.</p>
        </div>
      </PremiumPanel>
    </div>
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
          <h2 className="text-lg font-medium text-white">Relationship map</h2>
          <p className="mt-2 text-sm text-white/60">Visual overview of the current relationship system.</p>
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
          <h2 className="text-lg font-medium text-white">Family system map</h2>
          <p className="mt-2 text-sm text-white/60">View the wider family pattern and key roles.</p>
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
          <h2 className="text-lg font-medium text-white">Current relationships</h2>
          <p className="mt-2 text-sm text-white/60">Track trust and tension across your current system.</p>
          <div className="mt-6">
            <RelationshipList relationships={mockRelationships} />
          </div>
        </PremiumPanel>

        <PremiumPanel className="p-5 sm:p-6">
          <h2 className="text-lg font-medium text-white">Event timeline</h2>
          <p className="mt-2 text-sm text-white/60">Review the moments shaping the current pattern.</p>
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
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">Plans</p>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">Premium access designed for personal and professional use.</h3>
          <p className="mt-4 text-sm leading-7 text-white/60">
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
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">Account management</p>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">Control access, profile details, and future subscription settings.</h3>
          <p className="mt-4 text-sm leading-7 text-white/60">
            Your profile, billing status, and future account preferences will be managed here.
          </p>
        </div>
      </PremiumPanel>

      <SettingsPanels />
    </AppShell>
  )
}
TSX

echo "phase_15_dark_pages_finish.sh completed"
