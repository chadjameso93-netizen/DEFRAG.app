"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import AppShell from "@/components/layout/AppShell"
import PremiumPanel from "@/components/ui/PremiumPanel"

export default function IntakePage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const inviteId = useMemo(() => (Array.isArray(params?.id) ? params.id[0] : params?.id), [params])

  const [name, setName] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [birthTime, setBirthTime] = useState("")
  const [birthLocation, setBirthLocation] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [loadingInvite, setLoadingInvite] = useState(true)

  useEffect(() => {
    if (!inviteId) {
      setError("Invite link is invalid.")
      setLoadingInvite(false)
      return
    }

    fetch(`/api/invites/${inviteId}`, { cache: "no-store" })
      .then(async (res) => {
        if (res.status === 404) {
          setError("Invite link was not found.")
          return
        }

        if (!res.ok) {
          setError("Invite storage is unavailable right now.")
          return
        }

        const data = await res.json()
        if (data.invite?.status === "completed") {
          router.replace("/invite/complete?status=already-complete")
          return
        }
      })
      .catch(() => setError("Unable to verify this invite right now."))
      .finally(() => setLoadingInvite(false))
  }, [inviteId, router])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!inviteId) {
      setError("Invite link is invalid.")
      return
    }

    setSaving(true)
    setError(null)

    const res = await fetch(`/api/invites/${inviteId}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, birthDate, birthTime, birthLocation }),
    })

    setSaving(false)

    if (!res.ok) {
      if (res.status === 404) {
        setError("Invite link was not found.")
      } else {
        setError("Unable to submit right now. Please try again.")
      }
      return
    }

    const data = await res.json()
    if (data.alreadyCompleted) {
      router.replace("/invite/complete?status=already-complete")
      return
    }

    router.replace("/invite/complete?status=completed")
  }

  return (
    <AppShell
      title="Intake"
      subtitle="Share basic details so the relationship profile can be linked to the invite."
    >
      <PremiumPanel className="p-6 sm:p-8">
        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm text-white/75">Name</label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="birthDate" className="text-sm text-white/75">Birth date</label>
            <input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
              className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="birthTime" className="text-sm text-white/75">Birth time</label>
            <input
              id="birthTime"
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              required
              className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="birthLocation" className="text-sm text-white/75">Birth location</label>
            <input
              id="birthLocation"
              value={birthLocation}
              onChange={(e) => setBirthLocation(e.target.value)}
              required
              className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white"
              placeholder="City, State, Country"
            />
          </div>

          {error ? <p className="text-sm text-red-300">{error}</p> : null}

          <button
            type="submit"
            disabled={saving || loadingInvite}
            className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/15 disabled:opacity-50"
          >
            {loadingInvite ? "Loading invite..." : saving ? "Submitting..." : "Complete intake"}
          </button>
        </form>
      </PremiumPanel>
    </AppShell>
  )
}
