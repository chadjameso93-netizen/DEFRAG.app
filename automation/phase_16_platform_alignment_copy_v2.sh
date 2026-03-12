#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

mkdir -p apps/web/src/app/{dashboard,pricing,settings,login,signup,onboarding,relationships,timeline,simulations}
mkdir -p apps/web/src/components/{dashboard,pricing,settings,relationships,timeline,sim,onboarding,chat}

cat > apps/web/src/components/dashboard/DashboardHero.tsx <<'TSX'
import PremiumPanel from "@/components/ui/PremiumPanel"

export default function DashboardHero() {
  return (
    <PremiumPanel className="overflow-hidden p-5 sm:p-6 lg:p-8">
      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">Platform overview</p>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Your relationship system, organized in one place.
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">
            Defrag helps you track important relationships, understand how events are shaping the current dynamic, explore likely outcomes, and receive practical guidance before the next conversation.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Relationships</p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-white">Mapped</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Timeline</p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-white">Active</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Guidance</p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-white">Ready</p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-black/20 p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">What Defrag does</p>
          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-white">Map the system</p>
              <p className="mt-2 text-sm leading-7 text-white/60">See the people involved, how they connect, and where pressure may be building.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-white">Track events over time</p>
              <p className="mt-2 text-sm leading-7 text-white/60">Log conflict, repair, stress, and key moments to understand the larger pattern.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-white">Prepare before acting</p>
              <p className="mt-2 text-sm leading-7 text-white/60">Use simulations and AI guidance to choose healthier next steps with more clarity.</p>
            </div>
          </div>
        </div>
      </div>
    </PremiumPanel>
  )
}
TSX

cat > apps/web/src/components/chat/AIChat.tsx <<'TSX'
"use client"

import { useState } from "react"

export default function AIChat() {
  const [msg, setMsg] = useState("")
  const [reply, setReply] = useState("Describe a relationship situation, and Defrag will return structured guidance based on the pattern you describe.")

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
      <h2 className="text-lg font-medium text-white">AI guidance</h2>
      <p className="mt-2 text-sm text-white/60">
        Turn a situation into clearer relational insight and a more useful next step.
      </p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-white/70">
        {reply}
      </div>

      <textarea
        className="mt-4 min-h-[120px] w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20"
        placeholder="Example: My sibling keeps going quiet after conflict, and I do not know whether to reach out now or wait."
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />

      <button
        onClick={send}
        className="mt-4 rounded-2xl bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-100"
      >
        Analyze situation
      </button>
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
      title="Dashboard"
      subtitle="This is your main Defrag workspace. Track relationships, review timelines, explore simulations, and get AI guidance in one place."
    >
      <DashboardHero />

      <section className="grid gap-4 sm:gap-6 md:grid-cols-3">
        <StatCard label="Relationships" value="3" note="Active connections currently mapped in your system." />
        <StatCard label="Recent events" value="2" note="Key moments currently shaping the active pattern." />
        <StatCard label="Next step" value="Review" note="Use the timeline and simulation tools before acting." />
      </section>

      <section className="grid gap-4 lg:gap-6 2xl:grid-cols-[1.15fr_0.85fr]">
        <PremiumPanel className="p-5 sm:p-6">
          <h2 className="text-lg font-medium text-white">Relationship map</h2>
          <p className="mt-2 text-sm text-white/60">Visualize the current people, structure, and pressure points in your system.</p>
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
          <h2 className="text-lg font-medium text-white">Family system</h2>
          <p className="mt-2 text-sm text-white/60">See the wider family structure and how roles may influence the present dynamic.</p>
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
          <h2 className="text-lg font-medium text-white">Relationship list</h2>
          <p className="mt-2 text-sm text-white/60">Review trust, tension, and connection type across your mapped relationships.</p>
          <div className="mt-6">
            <RelationshipList relationships={mockRelationships} />
          </div>
        </PremiumPanel>

        <PremiumPanel className="p-5 sm:p-6">
          <h2 className="text-lg font-medium text-white">Timeline</h2>
          <p className="mt-2 text-sm text-white/60">Understand how conflict, repair, and other events are shaping the pattern over time.</p>
          <div className="mt-6">
            <EventTimeline events={mockEvents} />
          </div>
        </PremiumPanel>
      </section>
    </AppShell>
  )
}
TSX

cat > apps/web/src/app/relationships/page.tsx <<'TSX'
import AppShell from "@/components/layout/AppShell"
import PremiumPanel from "@/components/ui/PremiumPanel"
import RelationshipList from "@/components/relationships/RelationshipList"
import AddRelationshipForm from "@/components/relationships/AddRelationshipForm"
import { mockRelationships } from "@/lib/mock/systemData"

export default function RelationshipsPage() {
  return (
    <AppShell
      title="Relationships"
      subtitle="Map the people in your system and track trust, tension, and role type across each connection."
    >
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr] xl:gap-6">
        <PremiumPanel className="p-5 sm:p-6">
          <h3 className="text-lg font-medium text-white">Relationship overview</h3>
          <p className="mt-2 text-sm leading-7 text-white/60">
            This page helps you organize the people in your system and track how each connection is currently functioning.
          </p>
          <div className="mt-6">
            <RelationshipList relationships={mockRelationships} />
          </div>
        </PremiumPanel>

        <AddRelationshipForm />
      </div>
    </AppShell>
  )
}
TSX

cat > apps/web/src/app/timeline/page.tsx <<'TSX'
import AppShell from "@/components/layout/AppShell"
import PremiumPanel from "@/components/ui/PremiumPanel"
import EventTimeline from "@/components/timeline/EventTimeline"
import AddEventForm from "@/components/timeline/AddEventForm"
import { mockEvents } from "@/lib/mock/systemData"

export default function TimelinePage() {
  return (
    <AppShell
      title="Timeline"
      subtitle="Track important events over time so you can understand how the current dynamic is forming."
    >
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr] xl:gap-6">
        <PremiumPanel className="p-5 sm:p-6">
          <h3 className="text-lg font-medium text-white">Event timeline</h3>
          <p className="mt-2 text-sm leading-7 text-white/60">
            Use the timeline to log conflict, repair, stress, and observations so the larger pattern becomes clearer.
          </p>
          <div className="mt-6">
            <EventTimeline events={mockEvents} />
          </div>
        </PremiumPanel>

        <AddEventForm />
      </div>
    </AppShell>
  )
}
TSX

cat > apps/web/src/app/simulations/page.tsx <<'TSX'
import AppShell from "@/components/layout/AppShell"
import PremiumPanel from "@/components/ui/PremiumPanel"
import SimulationPanel from "@/components/sim/SimulationPanel"

export default function SimulationsPage() {
  return (
    <AppShell
      title="Simulations"
      subtitle="Compare possible approaches before you act, so your next move is more intentional and informed."
    >
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr] xl:gap-6">
        <PremiumPanel className="p-5 sm:p-6">
          <SimulationPanel />
        </PremiumPanel>

        <PremiumPanel className="p-5 sm:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">How to use this</p>
          <h3 className="mt-4 text-lg font-medium text-white">Test likely outcomes before the conversation happens.</h3>
          <p className="mt-4 text-sm leading-7 text-white/60">
            Simulations help you compare direct confrontation, calm boundaries, or waiting. The goal is not certainty. The goal is better preparation.
          </p>
        </PremiumPanel>
      </div>
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
      title="Pricing"
      subtitle="Choose the level of access that fits how you want to use Defrag as a personal platform or a deeper relational tool."
    >
      <PremiumPanel className="p-6 sm:p-8">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">Plans</p>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">
            Access the platform at the level that matches your work and personal needs.
          </h3>
          <p className="mt-4 text-sm leading-7 text-white/60">
            Start with the core experience, then upgrade when you want broader relationship tracking, simulations, and more advanced support.
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
      subtitle="Manage your profile, account access, and subscription details from one organized place."
    >
      <PremiumPanel className="p-6 sm:p-8">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">Account management</p>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">
            Control the details that shape how Defrag works for you.
          </h3>
          <p className="mt-4 text-sm leading-7 text-white/60">
            Update your account details, review subscription status, and manage the settings connected to your platform access.
          </p>
        </div>
      </PremiumPanel>

      <SettingsPanels />
    </AppShell>
  )
}
TSX

cat > apps/web/src/app/login/page.tsx <<'TSX'
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AuthShell from "@/components/auth/AuthShell"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setLoading(true)
    setMessage("")

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!res.ok || data.error) {
      setMessage(data.error || "Unable to log in.")
      setLoading(false)
      return
    }

    router.push("/dashboard")
    router.refresh()
  }

  return (
    <AuthShell
      eyebrow="Login"
      title="Return to your Defrag workspace"
      body="Log in to access your dashboard, relationship maps, timeline, simulations, and AI guidance."
      footerText="Need an account?"
      footerLinkLabel="Start free trial"
      footerLinkHref="/signup"
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-white">Email</label>
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-white">Password</label>
          <input
            type="password"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full rounded-2xl bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>

        {message ? <p className="text-sm text-rose-400">{message}</p> : null}
      </div>
    </AuthShell>
  )
}
TSX

cat > apps/web/src/app/signup/page.tsx <<'TSX'
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AuthShell from "@/components/auth/AuthShell"

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSignup() {
    setLoading(true)
    setMessage("")

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!res.ok || data.error) {
      setMessage(data.error || "Unable to create account.")
      setLoading(false)
      return
    }

    setMessage("Account created. Continue to onboarding.")
    setTimeout(() => {
      router.push("/onboarding")
      router.refresh()
    }, 700)
  }

  return (
    <AuthShell
      eyebrow="Signup"
      title="Create your account and begin building your relationship system"
      body="Start your Defrag workspace, complete onboarding, and unlock your dashboard, timelines, simulations, and guidance tools."
      footerText="Already have an account?"
      footerLinkLabel="Log in"
      footerLinkHref="/login"
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-white">Email</label>
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-white">Password</label>
          <input
            type="password"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full rounded-2xl bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>

        {message ? <p className="text-sm text-white/60">{message}</p> : null}
      </div>
    </AuthShell>
  )
}
TSX

cat > apps/web/src/app/onboarding/page.tsx <<'TSX'
import AppShell from "@/components/layout/AppShell"
import ProfileSetupForm from "@/components/onboarding/ProfileSetupForm"
import PremiumPanel from "@/components/ui/PremiumPanel"

export default function OnboardingPage() {
  return (
    <AppShell
      title="Profile setup"
      subtitle="Add the details Defrag uses to personalize your dashboard, timeline interpretation, and platform guidance."
    >
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <PremiumPanel className="p-6 sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">Onboarding</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Build your starting profile</h2>
          <p className="mt-4 text-sm leading-7 text-white/60">
            Defrag uses your profile details to create a more accurate starting view of timing, relationship patterns, and personalized guidance.
          </p>

          <div className="mt-8 grid gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Why we ask</p>
              <p className="mt-2 text-sm leading-6 text-white/65">This helps Defrag create a stronger baseline for timing layers, insight, and pattern recognition.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">You stay in control</p>
              <p className="mt-2 text-sm leading-6 text-white/65">You can refine your profile later as your use of the platform expands.</p>
            </div>
          </div>
        </PremiumPanel>

        <div className="max-w-2xl">
          <ProfileSetupForm />
        </div>
      </div>
    </AppShell>
  )
}
TSX

echo "phase_16_platform_alignment_copy_v2.sh completed"
