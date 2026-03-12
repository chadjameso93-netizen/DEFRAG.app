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
