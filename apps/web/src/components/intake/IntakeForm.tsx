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
    <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-6 sm:p-8">
      <h2 className="text-xl font-medium text-[#EAEAEA]">Complete your intake</h2>
      <p className="mt-2 text-sm leading-7 text-[#9A9A9A]">
        Add the details needed to return your information securely to the initiating dashboard.
      </p>

      <div className="mt-6 grid gap-4">
        <input
          className="bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-2 focus:border-[#4F6BFF] focus:outline-none transition-colors text-[#EAEAEA]"
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          className="bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-2 focus:border-[#4F6BFF] focus:outline-none transition-colors text-[#EAEAEA]"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        <input
          className="bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-2 focus:border-[#4F6BFF] focus:outline-none transition-colors text-[#EAEAEA]"
          type="time"
          value={birthTime}
          onChange={(e) => setBirthTime(e.target.value)}
        />
        <input
          className="bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-2 focus:border-[#4F6BFF] focus:outline-none transition-colors text-[#EAEAEA]"
          placeholder="Birth location"
          value={birthPlace}
          onChange={(e) => setBirthPlace(e.target.value)}
        />

        <button
          onClick={submit}
          disabled={submitting}
          className="rounded-[8px] bg-[#EAEAEA] px-5 py-3 text-sm font-medium text-[#000000] shadow-none transition-colors duration-300 hover:bg-[#FFFFFF] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit intake"}
        </button>

        {error ? <p className="text-sm text-[#f87171]">{error}</p> : null}
        {message ? <p className="text-sm text-[#9A9A9A]">{message}</p> : null}
      </div>
    </div>
  )
}
