"use client"

import { useState } from "react"
import AppShell from "@/components/layout/AppShell"
import FlowIntro from "@/components/flow/FlowIntro"
import AuthCard from "@/components/auth/AuthCard"
import { supabase } from "@/lib/supabase"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  async function handleSignup() {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setMessage(error.message)
      return
    }
    setMessage("Account created. Continue to onboarding.")
    setTimeout(() => {
      window.location.href = "/onboarding"
    }, 700)
  }

  return (
    <AppShell title="Create your account" subtitle="Start your Defrag workspace with a simple account setup.">
      <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <FlowIntro eyebrow="Start" title="Begin with a calm, simple setup" body="Create your account first. Then Defrag will guide you through a short onboarding flow." />
        <AuthCard>
          <h2 className="text-xl font-medium text-zinc-950">Start free trial</h2>
          <p className="mt-2 text-sm text-zinc-600">Create an account to begin your setup.</p>
          <div className="mt-6 space-y-4">
            <input className="w-full rounded-2xl border border-zinc-200 px-4 py-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="w-full rounded-2xl border border-zinc-200 px-4 py-3" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignup} className="w-full rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800">
              Create account
            </button>
            <p className="text-sm text-zinc-600">{message}</p>
          </div>
        </AuthCard>
      </div>
    </AppShell>
  )
}
