"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import AuthShell from "@/components/auth/AuthShell"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setLoading(true)
    setMessage("")

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!res.ok || data.error) {
      setMessage(data.error || "Unable to log in.")
      setLoading(false)
      return
    }

    router.push("/dashboard")
    router.refresh()
  }

  return (
    <AuthShell
      eyebrow="Login"
      title="Return to your Defrag workspace"
      body="Log in to access your dashboard, relationship maps, timeline, and AI guidance."
      footerText="Need an account?"
      footerLinkLabel="Start free trial"
      footerLinkHref="/signup"
    >
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-[12px] text-[#555555]">Email</label>
          <input
            className="bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-2 focus:border-[#4F6BFF] focus:outline-none transition-colors text-[#EAEAEA] w-full"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-[12px] text-[#555555]">Password</label>
          <input
            type="password"
            className="bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-2 focus:border-[#4F6BFF] focus:outline-none transition-colors text-[#EAEAEA] w-full"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full rounded-[8px] bg-[#EAEAEA] px-4 py-2.5 text-sm font-medium text-[#000000] shadow-none transition-colors duration-300 hover:bg-[#FFFFFF] disabled:opacity-50 text-[#000000]"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>

        {message ? <p className="text-[13px] text-red-400">{message}</p> : null}
      </div>
    </AuthShell>
  )
}
