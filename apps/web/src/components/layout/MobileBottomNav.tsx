"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bot, Clock3, CreditCard, LayoutDashboard, Settings, Users } from "lucide-react"
import { cn } from "@/lib/cn"

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/timeline", label: "Timeline", icon: Clock3 },
  { href: "/ai", label: "AI", icon: Bot },
  { href: "/relationships", label: "People", icon: Users },
  { href: "/pricing", label: "Pricing", icon: CreditCard },
  { href: "/settings", label: "Settings", icon: Settings },
]

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/90 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur-2xl lg:hidden">
      <nav className="mx-auto grid max-w-xl grid-cols-6 gap-2">
        {items.map((item) => {
          const active = isActive(pathname, item.href)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-3 text-[10px] font-medium transition",
                active ? "bg-white text-zinc-950" : "bg-white/5 text-white/62 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
