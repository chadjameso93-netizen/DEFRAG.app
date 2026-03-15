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
      <div className="glass-floating flex items-center justify-between rounded-[var(--radius-lg)] px-4 py-4">
        <Link href="/" className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#555555]">
          Defrag
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-xl border border-[#1F1F1F] bg-[#0A0A0A] p-2 text-[#9A9A9A] transition-colors duration-300 hover:bg-[#1F1F1F]"
          aria-label="Toggle navigation"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open ? (
        <div className="glass-surface mt-3 rounded-[var(--radius-lg)] p-3">
          <nav className="grid gap-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-[#9A9A9A] transition-colors duration-300 hover:bg-[#161616] hover:text-[#EAEAEA]"
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
