"use client"
import { Panel } from "@/components/ui/Panel";

import { useState } from "react"
import { useOnboarding } from "@/lib/store/onboarding"

export default function StepAccount() {
  const { email, password, fullName, setField, setStep } = useOnboarding()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const canContinue = email.includes("@") && password.length >= 6 && fullName.trim().length > 0

  async function handleSubmit() {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.")
        return
      }
      setStep("natal")
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Panel className="p-8 sm:p-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#EAEAEA]/45">Step 3</p>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#EAEAEA]">Create your account</h2>
      <p className="mt-3 text-sm leading-7 text-[#9A9A9A]">
        Your data stays private. You can delete everything at any time.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-[#EAEAEA]/50">Full name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setField("fullName", e.target.value)}
            placeholder="Your name"
            className="mt-2 w-full bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-2 focus:border-[#4F6BFF] focus:outline-none transition-colors text-[#EAEAEA]"
          />
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-[#EAEAEA]/50">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setField("email", e.target.value)}
            placeholder="you@email.com"
            className="mt-2 w-full bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-2 focus:border-[#4F6BFF] focus:outline-none transition-colors text-[#EAEAEA]"
          />
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-[#EAEAEA]/50">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setField("password", e.target.value)}
            placeholder="At least 6 characters"
            className="mt-2 w-full bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-2 focus:border-[#4F6BFF] focus:outline-none transition-colors text-[#EAEAEA]"
          />
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={!canContinue || loading}
        className="mt-6 w-full rounded-[8px] bg-[#EAEAEA] px-6 py-3 text-sm font-medium text-[#000000] shadow-none transition-all duration-300 hover:shadow-none disabled:opacity-30"
      >
        {loading ? "Creating account..." : "Create account"}
      </button>
    </Panel>
  )
}
