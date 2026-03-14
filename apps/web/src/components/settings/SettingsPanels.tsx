"use client"

import { useState } from "react"
import GlowCard from "@/components/ui/GlowCard"

export default function SettingsPanels() {
  const [portalLoading, setPortalLoading] = useState(false)

  async function openBillingPortal() {
    setPortalLoading(true)
    try {
      const res = await fetch("/api/billing/portal", { method: "POST" })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } finally {
      setPortalLoading(false)
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
      <GlowCard className="p-6">
        <h3 className="text-lg font-medium text-white">Account</h3>
        <p className="mt-2 text-sm leading-7 text-white/60">Manage email, access, and future authentication controls.</p>
        <div className="mt-6 grid gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">Email notifications</div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">Password reset</div>
        </div>
      </GlowCard>

      <GlowCard className="p-6">
        <h3 className="text-lg font-medium text-white">Subscription</h3>
        <p className="mt-2 text-sm leading-7 text-white/60">Review the current plan and manage billing.</p>
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Current plan</p>
          <p className="mt-2 text-lg font-medium text-white">Free</p>
          <p className="mt-2 text-sm text-white/60">5 insights per month, 2 relationships. Upgrade for full access.</p>
        </div>
        <button
          onClick={openBillingPortal}
          disabled={portalLoading}
          className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10 disabled:opacity-50"
        >
          {portalLoading ? "Opening..." : "Manage billing"}
        </button>
      </GlowCard>

      <GlowCard className="p-6">
        <h3 className="text-lg font-medium text-white">Privacy</h3>
        <p className="mt-2 text-sm leading-7 text-white/60">Your data is encrypted at rest and never shared. Only you can access your relationship data.</p>
        <div className="mt-6 grid gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">Data is encrypted at rest</div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">No third-party data sharing</div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">Export or delete your data anytime</div>
        </div>
      </GlowCard>

      <GlowCard className="p-6">
        <h3 className="text-lg font-medium text-white">Danger zone</h3>
        <p className="mt-2 text-sm leading-7 text-white/60">Permanent actions that affect your account and all stored data.</p>
        <div className="mt-6">
          <button className="rounded-2xl border border-red-500/20 bg-red-500/5 px-5 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10">
            Delete account
          </button>
        </div>
      </GlowCard>
    </div>
  )
}
