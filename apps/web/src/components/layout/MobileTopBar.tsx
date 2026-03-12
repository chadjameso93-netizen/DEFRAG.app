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
