import AppShell from "@/components/layout/AppShell"
import PricingPlans from "@/components/pricing/PricingPlans"
import PremiumPanel from "@/components/ui/PremiumPanel"

export default function PricingPage() {
  return (
    <AppShell
      title="Pricing"
      subtitle="Choose the level of access that fits how you want to use Defrag as a personal platform or a deeper relational tool."
    >
      <PremiumPanel className="p-6 sm:p-8">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">Plans</p>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">
            Access the platform at the level that matches your work and personal needs.
          </h3>
          <p className="mt-4 text-sm leading-7 text-white/60">
            Start with the core experience, then upgrade when you want broader relationship tracking, simulations, and more advanced support.
          </p>
        </div>
      </PremiumPanel>

      <PricingPlans />
    </AppShell>
  )
}
