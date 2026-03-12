import AppShell from "@/components/layout/AppShell"
import GlowCard from "@/components/ui/GlowCard"

export default function SupportPage() {
  return (
    <AppShell
      title="Support"
      subtitle="Get help with onboarding, account access, billing, or product questions."
    >
      <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
        <GlowCard className="p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Account</p>
          <h3 className="mt-4 text-lg font-medium text-white">Access and login</h3>
          <p className="mt-3 text-sm leading-7 text-white/60">
            Use this path for login issues, account recovery, and onboarding questions.
          </p>
        </GlowCard>

        <GlowCard className="p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Billing</p>
          <h3 className="mt-4 text-lg font-medium text-white">Plans and subscriptions</h3>
          <p className="mt-3 text-sm leading-7 text-white/60">
            Use this path for checkout, plan access, renewals, or future billing controls.
          </p>
        </GlowCard>

        <GlowCard className="p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Product</p>
          <h3 className="mt-4 text-lg font-medium text-white">Using Defrag well</h3>
          <p className="mt-3 text-sm leading-7 text-white/60">
            Use this path for relationship mapping, timeline logging, simulations, and guidance questions.
          </p>
        </GlowCard>
      </div>
    </AppShell>
  )
}
