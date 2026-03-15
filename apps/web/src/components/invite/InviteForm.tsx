"use client"
import { Panel } from "@/components/ui/Panel";

import { useState } from "react"

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
    <Panel className="p-5 sm:p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#EAEAEA]/40">Invite flow</p>
      <h3 className="mt-4 text-lg font-medium text-[#EAEAEA]">Add a person and send intake</h3>
      <p className="mt-3 text-sm leading-7 text-[#9A9A9A]">
        Use email, SMS, or a manual link so the other person can complete a simple intake page.
      </p>

      <div className="mt-6 grid gap-3">
        <input
          className="bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-2 focus:border-[#4F6BFF] focus:outline-none transition-colors text-[#EAEAEA]"
          placeholder="Person name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          className="bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-2 focus:border-[#4F6BFF] focus:outline-none transition-colors text-[#EAEAEA]"
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
        >
          <option value="personal">Personal</option>
          <option value="family">Family</option>
          <option value="team">Team</option>
        </select>
        <select
          className="bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-2 focus:border-[#4F6BFF] focus:outline-none transition-colors text-[#EAEAEA]"
          value={deliveryMethod}
          onChange={(e) => setDeliveryMethod(e.target.value as "email" | "sms" | "manual")}
        >
          <option value="email">Email invite</option>
          <option value="sms">SMS invite</option>
          <option value="manual">Manual link</option>
        </select>
        {deliveryMethod === "email" ? (
          <input
            className="bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-2 focus:border-[#4F6BFF] focus:outline-none transition-colors text-[#EAEAEA]"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        ) : null}
        {deliveryMethod === "sms" ? (
          <input
            className="bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-2 focus:border-[#4F6BFF] focus:outline-none transition-colors text-[#EAEAEA]"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        ) : null}
        <button
          type="button"
          onClick={submit}
          disabled={submitting}
          className="rounded-[8px] bg-[#EAEAEA] px-5 py-3 text-sm font-medium text-[#000000] shadow-none transition-all duration-300 hover:shadow-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Creating invite..." : "Create invite"}
        </button>
        {error ? <p className="text-sm text-[#f87171]">{error}</p> : null}
        {message ? <p className="text-sm text-[#9A9A9A]">{message}</p> : null}
      </div>
    </Panel>
  )
}
