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
      <div className="flex items-center justify-between rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-1)] px-4 py-4 backdrop-blur-2xl">
        <Link href="/" className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[var(--text-muted)]">
          Defrag
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-1)] p-2 text-[var(--text-secondary)] transition-colors duration-300 hover:bg-[var(--surface-2)]"
          aria-label="Toggle navigation"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open ? (
        <div className="mt-3 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-0)]/90 p-3 backdrop-blur-2xl">
          <nav className="grid gap-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-[var(--text-secondary)] transition-colors duration-300 hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]"
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
