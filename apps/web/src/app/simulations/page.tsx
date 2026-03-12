import AppShell from "@/components/layout/AppShell"
import SimulationPanel from "@/components/sim/SimulationPanel"

export default function SimulationsPage() {
  return (
    <AppShell title="Simulations" subtitle="Explore likely outcomes before acting.">
      <div className="max-w-3xl rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"><SimulationPanel /></div>
    </AppShell>
  )
}
