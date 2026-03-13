import AppShell from "@/components/layout/AppShell"
import PricingPlans from "@/components/pricing/PricingPlans"
import PremiumPanel from "@/components/ui/PremiumPanel"

export default function PricingPage() {
  return (
    <AppShell title="Pricing" subtitle="Simple pricing for the real product.">
      <PremiumPanel className="p-6 sm:p-8">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">Plans</p>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">
            Start free. Move to Core when you want full clarity.
          </h3>
          <p className="mt-4 text-sm leading-7 text-white/60">
            Core gives you the full dashboard, relational display, timeline guidance, and strategic advisor.
          </p>
        </div>
      </PremiumPanel>

      <PricingPlans />
    </AppShell>
  )
}
