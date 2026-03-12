import AppShell from "@/components/layout/AppShell"
import PremiumPanel from "@/components/ui/PremiumPanel"
import InfoCard from "@/components/ui/InfoCard"
import SimulationPanel from "@/components/sim/SimulationPanel"

export default function SimulationsPage() {
  return (
    <AppShell
      title="Simulations"
      subtitle="Use scenario testing to compare possible approaches before the next conversation happens."
    >
      <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
        <InfoCard eyebrow="Purpose" title="Prepare before acting" body="Simulations help you compare options when you are deciding how to respond inside a live relationship pattern." />
        <InfoCard eyebrow="Use" title="Test different approaches" body="Compare direct confrontation, calm boundaries, or waiting, then use the result to sharpen your judgment." />
        <InfoCard eyebrow="Outcome" title="Make the next move with more clarity" body="The goal is not certainty. The goal is a more informed, less reactive decision." />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr] xl:gap-6">
        <PremiumPanel className="p-5 sm:p-6">
          <SimulationPanel />
        </PremiumPanel>

        <PremiumPanel className="p-5 sm:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">How to use this</p>
          <h3 className="mt-4 text-lg font-medium text-white">Use simulations as preparation, not prediction.</h3>
          <p className="mt-4 text-sm leading-7 text-white/60">
            This page helps you think through likely outcomes so your next step is more intentional, measured, and aligned with what the platform is showing.
          </p>
        </PremiumPanel>
      </div>
    </AppShell>
  )
}
