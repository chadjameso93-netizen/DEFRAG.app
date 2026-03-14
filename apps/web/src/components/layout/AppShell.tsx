"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Home,
  Users,
  Calendar,
  MessageSquare,
  Settings,
  PanelLeftClose,
  PanelLeft,
  LogOut,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/cn"

const NAV_ITEMS = [
  { href: "/dashboard", label: "Today", icon: Home },
  { href: "/relationships", label: "Relationships", icon: Users },
  { href: "/timeline", label: "Timeline", icon: Calendar },
  { href: "/ai", label: "AI", icon: MessageSquare },
  { href: "/settings", label: "Settings", icon: Settings },
]

function SideNavItem({
  href,
  label,
  icon: Icon,
  active,
  collapsed,
}: {
  href: string
  label: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  active: boolean
  collapsed: boolean
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-300",
        active
          ? "bg-[var(--surface-2)] text-[var(--text-primary)]"
          : "text-[var(--text-muted)] hover:bg-[var(--surface-1)] hover:text-[var(--text-secondary)]",
        collapsed && "justify-center px-2"
      )}
    >
      {active && (
        <div className="absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-r bg-[var(--text-primary)]" />
      )}
      <Icon size={18} className={cn(active ? "text-[var(--text-primary)]" : "text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]")} />
      {!collapsed && <span>{label}</span>}
    </Link>
  )
}

export default function AppShell({
  children,
  rightPanel,
}: {
  children: ReactNode
  rightPanel?: ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  async function handleSignOut() {
    const { createBrowserClient } = await import("@supabase/ssr")
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <div className="flex h-screen flex-col bg-[var(--surface-0)]">
      {/* Top Navigation Bar */}
      <header className="flex h-12 shrink-0 items-center border-b border-[var(--border-subtle)] bg-[var(--surface-0)]/80 px-4 backdrop-blur-xl">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-[13px] font-semibold tracking-wide text-[var(--text-primary)]">DEFRAG</span>
        </Link>

        <nav className="ml-8 hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-[13px] font-medium transition-all duration-300",
                  isActive
                    ? "bg-[var(--surface-2)] text-[var(--text-primary)]"
                    : "text-[var(--text-muted)] hover:bg-[var(--surface-1)] hover:text-[var(--text-secondary)]"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 rounded-md px-3 py-1.5 text-[13px] text-[var(--text-muted)] transition-colors duration-300 hover:bg-[var(--surface-1)] hover:text-[var(--text-secondary)]"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside
          className={cn(
            "hidden shrink-0 flex-col border-r border-[var(--border-subtle)] bg-[var(--surface-0)] transition-[width] duration-300 lg:flex",
            sidebarCollapsed ? "w-14" : "w-56"
          )}
        >
          <div className="flex h-10 items-center justify-end px-2">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="rounded-md p-1.5 text-[var(--text-muted)] transition-colors duration-300 hover:bg-[var(--surface-1)] hover:text-[var(--text-secondary)]"
            >
              {sidebarCollapsed ? <PanelLeft size={16} /> : <PanelLeftClose size={16} />}
            </button>
          </div>

          <nav className="flex-1 space-y-1 px-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <SideNavItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  active={isActive}
                  collapsed={sidebarCollapsed}
                />
              )
            })}
          </nav>

          {!sidebarCollapsed && (
            <div className="border-t border-[var(--border-subtle)] p-3">
              <div className="rounded-lg bg-[var(--surface-1)] p-3">
                <p className="text-[10px] font-medium uppercase tracking-widest text-[var(--text-muted)]">Free plan</p>
                <p className="mt-1 text-[12px] text-[var(--text-secondary)]">5 insights / month</p>
                <Link
                  href="/settings"
                  className="mt-2 flex items-center gap-1 text-[12px] font-medium text-[var(--text-secondary)] transition-colors duration-300 hover:text-[var(--text-primary)]"
                >
                  Upgrade <ChevronRight size={12} />
                </Link>
              </div>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>

          {/* Right Panel (contextual) */}
          {rightPanel && (
            <aside className="hidden w-80 shrink-0 overflow-y-auto border-l border-[var(--border-subtle)] bg-[var(--surface-0)] xl:block">
              {rightPanel}
            </aside>
          )}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="flex shrink-0 items-center justify-around border-t border-[var(--border-subtle)] bg-[var(--surface-0)]/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-2 text-[10px] font-medium transition-all duration-300",
                isActive ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"
              )}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
