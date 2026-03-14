"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bot, ChevronRight, Clock3, CreditCard, LayoutDashboard, Settings, Sparkles, UserPlus, Users } from "lucide-react"
import BrandMesh from "@/components/brand/BrandMesh"
import PremiumPanel from "@/components/ui/PremiumPanel"
import MobileBottomNav from "@/components/layout/MobileBottomNav"
import { cn } from "@/lib/cn"

function NavItem({
  href,
  label,
  icon,
  active,
}: {
  href: string
  label: string
  icon: ReactNode
  active?: boolean
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition duration-300",
        active ? "bg-white text-zinc-950" : "text-white/65 hover:bg-white/10 hover:text-white"
      )}
    >
      <span className="flex items-center gap-3">
        {icon}
        <span>{label}</span>
      </span>
      <ChevronRight size={16} className={cn("transition", active ? "opacity-100" : "opacity-0 group-hover:opacity-100")} />
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
  const pathname = usePathname()

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <BrandMesh />

      <div className="relative mx-auto max-w-[1600px] px-3 py-3 pb-28 sm:px-4 sm:py-4 sm:pb-28 lg:px-6 lg:py-6 lg:pb-6">
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
              <NavItem href="/dashboard" label="Dashboard" icon={<LayoutDashboard size={18} />} active={pathname === "/dashboard"} />
              <NavItem href="/relationships" label="Relationships" icon={<Users size={18} />} active={pathname === "/relationships"} />
              <NavItem href="/timeline" label="Timeline" icon={<Clock3 size={18} />} active={pathname === "/timeline"} />
              <NavItem href="/ai" label="Defrag AI" icon={<Bot size={18} />} active={pathname === "/ai"} />
              <NavItem href="/invite" label="Invite people" icon={<UserPlus size={18} />} active={pathname === "/invite"} />
              <NavItem href="/simulations" label="Simulations" icon={<Sparkles size={18} />} active={pathname === "/simulations"} />
              <NavItem href="/pricing" label="Pricing" icon={<CreditCard size={18} />} active={pathname === "/pricing"} />
              <NavItem href="/settings" label="Settings" icon={<Settings size={18} />} active={pathname === "/settings"} />
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

      <MobileBottomNav />
    </main>
  )
}
