"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"

export default function AIChat() {
  const [msg, setMsg] = useState("")
  const [reply, setReply] = useState("Describe a situation and Defrag will return a calm, practical interpretation.")

  async function send() {
    if (!msg.trim()) return
    setReply("Analyzing your situation...")
    try {
      const res = await fetch("/api/insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      })
      const data = await res.json()
      setReply(data.insight || "No insight returned.")
    } catch {
      setReply("The AI analysis route is not fully connected yet. The interface is ready.")
    }
  }

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-zinc-950 p-2 text-white">
          <Sparkles size={18} />
        </div>
        <div>
          <h2 className="text-lg font-medium text-zinc-950">Defrag AI</h2>
          <p className="text-sm text-zinc-600">Simple guidance for real dynamics.</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 text-zinc-700">
        {reply}
      </div>

      <textarea
        className="mt-4 min-h-[120px] w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-zinc-400"
        placeholder="Describe the relationship situation you want to understand."
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />

      <button
        onClick={send}
        className="mt-4 rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
      >
        Analyze
      </button>
    </div>
  )
}
