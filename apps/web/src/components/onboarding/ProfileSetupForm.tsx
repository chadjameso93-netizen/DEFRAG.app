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
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, birthDate, birthTime, birthPlace }),
      })

      const data = await res.json()

      if (!res.ok || !data?.ok) {
        setMessage("Could not save profile.")
        return
      }

      setMessage("Profile saved.")
      window.location.href = "/dashboard"
    } catch {
      setMessage("Could not save profile.")
    }
  }

  return (
    <div className="glass-surface p-6 sm:p-8">
      <h2 className="text-xl font-medium text-white">Set up your profile</h2>
      <p className="mt-2 text-sm leading-7 text-white/60">
        This creates the starting context for your dashboard and guidance layers.
      </p>

      <div className="mt-6 grid gap-4">
        <input className="glass-input" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <input className="glass-input" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        <input className="glass-input" type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} />
        <input className="glass-input" placeholder="Birth place" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} />

        <button onClick={saveProfile} className="rounded-2xl bg-[var(--text-primary)] px-5 py-3 text-sm font-medium text-[var(--surface-0)] shadow-[0_0_20px_rgba(245,245,240,0.04)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,245,240,0.08)]">
          Continue
        </button>

        {message ? <p className="text-sm text-white/60">{message}</p> : null}
      </div>
    </div>
  )
}
