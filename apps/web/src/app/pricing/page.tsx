import AppShell from "@/components/layout/AppShell"
import PricingPlans from "@/components/pricing/PricingPlans"

export default function PricingPage() {
  return (
    <AppShell>
      <div className="animate-[page-enter_0.5s_ease_both] space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-[#EAEAEA]">Pricing</h1>
          <p className="mt-1 text-sm text-[#9A9A9A]">Simple access levels for the current Defrag product.</p>
        </div>

        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-6 sm:p-8">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#555555]">Plans</p>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight text-[#EAEAEA]">
              Free to start, Core for full use, Developer / API by contact.
            </h3>
            <p className="mt-4 text-sm leading-7 text-[#9A9A9A]">
              Core is $24 per month and uses Stripe checkout. Free is limited. Developer / API is currently contact-led.
            </p>
          </div>
        </div>

        <PricingPlans />
      </div>
    </AppShell>
  )
}
