"use client"

import { useState } from "react"
import PremiumPanel from "@/components/ui/PremiumPanel"

export default function AddEventForm() {
  const [eventType, setEventType] = useState("observation")
  const [target, setTarget] = useState("")
  const [notes, setNotes] = useState("")
  const [message, setMessage] = useState("")

  async function submit() {
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_type: eventType,
        actor: "You",
        target: target || "Other",
        severity: 0.4,
        notes: notes || "No notes provided.",
      }),
    })

    const data = await res.json()
    setMessage(data?.ok ? "Event added. Refresh to view changes." : "Unable to add event.")
    setNotes("")
    setTarget("")
  }

  return (
    <PremiumPanel className="p-5 sm:p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Add timeline event</p>
      <h3 className="mt-4 text-lg font-medium text-white">Capture the moment that changed the pattern</h3>
      <p className="mt-3 text-sm leading-7 text-white/60">
        Log conflict, repair, stress, or observations so the larger sequence becomes easier to read.
      </p>

      <div className="mt-6 grid gap-3">
        <select
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        >
          <option value="observation">Observation</option>
          <option value="conflict">Conflict</option>
          <option value="repair">Repair</option>
          <option value="stress">Stress</option>
        </select>
        <input
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20"
          placeholder="Target"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        <textarea
          className="min-h-[120px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20"
          placeholder="Describe what happened"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button
          onClick={submit}
          className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-100"
        >
          Save event
        </button>
        {message ? <p className="text-sm text-white/60">{message}</p> : null}
      </div>
    </PremiumPanel>
  )
}
