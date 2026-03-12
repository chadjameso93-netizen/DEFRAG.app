"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AuthShell from "@/components/auth/AuthShell"
import { supabase } from "@/lib/supabase"

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSignup() {
    setLoading(true)
    setMessage("")

    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setMessage(error.message)
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
      title="Start with a calm, simple setup"
      body="Create your account first. Then Defrag will guide you through a short onboarding flow."
      footerText="Already have an account?"
      footerLinkLabel="Log in"
      footerLinkHref="/login"
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-900">Email</label>
          <input
            className="w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-zinc-400"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-900">Password</label>
          <input
            type="password"
            className="w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-zinc-400"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>

        {message ? <p className="text-sm text-zinc-600">{message}</p> : null}
      </div>
    </AuthShell>
  )
}
