"use client"

import { useState } from "react"

export default function AIChat() {
  const [msg, setMsg] = useState("")
  const [reply, setReply] = useState("Describe a relationship situation, and Defrag will return structured guidance based on the pattern you describe.")

  async function send() {
    if (!msg.trim()) return

    const res = await fetch("/api/insight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg }),
    })

    const data = await res.json()
    setReply(data.insight || "No insight returned.")
  }

  return (
    <div>
      <h2 className="text-lg font-medium text-white">AI guidance</h2>
      <p className="mt-2 text-sm text-white/60">
        Turn a situation into clearer relational insight and a more useful next step.
      </p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-white/70">
        {reply}
      </div>

      <textarea
        className="mt-4 min-h-[120px] w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20"
        placeholder="Example: My sibling keeps going quiet after conflict, and I do not know whether to reach out now or wait."
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />

      <button
        onClick={send}
        className="mt-4 rounded-2xl bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-100"
      >
        Analyze situation
      </button>
    </div>
  )
}
