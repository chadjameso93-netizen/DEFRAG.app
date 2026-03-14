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

    setMessage("Account created. Redirecting to onboarding...")
    setTimeout(() => {
      router.push("/onboarding")
      router.refresh()
    }, 700)
  }

  return (
    <AuthShell
      eyebrow="Sign up"
      title="Create your account and begin building your relationship system"
      body="Start your Defrag workspace, complete onboarding, and unlock your dashboard, timelines, and guidance tools."
      footerText="Already have an account?"
      footerLinkLabel="Log in"
      footerLinkHref="/login"
    >
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-[12px] text-[var(--text-muted)]">Email</label>
          <input
            className="glass-input w-full"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-[12px] text-[var(--text-muted)]">Password</label>
          <input
            type="password"
            className="glass-input w-full"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full rounded-2xl bg-[var(--text-primary)] px-4 py-2.5 text-sm font-medium text-[var(--surface-0)] shadow-[0_0_20px_rgba(245,245,240,0.04)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,245,240,0.08)] disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>

        {message ? <p className="text-[13px] text-[var(--text-secondary)]">{message}</p> : null}
      </div>
    </AuthShell>
  )
}
