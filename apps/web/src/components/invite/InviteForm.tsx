"use client"

import { useState } from "react"
import PremiumPanel from "@/components/ui/PremiumPanel"

export default function InviteForm() {
  const [name, setName] = useState("")
  const [relationship, setRelationship] = useState("personal")
  const [deliveryMethod, setDeliveryMethod] = useState<"email" | "sms" | "manual">("email")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  async function submit() {
    if (submitting) return

    setMessage("")
    setError("")

    if (!name.trim()) {
      setError("Add a name before creating the invite.")
      return
    }

    if (deliveryMethod === "email" && !email.trim()) {
      setError("Add an email address for this invite.")
      return
    }

    if (deliveryMethod === "sms" && !phone.trim()) {
      setError("Add a phone number for this invite.")
      return
    }

    setSubmitting(true)

    try {
      const res = await fetch("/api/invites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          relationship,
          deliveryMethod,
          email: deliveryMethod === "email" ? email : undefined,
          phone: deliveryMethod === "sms" ? phone : undefined,
        }),
      })

      const data = await res.json()
      if (!res.ok || !data?.ok) {
        setError(data?.error || "Invite could not be created.")
        return
      }

      const invitePath = `/intake/${data.invite.id}`
      const routeMessage =
        deliveryMethod === "manual"
          ? `Invite created. Share ${window.location.origin}${invitePath}`
          : `Invite created. Intake route: ${invitePath}`

      setMessage(routeMessage)
      setName("")
      setEmail("")
      setPhone("")
    } catch {
      setError("Network issue. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PremiumPanel className="p-5 sm:p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Invite flow</p>
      <h3 className="mt-4 text-lg font-medium text-white">Add a person and send intake</h3>
      <p className="mt-3 text-sm leading-7 text-white/60">
        Use email, SMS, or a manual link so the other person can complete a simple intake page.
      </p>

      <div className="mt-6 grid gap-3">
        <input
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20"
          placeholder="Person name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20"
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
        >
          <option value="personal">Personal</option>
          <option value="family">Family</option>
          <option value="team">Team</option>
        </select>
        <select
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20"
          value={deliveryMethod}
          onChange={(e) => setDeliveryMethod(e.target.value as "email" | "sms" | "manual")}
        >
          <option value="email">Email invite</option>
          <option value="sms">SMS invite</option>
          <option value="manual">Manual link</option>
        </select>
        {deliveryMethod === "email" ? (
          <input
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        ) : null}
        {deliveryMethod === "sms" ? (
          <input
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        ) : null}
        <button
          type="button"
          onClick={submit}
          disabled={submitting}
          className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-[#f3ece3] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Creating invite..." : "Create invite"}
        </button>
        {error ? <p className="text-sm text-rose-300">{error}</p> : null}
        {message ? <p className="text-sm text-white/65">{message}</p> : null}
      </div>
    </PremiumPanel>
  )
}
