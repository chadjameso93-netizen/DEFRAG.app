"use client"

import { useState } from "react"
import AuthShell from "@/components/auth/AuthShell"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setLoading(true)
    setMessage("")

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })

    const data = await res.json()

    if (!res.ok || data.error) {
      setMessage(data.error || "Unable to send magic link.")
      setLoading(false)
      return
    }

    setMessage("Check your email for a secure sign-in link.")
    setLoading(false)
  }

  return (
    <AuthShell
      eyebrow="Login"
      title="Return to your Defrag workspace"
      body="Get a secure link to access your dashboard, relationship maps, timeline, simulations, and AI guidance."
      footerText="Need an account?"
      footerLinkLabel="Start free trial"
      footerLinkHref="/signup"
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-white">Email</label>
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full rounded-2xl bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Sending link..." : "Send magic link"}
        </button>

        {message ? <p className="text-sm text-white/70">{message}</p> : null}
      </div>
    </AuthShell>
  )
}
