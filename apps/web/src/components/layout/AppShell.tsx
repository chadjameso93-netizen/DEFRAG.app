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
        "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors duration-150",
        active
          ? "bg-zinc-800 text-zinc-50"
          : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200",
        collapsed && "justify-center px-2"
      )}
    >
      {active && (
        <div className="absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-r bg-zinc-50" />
      )}
      <Icon size={18} className={cn(active ? "text-zinc-50" : "text-zinc-500 group-hover:text-zinc-300")} />
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
    <div className="flex h-screen flex-col bg-zinc-950">
      {/* Top Navigation Bar */}
      <header className="flex h-12 shrink-0 items-center border-b border-zinc-800 bg-zinc-950 px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-[13px] font-semibold tracking-wide text-zinc-50">DEFRAG</span>
        </Link>

        <nav className="ml-8 hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors duration-150",
                  isActive
                    ? "bg-zinc-800 text-zinc-50"
                    : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
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
            className="flex items-center gap-2 rounded-md px-3 py-1.5 text-[13px] text-zinc-500 transition-colors hover:bg-zinc-800/50 hover:text-zinc-300"
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
            "hidden shrink-0 flex-col border-r border-zinc-800 bg-zinc-950 transition-[width] duration-200 lg:flex",
            sidebarCollapsed ? "w-14" : "w-56"
          )}
        >
          <div className="flex h-10 items-center justify-end px-2">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
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
            <div className="border-t border-zinc-800 p-3">
              <div className="rounded-lg bg-zinc-900 p-3">
                <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">Free plan</p>
                <p className="mt-1 text-[12px] text-zinc-400">5 insights / month</p>
                <Link
                  href="/settings"
                  className="mt-2 flex items-center gap-1 text-[12px] font-medium text-zinc-300 transition-colors hover:text-zinc-50"
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
            <aside className="hidden w-80 shrink-0 overflow-y-auto border-l border-zinc-800 bg-zinc-950 xl:block">
              {rightPanel}
            </aside>
          )}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="flex shrink-0 items-center justify-around border-t border-zinc-800 bg-zinc-950 pb-[env(safe-area-inset-bottom)] lg:hidden">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-2 text-[10px] font-medium transition-colors",
                isActive ? "text-zinc-50" : "text-zinc-500"
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
