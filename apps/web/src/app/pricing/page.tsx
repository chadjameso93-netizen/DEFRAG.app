import AppShell from "@/components/layout/AppShell"
import PricingPlans from "@/components/pricing/PricingPlans"
import PremiumPanel from "@/components/ui/PremiumPanel"

export default function PricingPage() {
  return (
    <AppShell
      title="Pricing"
      subtitle="Simple access levels for the current Defrag product."
    >
      <PremiumPanel className="p-6 sm:p-8">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">Plans</p>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">
            Free to start, Core for full use, Developer / API by contact.
          </h3>
          <p className="mt-4 text-sm leading-7 text-white/60">
            Core is $24 per month and uses Stripe checkout. Free is limited. Developer / API is currently contact-led.
          </p>
        </div>
      </PremiumPanel>

      <PricingPlans />
    </AppShell>
  )
}
