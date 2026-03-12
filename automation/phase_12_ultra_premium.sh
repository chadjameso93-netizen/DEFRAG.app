#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

mkdir -p apps/web/src/components/{brand,ui,layout,marketing}

cat > apps/web/src/components/brand/BrandMesh.tsx <<'TSX'
export default function BrandMesh() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#f4f6fb]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.12),transparent_24%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.08),transparent_22%)]" />
      <div className="absolute left-[-10%] top-[-12%] h-[34rem] w-[34rem] rounded-full bg-fuchsia-200/25 blur-3xl" />
      <div className="absolute right-[-8%] top-[6%] h-[30rem] w-[30rem] rounded-full bg-sky-200/25 blur-3xl" />
      <div className="absolute bottom-[-14%] left-[22%] h-[24rem] w-[24rem] rounded-full bg-violet-200/20 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] [background-size:56px_56px]" />
    </div>
  )
}
TSX

cat > apps/web/src/components/ui/PremiumPanel.tsx <<'TSX'
import type { ReactNode } from "react"
import { cn } from "@/lib/cn"

export default function PremiumPanel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-[32px] border border-white/70 bg-white/82 shadow-[0_24px_100px_rgba(15,23,42,0.10),0_2px_8px_rgba(15,23,42,0.04)] backdrop-blur-2xl",
        className
      )}
    >
      {children}
    </div>
  )
}
TSX

cat > apps/web/src/components/layout/MobileTopBar.tsx <<'TSX'
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
TSX

echo "phase_12_ultra_premium.sh written"
