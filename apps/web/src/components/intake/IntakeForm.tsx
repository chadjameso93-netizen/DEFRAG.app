"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function IntakeForm({ inviteId, inviteName }: { inviteId: string; inviteName: string }) {
  const router = useRouter()
  const [fullName, setFullName] = useState(inviteName)
  const [birthDate, setBirthDate] = useState("")
  const [birthTime, setBirthTime] = useState("")
  const [birthPlace, setBirthPlace] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  async function submit() {
    if (submitting) return

    setMessage("")
    setError("")

    if (!fullName.trim() || !birthDate || !birthTime || !birthPlace.trim()) {
      setError("Complete all fields before submitting.")
      return
    }

    setSubmitting(true)
    setMessage("Saving...")

    try {
      const res = await fetch(`/api/invites/${inviteId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, birthDate, birthTime, birthPlace }),
      })

      const data = await res.json()
      if (!res.ok || !data?.ok) {
        setMessage("")
        setError(data?.error || "Unable to submit intake.")
        return
      }

      if (data.alreadyCompleted) {
        setMessage("This intake was already completed. Redirecting to completion page...")
      }

      router.push(`/invite/complete?name=${encodeURIComponent(fullName || inviteName)}`)
    } catch {
      setMessage("")
      setError("Network issue. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="glass-surface p-6 sm:p-8">
      <h2 className="text-xl font-medium text-white">Complete your intake</h2>
      <p className="mt-2 text-sm leading-7 text-white/60">
        Add the details needed to return your information securely to the initiating dashboard.
      </p>

      <div className="mt-6 grid gap-4">
        <input
          className="glass-input"
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          className="glass-input"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        <input
          className="glass-input"
          type="time"
          value={birthTime}
          onChange={(e) => setBirthTime(e.target.value)}
        />
        <input
          className="glass-input"
          placeholder="Birth location"
          value={birthPlace}
          onChange={(e) => setBirthPlace(e.target.value)}
        />

        <button
          onClick={submit}
          disabled={submitting}
          className="rounded-2xl bg-[var(--text-primary)] px-5 py-3 text-sm font-medium text-[var(--surface-0)] shadow-[0_0_20px_rgba(245,245,240,0.04)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,245,240,0.08)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit intake"}
        </button>

        {error ? <p className="text-sm text-rose-300">{error}</p> : null}
        {message ? <p className="text-sm text-white/65">{message}</p> : null}
      </div>
    </div>
  )
}
