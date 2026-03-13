"use client"

import { useState } from "react"

export default function IntakeForm({ inviteId, inviteName }: { inviteId: string; inviteName: string }) {
  const [fullName, setFullName] = useState(inviteName)
  const [birthDate, setBirthDate] = useState("")
  const [birthTime, setBirthTime] = useState("")
  const [birthPlace, setBirthPlace] = useState("")
  const [message, setMessage] = useState("")

  async function submit() {
    setMessage("Saving...")
    const res = await fetch(`/api/invites/${inviteId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, birthDate, birthTime, birthPlace }),
    })

    const data = await res.json()
    if (!res.ok || !data?.ok) {
      setMessage("Unable to submit intake.")
      return
    }

    setMessage("Intake submitted. You can close this page.")
  }

  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8">
      <h2 className="text-xl font-medium text-white">Complete your intake</h2>
      <p className="mt-2 text-sm leading-7 text-white/60">
        Add the details needed to return your information securely to the initiating dashboard.
      </p>

      <div className="mt-6 grid gap-4">
        <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20" type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} />
        <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20" placeholder="Birth location" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} />

        <button onClick={submit} className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-[#f3ece3]">
          Submit intake
        </button>

        {message ? <p className="text-sm text-white/65">{message}</p> : null}
      </div>
    </div>
  )
}
