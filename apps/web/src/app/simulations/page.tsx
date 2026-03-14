import AppShell from "@/components/layout/AppShell"
import InfoCard from "@/components/ui/InfoCard"
import SimulationPanel from "@/components/sim/SimulationPanel"

export default function SimulationsPage() {
  return (
    <AppShell>
      <div className="animate-[page-enter_0.5s_ease_both] space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Simulations</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">Use scenario testing to compare possible approaches before the next conversation happens.</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
          <InfoCard eyebrow="Purpose" title="Prepare before acting" body="Simulations help you compare options when you are deciding how to respond inside a live relationship pattern." />
          <InfoCard eyebrow="Use" title="Test different approaches" body="Compare direct confrontation, calm boundaries, or waiting, then use the result to sharpen your judgment." />
          <InfoCard eyebrow="Outcome" title="Make the next move with more clarity" body="The goal is not certainty. The goal is a more informed, less reactive decision." />
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr] xl:gap-6">
          <div className="glass-surface-light p-5 sm:p-6">
            <SimulationPanel />
          </div>

          <div className="glass-surface-light p-5 sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">How to use this</p>
            <h3 className="mt-4 text-lg font-medium text-[var(--text-primary)]">Use simulations as preparation, not prediction.</h3>
            <p className="mt-4 font-serif-accent text-sm leading-7 text-[var(--text-secondary)]">
              This page helps you think through likely outcomes so your next step is more intentional, measured, and aligned with what the platform is showing.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
