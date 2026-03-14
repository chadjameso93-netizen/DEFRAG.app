"use client"

import { useState } from "react"

export default function AIChat() {
  const [msg, setMsg] = useState("")
  const [reply, setReply] = useState(
    "Describe a relationship situation, and Defrag will return structured guidance based on the pattern you describe."
  )
  const [loading, setLoading] = useState(false)

  async function send() {
    if (!msg.trim()) return
    setLoading(true)

    try {
      const res = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      })
      const data = await res.json()
      if (data.error) {
        setReply(data.error)
      } else {
        setReply(data.output_text || "No insight returned.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass-surface p-5 sm:p-6">
      <p className="typo-label text-[10px]">AI guidance</p>
      <h2 className="mt-4 text-lg font-medium text-[var(--text-primary)]">Turn the situation into clearer next steps</h2>
      <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
        Use this when you need help interpreting a live relationship dynamic before responding.
      </p>

      {/* Assistant reply — glass bubble */}
      <div className="glass-surface-light mt-6 whitespace-pre-line p-4 text-sm leading-7 text-[var(--text-secondary)]">
        {loading ? "Analyzing..." : reply}
      </div>

      {/* User input — glass input */}
      <textarea
        className="glass-input mt-4 min-h-[140px] w-full px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]"
        placeholder="Example: A family member keeps going quiet after conflict, and I do not know whether to reach out now or wait."
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />

      <button
        onClick={send}
        disabled={loading}
        className="mt-4 rounded-2xl bg-[var(--text-primary)] px-5 py-3 text-sm font-medium text-[var(--surface-0)] shadow-[0_10px_40px_rgba(0,0,0,0.7)] transition-all duration-300 hover:shadow-[0_14px_50px_rgba(0,0,0,0.8)] disabled:opacity-60"
      >
        {loading ? "Analyzing..." : "Analyze situation"}
      </button>
    </div>
  )
}
