"use client"

import { motion } from "framer-motion"

export default function RelationshipGraph() {
  return (
    <div className="relative h-[320px] w-full overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),rgba(244,244,245,1))]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 320" fill="none">
        <path d="M400 64 C 300 120, 230 150, 160 220" stroke="#a1a1aa" strokeWidth="2" />
        <path d="M400 64 C 500 120, 570 150, 640 220" stroke="#a1a1aa" strokeWidth="2" />
        <path d="M400 64 C 400 120, 400 170, 400 250" stroke="#a1a1aa" strokeWidth="2" />
      </svg>

      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute left-1/2 top-10 -translate-x-1/2 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm font-medium shadow-sm">
        You
      </motion.div>

      <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="absolute left-16 top-44 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm shadow-sm">
        Partner
      </motion.div>

      <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="absolute right-16 top-44 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm shadow-sm">
        Parent
      </motion.div>

      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="absolute left-1/2 bottom-10 -translate-x-1/2 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm shadow-sm">
        Sibling
      </motion.div>
    </div>
  )
}
