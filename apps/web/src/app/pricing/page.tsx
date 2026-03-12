import AppShell from "@/components/layout/AppShell"
import PricingCard from "@/components/pricing/PricingCard"

export default function PricingPage() {
  return (
    <AppShell title="Simple pricing" subtitle="Start with a free trial and upgrade when you are ready for deeper insight.">
      <section className="grid gap-6 lg:grid-cols-3">
        <PricingCard name="Starter" price="Free" description="A simple entry point for exploring Defrag." features={["Basic dashboard access", "Limited daily insight", "Simple relationship map"]} />
        <PricingCard name="Core" price="$24/mo" description="The main plan for personal use and steady insight." features={["Full dashboard", "Simulation tools", "Expanded system mapping", "Priority AI insight"]} featured />
        <PricingCard name="Practitioner" price="$99/mo" description="For coaches, facilitators, and professional use." features={["Multiple profiles", "Expanded reporting", "Longitudinal tracking", "Advanced workflow support"]} />
      </section>
    </AppShell>
  )
}
