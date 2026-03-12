"use client"

import { useState } from "react"

export default function ProfileSetupForm() {
  const [fullName, setFullName] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [birthTime, setBirthTime] = useState("")
  const [birthPlace, setBirthPlace] = useState("")
  const [message, setMessage] = useState("")

  async function saveProfile() {
    setMessage("Saving...")

    try {
      await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, birthDate, birthTime, birthPlace }),
      })

      setMessage("Profile saved.")
      window.location.href = "/dashboard"
    } catch {
      setMessage("Could not save profile.")
    }
  }

  return (
    <div className="rounded-[28px] border border-white/60 bg-white/80 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl">
      <h2 className="text-xl font-medium text-zinc-950">Set up your profile</h2>
      <p className="mt-2 text-sm leading-6 text-zinc-600">
        Birth details are used to build optional timing layers and improve personal insight.
      </p>

      <div className="mt-6 grid gap-4">
        <input className="rounded-2xl border border-zinc-200 px-4 py-3" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <input className="rounded-2xl border border-zinc-200 px-4 py-3" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        <input className="rounded-2xl border border-zinc-200 px-4 py-3" type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} />
        <input className="rounded-2xl border border-zinc-200 px-4 py-3" placeholder="Birth place" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} />
        <button onClick={saveProfile} className="rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800">
          Continue
        </button>
        {message ? <p className="text-sm text-zinc-600">{message}</p> : null}
      </div>
    </div>
  )
}
