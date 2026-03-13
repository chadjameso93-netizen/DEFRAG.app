"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import AppShell from "@/components/layout/AppShell"
import PremiumPanel from "@/components/ui/PremiumPanel"

type Invite = {
  id: string
  invite_token: string
  email: string | null
  phone: string | null
  status: string
  created_at: string
}

export default function InvitePage() {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [invites, setInvites] = useState<Invite[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function loadInvites() {
    const res = await fetch("/api/invites", { cache: "no-store" })
    if (res.status === 401) {
      setError("Sign in to manage invites.")
      return
    }

    if (!res.ok) {
      setError("Invite storage is unavailable right now.")
      return
    }

    const data = await res.json()
    setInvites(data.invites ?? [])
  }

  useEffect(() => {
    loadInvites().catch(() => setError("Unable to load invites right now."))
  }, [])

  const inviteCount = useMemo(() => invites.length, [invites])

  async function onCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const payload: Record<string, string> = {}
    if (email.trim()) payload.email = email.trim()
    if (phone.trim()) payload.phone = phone.trim()

    const res = await fetch("/api/invites", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    })

    setLoading(false)

    if (!res.ok) {
      if (res.status === 401) {
        setError("Sign in before creating an invite.")
      } else if (res.status === 400) {
        setError("Enter an email or phone number.")
      } else {
        setError("Unable to create invite right now.")
      }
      return
    }

    setEmail("")
    setPhone("")
    await loadInvites()
  }

  return (
    <AppShell
      title="Invite"
      subtitle="Invite someone by email or phone and share a secure intake link."
    >
      <PremiumPanel className="p-6 sm:p-8">
        <form onSubmit={onCreate} className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm text-white/75" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white"
              placeholder="name@example.com"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm text-white/75" htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white"
              placeholder="+1 555 000 0000"
            />
          </div>

          {error ? <p className="text-sm text-red-300">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/15 disabled:opacity-50"
          >
            {loading ? "Creating invite..." : "Create invite"}
          </button>
        </form>
      </PremiumPanel>

      <PremiumPanel className="p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Active invites</h3>
          <span className="text-sm text-white/60">{inviteCount}</span>
        </div>

        <div className="mt-4 grid gap-3">
          {invites.map((invite) => (
            <div key={invite.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-white">{invite.email || invite.phone || "Invite"}</p>
              <p className="mt-1 text-xs text-white/60">Status: {invite.status}</p>
              <p className="mt-1 text-xs text-white/60">
                Intake link:{" "}
                <Link className="underline" href={`/intake/${invite.invite_token}`}>
                  /intake/{invite.invite_token}
                </Link>
              </p>
            </div>
          ))}

          {!invites.length ? <p className="text-sm text-white/60">No invites yet.</p> : null}
        </div>
      </PremiumPanel>
    </AppShell>
  )
}
