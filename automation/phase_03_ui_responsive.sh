#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "Installing UI dependencies"

cd apps/web

npm install framer-motion clsx

cd ../..

mkdir -p apps/web/src/components/ui
mkdir -p apps/web/src/components/layout
mkdir -p apps/web/src/components/nav

cat > apps/web/src/components/nav/MainNav.tsx <<'TSX'
"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function MainNav() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b"
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-tight">
          Defrag
        </Link>

        <nav className="flex gap-6 text-sm">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/relationships">Relationships</Link>
          <Link href="/timeline">Timeline</Link>
          <Link href="/simulations">Simulations</Link>
          <Link href="/pricing">Pricing</Link>
        </nav>
      </div>
    </motion.header>
  )
}
TSX

cat > apps/web/src/components/layout/PageContainer.tsx <<'TSX'
import { ReactNode } from "react"

export default function PageContainer({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {children}
    </div>
  )
}
TSX

cat > apps/web/src/components/ui/Card.tsx <<'TSX'
import { ReactNode } from "react"

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      {children}
    </div>
  )
}
TSX

cat > apps/web/src/components/ui/FadeIn.tsx <<'TSX'
"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

export default function FadeIn({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  )
}
TSX

echo "UI components created"

