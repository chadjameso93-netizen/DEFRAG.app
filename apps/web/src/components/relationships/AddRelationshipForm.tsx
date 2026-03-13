"use client"

import { useState } from "react"
import PremiumPanel from "@/components/ui/PremiumPanel"

export default function AddRelationshipForm() {
  const [target, setTarget] = useState("")
  const [type, setType] = useState("personal")
  const [message, setMessage] = useState("")

  async function submit() {
    if (!target.trim()) return

    const res = await fetch("/api/relationships", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sourceName: "You",
        targetName: target,
        relationshipType: type,
        tensionScore: 0.35,
        trustScore: 0.5,
      }),
    })

    const data = await res.json()
    setMessage(data?.ok ? "Relationship added. Refresh to view changes." : "Unable to add relationship.")
    setTarget("")
  }

  return (
    <PremiumPanel className="p-5 sm:p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Add connection</p>
      <h3 className="mt-4 text-lg font-medium text-white">Add a person to your relationship system</h3>
      <p className="mt-3 text-sm leading-7 text-white/60">
        Add the people who meaningfully affect the pattern you are tracking.
      </p>

      <div className="mt-6 grid gap-3">
        <input
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20"
          placeholder="Person name"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        <select
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="personal">Personal</option>
          <option value="family">Family</option>
          <option value="team">Team</option>
        </select>
        <button
          onClick={submit}
          className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-100"
        >
          Save relationship
        </button>
        {message ? <p className="text-sm text-white/60">{message}</p> : null}
      </div>
    </PremiumPanel>
  )
}
