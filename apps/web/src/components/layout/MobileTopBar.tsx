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
  { href: "/invite", label: "Invite" },
  { href: "/settings", label: "Settings" },
]

export default function MobileTopBar() {
  const [open, setOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-between rounded-[24px] border border-white/10 bg-white/5 px-4 py-4 shadow-[0_16px_50px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
        <Link href="/" className="text-[11px] font-semibold uppercase tracking-[0.34em] text-white/60">
          Defrag
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/80 transition hover:bg-white/10"
          aria-label="Toggle navigation"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open ? (
        <div className="mt-3 rounded-[24px] border border-white/10 bg-black/40 p-3 shadow-[0_16px_50px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
          <nav className="grid gap-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
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
