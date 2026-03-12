import AppShell from "@/components/layout/AppShell"
import PremiumPanel from "@/components/ui/PremiumPanel"
import SimulationPanel from "@/components/sim/SimulationPanel"

export default function SimulationsPage() {
  return (
    <AppShell
      title="Simulations"
      subtitle="Compare possible approaches before you act, so your next move is more intentional and informed."
    >
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr] xl:gap-6">
        <PremiumPanel className="p-5 sm:p-6">
          <SimulationPanel />
        </PremiumPanel>

        <PremiumPanel className="p-5 sm:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">How to use this</p>
          <h3 className="mt-4 text-lg font-medium text-white">Test likely outcomes before the conversation happens.</h3>
          <p className="mt-4 text-sm leading-7 text-white/60">
            Simulations help you compare direct confrontation, calm boundaries, or waiting. The goal is not certainty. The goal is better preparation.
          </p>
        </PremiumPanel>
      </div>
    </AppShell>
  )
}
