"use client"
import { Panel } from "@/components/ui/Panel";

import { useState } from "react"

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
        target_name: target,
        relationship_type: type,
      }),
    })

    const data = await res.json()
    setMessage(data?.ok ? "Relationship added. Refresh to view changes." : "Unable to add relationship.")
    setTarget("")
  }

  return (
    <Panel className="p-5 sm:p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#EAEAEA]/40">Add connection</p>
      <h3 className="mt-4 text-lg font-medium text-[#EAEAEA]">Add a person to your relationship system</h3>
      <p className="mt-3 text-sm leading-7 text-[#9A9A9A]">
        Add the people who meaningfully affect the pattern you are tracking.
      </p>

      <div className="mt-6 grid gap-3">
        <input
          className="bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-2 focus:border-[#4F6BFF] focus:outline-none transition-colors text-[#EAEAEA]"
          placeholder="Person name"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        <select
          className="bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-2 focus:border-[#4F6BFF] focus:outline-none transition-colors text-[#EAEAEA]"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="partner">Partner</option>
          <option value="parent">Parent</option>
          <option value="sibling">Sibling</option>
          <option value="friend">Friend</option>
          <option value="colleague">Colleague</option>
          <option value="child">Child</option>
          <option value="other">Other</option>
        </select>
        <button
          onClick={submit}
          className="rounded-[8px] bg-[#EAEAEA] px-5 py-3 text-sm font-medium text-[#000000] shadow-none transition-all duration-300 hover:shadow-none"
        >
          Save relationship
        </button>
        {message ? <p className="text-sm text-[#9A9A9A]">{message}</p> : null}
      </div>
    </Panel>
  )
}
