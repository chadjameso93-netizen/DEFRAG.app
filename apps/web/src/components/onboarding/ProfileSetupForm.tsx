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
      <h2 className="text-xl font-medium text-[#EAEAEA]">Set up your profile</h2>
      <p className="mt-2 text-sm leading-7 text-[#9A9A9A]">
        This creates the starting context for your dashboard and guidance layers.
      </p>

      <div className="mt-6 grid gap-4">
        <input className="bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-2 focus:border-[#4F6BFF] focus:outline-none transition-colors text-[#EAEAEA]" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <input className="bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-2 focus:border-[#4F6BFF] focus:outline-none transition-colors text-[#EAEAEA]" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        <input className="bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-2 focus:border-[#4F6BFF] focus:outline-none transition-colors text-[#EAEAEA]" type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} />
        <input className="bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-2 focus:border-[#4F6BFF] focus:outline-none transition-colors text-[#EAEAEA]" placeholder="Birth place" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} />

        <button onClick={saveProfile} className="rounded-[8px] bg-[#EAEAEA] px-5 py-3 text-sm font-medium text-[#000000] shadow-none transition-all duration-300 hover:shadow-none">
          Continue
        </button>

        {message ? <p className="text-sm text-[#9A9A9A]">{message}</p> : null}
      </div>
    </div>
  )
}
