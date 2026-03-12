import AppShell from "@/components/layout/AppShell"
import Surface from "@/components/ui/Surface"
import SimulationPanel from "@/components/sim/SimulationPanel"

export default function SimulationsPage() {
  return (
    <AppShell title="Simulations" subtitle="Preview likely outcomes before acting.">
      <Surface className="max-w-3xl p-6">
        <SimulationPanel />
      </Surface>
    </AppShell>
  )
}
