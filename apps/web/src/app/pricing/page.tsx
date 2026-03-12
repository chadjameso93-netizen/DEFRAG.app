import AppShell from "@/components/layout/AppShell"
import Surface from "@/components/ui/Surface"

export default function PricingPage() {
  return (
    <AppShell title="Simple pricing" subtitle="Choose the level of depth that fits how you want to use Defrag.">
      <section className="grid gap-6 lg:grid-cols-3">
        <Surface className="p-6">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">Starter</p>
          <p className="mt-4 text-4xl font-semibold tracking-tight">Free</p>
          <p className="mt-3 text-sm leading-6 text-zinc-600">A simple entry point for exploring the product.</p>
        </Surface>
        <Surface className="border-zinc-900 bg-zinc-950 p-6 text-white">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-300">Core</p>
          <p className="mt-4 text-4xl font-semibold tracking-tight">$24/mo</p>
          <p className="mt-3 text-sm leading-6 text-zinc-300">The main plan for ongoing personal use.</p>
        </Surface>
        <Surface className="p-6">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">Practitioner</p>
          <p className="mt-4 text-4xl font-semibold tracking-tight">$99/mo</p>
          <p className="mt-3 text-sm leading-6 text-zinc-600">For coaches, facilitators, and advanced use.</p>
        </Surface>
      </section>
    </AppShell>
  )
}
