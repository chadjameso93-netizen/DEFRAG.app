#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

mkdir -p apps/web/src/components/{brand,ui,layout,marketing,auth,flow}
mkdir -p apps/web/src/app/{login,signup,onboarding,pricing,settings}
mkdir -p apps/web/src/lib

cat > apps/web/src/lib/cn.ts <<'TS'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
TS

cat > apps/web/src/components/brand/BrandBackground.tsx <<'TSX'
export default function BrandBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[-12%] top-[-10%] h-[28rem] w-[28rem] rounded-full bg-fuchsia-200/40 blur-3xl" />
      <div className="absolute right-[-8%] top-[8%] h-[24rem] w-[24rem] rounded-full bg-sky-200/40 blur-3xl" />
      <div className="absolute bottom-[-12%] left-[18%] h-[22rem] w-[22rem] rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.65),transparent_38%)]" />
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
        "rounded-[28px] border border-white/70 bg-white/80 shadow-[0_12px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl",
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
      <span className="text-current">{icon}</span>
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
    <main className="relative min-h-screen overflow-hidden bg-[#f5f7fb] text-zinc-950">
      <BrandBackground />
      <div className="relative mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 gap-4 p-4 lg:grid-cols-[290px_1fr] lg:gap-6 lg:p-6">
        <GlassPanel className="h-fit p-5 lg:sticky lg:top-6 lg:p-7">
          <div className="mb-8">
            <Link href="/" className="text-[11px] font-semibold uppercase tracking-[0.32em] text-zinc-500">
              Defrag
            </Link>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight">Relational intelligence</h1>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Understand patterns in relationships, families, and teams.
            </p>
          </div>

          <nav className="grid gap-2">
            <NavItem href="/dashboard" label="Dashboard" icon={<LayoutDashboard size={18} />} />
            <NavItem href="/relationships" label="Relationships" icon={<Users size={18} />} />
            <NavItem href="/timeline" label="Timeline" icon={<Clock3 size={18} />} />
            <NavItem href="/simulations" label="Simulations" icon={<Sparkles size={18} />} />
            <NavItem href="/pricing" label="Pricing" icon={<CreditCard size={18} />} />
            <NavItem href="/settings" label="Settings" icon={<Settings size={18} />} />
          </nav>

          <div className="mt-8 rounded-[24px] border border-zinc-200/80 bg-zinc-50/90 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Today</p>
            <p className="mt-3 text-sm leading-6 text-zinc-700">
              Calm pacing and short clarifications are more likely to help than urgency.
            </p>
          </div>
        </GlassPanel>

        <div className="space-y-4 lg:space-y-6">
          <GlassPanel className="p-6 lg:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Defrag Workspace</p>
            {title ? <h2 className="mt-3 text-3xl font-semibold tracking-tight lg:text-4xl">{title}</h2> : null}
            {subtitle ? <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-600">{subtitle}</p> : null}
          </GlassPanel>

          {children}
        </div>
      </div>
    </main>
  )
}
TSX

cat > apps/web/src/components/marketing/HeroLanding.tsx <<'TSX'
import Link from "next/link"
import { ArrowRight, Sparkles, ShieldCheck, GitBranchPlus } from "lucide-react"
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
      <div className="mb-4 inline-flex rounded-2xl border border-zinc-200 bg-white p-3 text-zinc-950 shadow-sm">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-zinc-950">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-zinc-600">{body}</p>
    </GlassPanel>
  )
}

export default function HeroLanding() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f5f7fb] px-4 py-4 text-zinc-950 sm:px-6 sm:py-6">
      <BrandBackground />

      <div className="relative mx-auto max-w-7xl space-y-6">
        <GlassPanel className="overflow-hidden px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-zinc-500">Defrag</p>
              <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
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

        <section className="grid gap-6 md:grid-cols-3">
          <Feature
            icon={<GitBranchPlus size={20} />}
            title="See relationship patterns"
            body="Map the people, tension points, and recurring cycles that shape your daily experience."
          />
          <Feature
            icon={<Sparkles size={20} />}
            title="Prepare for difficult conversations"
            body="Explore likely outcomes before you act, with guidance aimed at healthier communication."
          />
          <Feature
            icon={<ShieldCheck size={20} />}
            title="Follow daily insight"
            body="Get calm, practical guidance about timing, pressure, and ways to reduce avoidable friction."
          />
        </section>
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
    <main className="relative min-h-screen overflow-hidden bg-[#f5f7fb] px-4 py-4 sm:px-6 sm:py-6">
      <BrandBackground />

      <div className="relative mx-auto grid min-h-[calc(100vh-2rem)] max-w-7xl items-center gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <GlassPanel className="p-7 sm:p-10">
          <Link href="/" className="text-[11px] font-semibold uppercase tracking-[0.32em] text-zinc-500">
            Defrag
          </Link>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950">{title}</h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-600">{body}</p>

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

cat > apps/web/src/app/page.tsx <<'TSX'
import HeroLanding from "@/components/marketing/HeroLanding"

export default function HomePage() {
  return <HeroLanding />
}
TSX

cat > apps/web/src/app/login/page.tsx <<'TSX'
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AuthShell from "@/components/auth/AuthShell"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setLoading(true)
    setMessage("")

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setMessage(error.message)
      setLoading(false)
      return
    }

    router.push("/dashboard")
    router.refresh()
  }

  return (
    <AuthShell
      eyebrow="Login"
      title="Return to your workspace"
      body="Log in to continue with your dashboard, system map, simulations, and daily insight."
      footerText="Need an account?"
      footerLinkLabel="Start free trial"
      footerLinkHref="/signup"
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-900">Email</label>
          <input
            className="w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-zinc-400"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-900">Password</label>
          <input
            type="password"
            className="w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-zinc-400"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>

        {message ? <p className="text-sm text-rose-600">{message}</p> : null}
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
import { supabase } from "@/lib/supabase"

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSignup() {
    setLoading(true)
    setMessage("")

    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setMessage(error.message)
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
      title="Start with a calm, simple setup"
      body="Create your account first. Then Defrag will guide you through a short onboarding flow."
      footerText="Already have an account?"
      footerLinkLabel="Log in"
      footerLinkHref="/login"
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-900">Email</label>
          <input
            className="w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-zinc-400"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-900">Password</label>
          <input
            type="password"
            className="w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-zinc-400"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>

        {message ? <p className="text-sm text-zinc-600">{message}</p> : null}
      </div>
    </AuthShell>
  )
}
TSX

cat > apps/web/src/app/onboarding/page.tsx <<'TSX'
import AppShell from "@/components/layout/AppShell"
import ProfileSetupForm from "@/components/onboarding/ProfileSetupForm"
import GlassPanel from "@/components/ui/GlassPanel"

export default function OnboardingPage() {
  return (
    <AppShell
      title="Profile setup"
      subtitle="Add the basics so Defrag can personalize insight and build your first system map."
    >
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <GlassPanel className="p-6 sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Onboarding</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950">Build your starting profile</h2>
          <p className="mt-4 text-sm leading-7 text-zinc-600">
            Birth details help Defrag build optional timing layers and more personalized insight. You can refine this later.
          </p>

          <div className="mt-8 grid gap-3">
            <div className="rounded-2xl border border-zinc-200 bg-white/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Why we ask</p>
              <p className="mt-2 text-sm leading-6 text-zinc-700">This helps create a more accurate baseline for insight, timing, and relationship patterns.</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">You stay in control</p>
              <p className="mt-2 text-sm leading-6 text-zinc-700">You can update, expand, or refine your profile later from settings.</p>
            </div>
          </div>
        </GlassPanel>

        <div className="max-w-2xl">
          <ProfileSetupForm />
        </div>
      </div>
    </AppShell>
  )
}
TSX

echo "phase_05_brand_auth_shell.sh completed"
