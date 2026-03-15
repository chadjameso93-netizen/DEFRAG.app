"use client"
import { Panel } from "@/components/ui/Panel";

import { useState } from "react"

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
      <Panel className="p-6">
        <h3 className="text-lg font-medium text-[#EAEAEA]">Account</h3>
        <p className="mt-2 text-sm leading-7 text-[#9A9A9A]">Manage email, access, and future authentication controls.</p>
        <div className="mt-6 grid gap-3">
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-4 text-sm text-[#EAEAEA]/70">Email notifications</div>
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-4 text-sm text-[#EAEAEA]/70">Password reset</div>
        </div>
      </Panel>

      <Panel className="p-6">
        <h3 className="text-lg font-medium text-[#EAEAEA]">Subscription</h3>
        <p className="mt-2 text-sm leading-7 text-[#9A9A9A]">Review the current plan and manage billing.</p>
        <div className="mt-6 bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-[#EAEAEA]/40">Current plan</p>
          <p className="mt-2 text-lg font-medium text-[#EAEAEA]">Free</p>
          <p className="mt-2 text-sm text-[#9A9A9A]">5 insights per month, 2 relationships. Upgrade for full access.</p>
        </div>
        <button
          onClick={openBillingPortal}
          disabled={portalLoading}
          className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-[#EAEAEA] transition hover:bg-[#1F1F1F] disabled:opacity-50"
        >
          {portalLoading ? "Opening..." : "Manage billing"}
        </button>
      </Panel>

      <Panel className="p-6">
        <h3 className="text-lg font-medium text-[#EAEAEA]">Privacy</h3>
        <p className="mt-2 text-sm leading-7 text-[#9A9A9A]">Your data is encrypted at rest and never shared. Only you can access your relationship data.</p>
        <div className="mt-6 grid gap-3">
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-4 text-sm text-[#EAEAEA]/70">Data is encrypted at rest</div>
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-4 text-sm text-[#EAEAEA]/70">No third-party data sharing</div>
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-4 text-sm text-[#EAEAEA]/70">Export or delete your data anytime</div>
        </div>
      </Panel>

      <Panel className="p-6">
        <h3 className="text-lg font-medium text-[#EAEAEA]">Danger zone</h3>
        <p className="mt-2 text-sm leading-7 text-[#9A9A9A]">Permanent actions that affect your account and all stored data.</p>
        <div className="mt-6">
          <button className="rounded-2xl border border-[#f87171]/20 bg-red-500/5 px-5 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10">
            Delete account
          </button>
        </div>
      </Panel>
    </div>
  )
}
