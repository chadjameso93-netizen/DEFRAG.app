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
