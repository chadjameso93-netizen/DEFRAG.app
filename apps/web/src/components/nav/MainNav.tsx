"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function MainNav() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="sticky top-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--surface-0)]/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-[var(--text-primary)]">
          Defrag
        </Link>

        <nav className="flex gap-6 text-sm text-[var(--text-secondary)]">
          <Link href="/dashboard" className="transition-colors duration-300 hover:text-[var(--text-primary)]">Dashboard</Link>
          <Link href="/relationships" className="transition-colors duration-300 hover:text-[var(--text-primary)]">Relationships</Link>
          <Link href="/timeline" className="transition-colors duration-300 hover:text-[var(--text-primary)]">Timeline</Link>
          <Link href="/simulations" className="transition-colors duration-300 hover:text-[var(--text-primary)]">Simulations</Link>
          <Link href="/pricing" className="transition-colors duration-300 hover:text-[var(--text-primary)]">Pricing</Link>
        </nav>
      </div>
    </motion.header>
  )
}
