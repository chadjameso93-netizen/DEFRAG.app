"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { LayoutDashboard, Users, Clock3, Sparkles, CreditCard, Settings, ChevronRight } from "lucide-react"
import BrandMesh from "@/components/brand/BrandMesh"
import PremiumPanel from "@/components/ui/PremiumPanel"

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
        <div className="grid gap-4 lg:grid-cols-[320px_1fr] lg:gap-6">
          <PremiumPanel className="h-fit p-5 lg:sticky lg:top-6 lg:p-7">
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
            <PremiumPanel className="p-6 sm:p-8">
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
