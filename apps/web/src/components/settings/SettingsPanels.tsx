"use client"

import PremiumPanel from "@/components/ui/PremiumPanel"

export default function SettingsPanels() {
  return (
    <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
      <PremiumPanel className="p-6">
        <h3 className="text-lg font-medium text-white">Account</h3>
        <p className="mt-2 text-sm leading-7 text-white/60">Manage email, password recovery, and account access.</p>
        <div className="mt-6 grid gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">Email notifications</div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">Password reset</div>
        </div>
      </PremiumPanel>

      <PremiumPanel className="p-6">
        <h3 className="text-lg font-medium text-white">Subscription</h3>
        <p className="mt-2 text-sm leading-7 text-white/60">View current plan and future billing actions.</p>
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Current plan</p>
          <p className="mt-2 text-lg font-medium text-white">Core Trial</p>
          <p className="mt-2 text-sm text-white/60">Billing activates after the trial period unless canceled.</p>
        </div>
      </PremiumPanel>
    </div>
  )
}
