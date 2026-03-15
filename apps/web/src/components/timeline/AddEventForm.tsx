"use client"
import { useState } from "react"

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
    <div className="glass-surface p-5 sm:p-6">
      <p className="typo-label text-[10px]">Add timeline event</p>
      <h3 className="mt-4 text-lg font-medium text-[#EAEAEA]">Capture the moment that changed the pattern</h3>
      <p className="mt-3 text-sm leading-7 text-[#9A9A9A]">
        Log conflict, repair, stress, or observations so the larger sequence becomes easier to read.
      </p>

      <div className="mt-6 grid gap-3">
        <select
          className="bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-2 focus:border-[#4F6BFF] focus:outline-none transition-colors text-[#EAEAEA] px-4 py-3 text-sm text-[#EAEAEA]"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        >
          <option value="observation">Observation</option>
          <option value="conflict">Conflict</option>
          <option value="repair">Repair</option>
          <option value="stress">Stress</option>
        </select>
        <input
          className="bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-2 focus:border-[#4F6BFF] focus:outline-none transition-colors text-[#EAEAEA] px-4 py-3 text-sm text-[#EAEAEA] placeholder:text-[var(--text-tertiary)]"
          placeholder="Target"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        <textarea
          className="bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-2 focus:border-[#4F6BFF] focus:outline-none transition-colors text-[#EAEAEA] min-h-[120px] px-4 py-3 text-sm text-[#EAEAEA] placeholder:text-[var(--text-tertiary)]"
          placeholder="Describe what happened"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button
          onClick={submit}
          className="rounded-[8px] bg-[#EAEAEA] px-5 py-3 text-sm font-medium text-[#000000] shadow-[0_10px_40px_rgba(0,0,0,0.7)] transition-all duration-300 hover:shadow-[0_14px_50px_rgba(0,0,0,0.8)]"
        >
          Save event
        </button>
        {message ? <p className="text-sm text-[#9A9A9A]">{message}</p> : null}
      </div>
    </div>
  )
}
