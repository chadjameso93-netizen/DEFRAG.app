"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function GlowButton({
  href,
  label,
  inverted = false,
}: {
  href: string
  label: string
  inverted?: boolean
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link
        href={href}
        className={[
          "inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-medium transition-all duration-400",
          inverted
            ? "border border-[var(--border)] bg-[var(--surface-1)] text-[var(--text-primary)] hover:bg-[var(--surface-2)] hover:shadow-[0_0_20px_rgba(245,245,240,0.04)]"
            : "bg-[var(--text-primary)] text-[var(--surface-0)] shadow-[0_0_30px_rgba(245,245,240,0.06)] hover:shadow-[0_0_40px_rgba(245,245,240,0.1)]",
        ].join(" ")}
      >
        {label}
      </Link>
    </motion.div>
  )
}
