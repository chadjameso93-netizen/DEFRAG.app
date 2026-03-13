"use client"

import { useState } from "react"
import GlowCard from "@/components/ui/GlowCard"
import { useSession } from "@/hooks/useSession"

export default function AIChat() {
  const [msg, setMsg] = useState("")
  const [reply, setReply] = useState("Describe a relationship situation, and Defrag will return structured guidance based on the pattern you describe.")
  const [loading, setLoading] = useState(false)
  const { session } = useSession()
  const userId = session?.user?.id

  async function send() {
    if (!msg.trim()) return
    if (!userId) {
      setReply("Sign in to generate strategic guidance.")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/insights", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({}),
      })
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`)
      }
      const data = (await res.json()) as { insight?: { summary?: string }; guidance?: string }
      setReply(data.insight?.summary || "No insight returned.")
      if (data.guidance) {
        setReply((previous) => `${previous}\n\nSuggested next step: ${data.guidance}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <GlowCard className="p-5 sm:p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">AI guidance</p>
      <h2 className="mt-4 text-lg font-medium text-white">Turn the situation into clearer next steps</h2>
      <p className="mt-3 text-sm leading-7 text-white/60">
        Use this when you need help interpreting a live relationship dynamic before responding.
      </p>

      <div className="mt-6 whitespace-pre-line rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/70">
        {loading ? "Analyzing…" : reply}
      </div>

      <textarea
        className="mt-4 min-h-[140px] w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20"
        placeholder="Example: A family member keeps going quiet after conflict, and I do not know whether to reach out now or wait."
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />

      <button
        onClick={send}
        disabled={loading}
        className="mt-4 rounded-2xl bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-100 disabled:opacity-60"
      >
        {loading ? "Analyzing..." : "Analyze situation"}
      </button>
    </GlowCard>
  )
}
