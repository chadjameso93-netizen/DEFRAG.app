import AppShell from "@/components/layout/AppShell"
import PremiumPanel from "@/components/ui/PremiumPanel"

function Plan({
  name,
  price,
  description,
  featured = false,
}: {
  name: string
  price: string
  description: string
  featured?: boolean
}) {
  return (
    <PremiumPanel className={`p-6 ${featured ? "border-zinc-900 bg-zinc-950 text-white" : ""}`}>
      <p className={`text-[11px] font-semibold uppercase tracking-[0.24em] ${featured ? "text-zinc-300" : "text-zinc-500"}`}>{name}</p>
      <p className="mt-4 text-4xl font-semibold tracking-tight">{price}</p>
      <p className={`mt-3 text-sm leading-7 ${featured ? "text-zinc-300" : "text-zinc-600"}`}>{description}</p>

      <button
        className={`mt-8 w-full rounded-2xl px-5 py-3 text-sm font-medium transition ${featured ? "bg-white text-zinc-950 hover:bg-zinc-100" : "bg-zinc-950 text-white hover:bg-zinc-800"}`}
      >
        Choose plan
      </button>
    </PremiumPanel>
  )
}

export default function PricingPage() {
  return (
    <AppShell
      title="Simple pricing"
      subtitle="Choose the level of depth that fits how you want to use Defrag."
    >
      <section className="grid gap-4 lg:grid-cols-3 lg:gap-6">
        <Plan name="Starter" price="Free" description="A simple entry point for exploring the product." />
        <Plan name="Core" price="$24/mo" description="The main plan for ongoing personal use." featured />
        <Plan name="Practitioner" price="$99/mo" description="For coaches, facilitators, and advanced use." />
      </section>
    </AppShell>
  )
}
