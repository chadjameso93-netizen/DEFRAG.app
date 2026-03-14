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
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link
        href={href}
        className={[
          "inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-medium transition-all duration-300",
          inverted
            ? "border border-white/[0.06] bg-white/[0.03] text-[var(--text-primary)] backdrop-blur-xl hover:bg-white/[0.06]"
            : "bg-[var(--text-primary)] text-[var(--surface-0)] shadow-[0_10px_40px_rgba(0,0,0,0.7)] hover:shadow-[0_14px_50px_rgba(0,0,0,0.8)]",
        ].join(" ")}
      >
        {label}
      </Link>
    </motion.div>
  )
}
