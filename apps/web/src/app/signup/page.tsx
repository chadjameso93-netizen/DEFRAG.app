"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AuthShell from "@/components/auth/AuthShell"

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSignup() {
    setLoading(true)
    setMessage("")

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!res.ok || data.error) {
      setMessage(data.error || "Unable to create account.")
      setLoading(false)
      return
    }

    setMessage("Account created. Continue to onboarding.")
    setTimeout(() => {
      router.push("/onboarding")
      router.refresh()
    }, 700)
  }

  return (
    <AuthShell
      eyebrow="Signup"
      title="Create your account and begin building your relationship system"
      body="Start your Defrag workspace, complete onboarding, and unlock your dashboard, timelines, simulations, and guidance tools."
      footerText="Already have an account?"
      footerLinkLabel="Log in"
      footerLinkHref="/login"
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

        <div>
          <label className="mb-2 block text-sm font-medium text-white">Password</label>
          <input
            type="password"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full rounded-2xl bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>

        {message ? <p className="text-sm text-white/60">{message}</p> : null}
      </div>
    </AuthShell>
  )
}
