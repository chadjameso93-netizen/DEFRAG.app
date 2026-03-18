"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutGrid,
  Users,
  Calendar,
  MessageSquare,
  Settings,
  PanelLeftClose,
  PanelLeft,
  LogOut,
  ChevronRight,
  Activity
} from "lucide-react"
import { cn } from "@/lib/cn"

const NAV_ITEMS = [
  { href: "/app", label: "Overview", icon: LayoutGrid },
  { href: "/relationships", label: "Field", icon: Users },
  { href: "/timeline", label: "Timeline", icon: Calendar },
  { href: "/daily-read", label: "Daily Read", icon: MessageSquare },
  { href: "/settings", label: "System", icon: Settings },
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
        "group relative flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-[12px] font-bold uppercase tracking-widest transition-all duration-300",
        active
          ? "bg-[#111111] text-[#EAEAEA]"
          : "text-[#555555] hover:bg-[#050505] hover:text-[#9A9A9A]",
        collapsed && "justify-center px-2"
      )}
    >
      {active && (
        <div className="absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-r bg-[#EAEAEA] shadow-[0_0_8px_rgba(234,234,234,0.4)]" />
      )}
      <Icon size={16} className={cn("shrink-0", active ? "text-[#EAEAEA]" : "text-[#555555] group-hover:text-[#9A9A9A]")} />
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
    <div className="relative flex h-screen flex-col bg-[#000000] text-[#EAEAEA] font-sans selection:bg-[#EAEAEA] selection:text-[#000000]">
      {/* Structural Top Bar */}
      <header className="z-50 flex h-16 shrink-0 items-center justify-between border-b border-[#111111] bg-[#000000] px-8">
        <div className="flex items-center gap-12">
          <Link href="/app" className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-[#EAEAEA] flex items-center justify-center">
                <Activity size={18} className="text-[#000000]" />
             </div>
             <span className="text-[14px] font-bold tracking-[0.3em] uppercase text-[#EAEAEA]">DEFRAG</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-[10px] px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-all duration-300",
                    isActive
                      ? "bg-[#111111] text-[#EAEAEA]"
                      : "text-[#555555] hover:bg-[#050505] hover:text-[#9A9A9A]"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-3 pr-6 border-r border-[#111111] lg:flex">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
             <span className="text-[10px] font-bold uppercase tracking-widest text-[#555555]">System Nominal</span>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 rounded-[10px] px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-[#555555] transition-all duration-300 hover:bg-[#111111] hover:text-[#EAEAEA]"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Terminate</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Workspace Sidebar */}
        <aside
          className={cn(
            "hidden shrink-0 flex-col border-r border-[#111111] bg-[#000000] transition-[width] duration-500 lg:flex",
            sidebarCollapsed ? "w-20" : "w-64"
          )}
        >
          <div className="flex h-14 items-center justify-between px-6">
            {!sidebarCollapsed && <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#333333]">Navigation</span>}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="rounded-lg p-1.5 text-[#333333] transition-all duration-300 hover:text-[#EAEAEA]"
            >
              {sidebarCollapsed ? <PanelLeft size={16} /> : <PanelLeftClose size={16} />}
            </button>
          </div>

          <nav className="flex-1 space-y-1 px-4 pt-2">
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
            <div className="p-6">
              <div className="bg-[#050505] border border-[#111111] rounded-[20px] p-6 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#555555]">Current License</p>
                  <p className="text-[14px] font-medium text-[#EAEAEA]">Operational Base</p>
                </div>
                <div className="w-full bg-[#111111] h-1.5 rounded-full overflow-hidden">
                   <div className="bg-[#EAEAEA] h-full w-[35%] rounded-full" />
                </div>
                <Link
                  href="/settings"
                  className="flex items-center justify-between group"
                >
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#555555] group-hover:text-[#EAEAEA] transition-colors">Expand limits</span>
                  <ChevronRight size={14} className="text-[#333] group-hover:text-[#EAEAEA] transition-colors" />
                </Link>
              </div>
            </div>
          )}
        </aside>

        {/* Main Operational View */}
        <main className="flex flex-1 overflow-hidden bg-[#000000]">
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-[1400px] px-8 py-10 lg:px-12">
              {children}
            </div>
          </div>

          {/* Contextual Intelligence Panel */}
          {rightPanel && (
            <aside className="hidden w-[400px] shrink-0 overflow-y-auto border-l border-[#111111] bg-[#000000] xl:block">
              {rightPanel}
            </aside>
          )}
        </main>
      </div>

      {/* Legacy Mobile Overlay */}
      <nav className="flex h-16 shrink-0 items-center justify-around border-t border-[#111111] bg-[#000000] pb-[env(safe-area-inset-bottom)] lg:hidden">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-4 text-[10px] font-bold uppercase tracking-widest transition-all duration-300",
                isActive ? "text-[#EAEAEA]" : "text-[#333333]"
              )}
            >
              <Icon size={18} />
              <span className="scale-75">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
