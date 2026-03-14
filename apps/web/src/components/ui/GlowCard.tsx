"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/cn"
import { motion } from "framer-motion"

export default function GlowCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--surface-1)] backdrop-blur-2xl transition-all duration-500 hover:border-[var(--border)] hover:bg-[var(--surface-2)] hover:shadow-[0_0_40px_rgba(245,245,240,0.03)]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,245,240,0.03),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.04),transparent_35%)] opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative">{children}</div>
    </motion.div>
  )
}
