import AppShell from "@/components/layout/AppShell"
import PricingPlans from "@/components/pricing/PricingPlans"
import PremiumPanel from "@/components/ui/PremiumPanel"

export default function PricingPage() {
  return (
    <AppShell
      title="Simple pricing"
      subtitle="Choose the level of depth that fits how you want to use Defrag."
    >
      <PremiumPanel className="p-6 sm:p-8">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Plans</p>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950">Premium access designed for personal and professional use.</h3>
          <p className="mt-4 text-sm leading-7 text-zinc-600">
            Start simple, then upgrade when you want deeper insight, simulations, and broader relationship tracking.
          </p>
        </div>
      </PremiumPanel>

      <PricingPlans />
    </AppShell>
  )
}
