#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

mkdir -p apps/web/src/components/{layout,auth,pricing,settings}

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
      <div className="flex items-center justify-between rounded-[24px] border border-white/70 bg-white/85 px-4 py-4 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
        <Link href="/" className="text-[11px] font-semibold uppercase tracking-[0.34em] text-zinc-500">
          Defrag
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-xl border border-zinc-200 bg-white p-2 text-zinc-700"
          aria-label="Toggle navigation"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open ? (
        <div className="mt-3 rounded-[24px] border border-white/70 bg-white/90 p-3 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
          <nav className="grid gap-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-950 hover:text-white"
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
        <MobileTopBar />

        <div className="mt-3 grid gap-4 lg:mt-0 lg:grid-cols-[320px_1fr] lg:gap-6">
          <PremiumPanel className="hidden h-fit p-5 lg:sticky lg:top-6 lg:block lg:p-7">
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
            <PremiumPanel className="p-5 sm:p-8">
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

cat > apps/web/src/app/pricing/page.tsx <<'TSX'
import AppShell from "@/components/layout/AppShell"
import PremiumPanel from "@/components/ui/PremiumPanel"

function Plan({
  name,
  price,
  description,
  featured = false,
}: {
  name: string
  price: string
  description: string
  featured?: boolean
}) {
  return (
    <PremiumPanel className={`p-6 ${featured ? "border-zinc-900 bg-zinc-950 text-white" : ""}`}>
      <p className={`text-[11px] font-semibold uppercase tracking-[0.24em] ${featured ? "text-zinc-300" : "text-zinc-500"}`}>{name}</p>
      <p className="mt-4 text-4xl font-semibold tracking-tight">{price}</p>
      <p className={`mt-3 text-sm leading-7 ${featured ? "text-zinc-300" : "text-zinc-600"}`}>{description}</p>

      <button
        className={`mt-8 w-full rounded-2xl px-5 py-3 text-sm font-medium transition ${featured ? "bg-white text-zinc-950 hover:bg-zinc-100" : "bg-zinc-950 text-white hover:bg-zinc-800"}`}
      >
        Choose plan
      </button>
    </PremiumPanel>
  )
}

export default function PricingPage() {
  return (
    <AppShell
      title="Simple pricing"
      subtitle="Choose the level of depth that fits how you want to use Defrag."
    >
      <section className="grid gap-4 lg:grid-cols-3 lg:gap-6">
        <Plan name="Starter" price="Free" description="A simple entry point for exploring the product." />
        <Plan name="Core" price="$24/mo" description="The main plan for ongoing personal use." featured />
        <Plan name="Practitioner" price="$99/mo" description="For coaches, facilitators, and advanced use." />
      </section>
    </AppShell>
  )
}
TSX

cat > apps/web/src/app/settings/page.tsx <<'TSX'
import AppShell from "@/components/layout/AppShell"
import PremiumPanel from "@/components/ui/PremiumPanel"

export default function SettingsPage() {
  return (
    <AppShell
      title="Settings"
      subtitle="Manage profile details, access, and account preferences."
    >
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        <PremiumPanel className="p-6">
          <h3 className="text-lg font-medium text-zinc-950">Account</h3>
          <p className="mt-2 text-sm leading-7 text-zinc-600">Manage email, password recovery, and account access.</p>
        </PremiumPanel>

        <PremiumPanel className="p-6">
          <h3 className="text-lg font-medium text-zinc-950">Subscription</h3>
          <p className="mt-2 text-sm leading-7 text-zinc-600">View current plan and future billing actions.</p>
        </PremiumPanel>
      </div>
    </AppShell>
  )
}
TSX

pkill -f "next dev" || true
rm -rf apps/web/.next
cd apps/web
npm run dev
