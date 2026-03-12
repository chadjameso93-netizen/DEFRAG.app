"use client"

import { motion } from "framer-motion"

export default function FamilyGraph() {
  return (
    <div className="rounded-2xl bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),rgba(244,244,245,1))] p-6">
      <div className="grid gap-10">
        <div className="flex items-center justify-center gap-12 sm:gap-20">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-zinc-300 bg-white px-6 py-4 text-sm shadow-sm">
            Parent A
          </motion.div>
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl border border-zinc-300 bg-white px-6 py-4 text-sm shadow-sm">
            Parent B
          </motion.div>
        </div>

        <div className="mx-auto h-8 w-px bg-zinc-300" />

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="rounded-2xl border border-zinc-300 bg-white px-6 py-4 text-sm shadow-sm">
            You
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl border border-zinc-300 bg-white px-6 py-4 text-sm shadow-sm">
            Sibling
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="rounded-2xl border border-zinc-300 bg-white px-6 py-4 text-sm shadow-sm">
            Relative
          </motion.div>
        </div>
      </div>
    </div>
  )
}
