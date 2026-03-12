import AppShell from "@/components/layout/AppShell"
import GlowCard from "@/components/ui/GlowCard"

export default function StatusPage() {
  return (
    <AppShell
      title="Platform status"
      subtitle="Core product surfaces currently available in this build."
    >
      <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
        <GlowCard className="p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Frontend</p>
          <h3 className="mt-4 text-lg font-medium text-white">Ready</h3>
          <p className="mt-3 text-sm leading-7 text-white/60">
            Landing, dashboard, relationships, timeline, simulations, pricing, settings, and legal pages are live.
          </p>
        </GlowCard>

        <GlowCard className="p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">API</p>
          <h3 className="mt-4 text-lg font-medium text-white">Configured</h3>
          <p className="mt-3 text-sm leading-7 text-white/60">
            Auth, profile, relationships, events, insight, simulation, billing, and health endpoints are present.
          </p>
        </GlowCard>

        <GlowCard className="p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Launch state</p>
          <h3 className="mt-4 text-lg font-medium text-white">Near-ready</h3>
          <p className="mt-3 text-sm leading-7 text-white/60">
            The current repo is stable for continued premium polish and production hardening.
          </p>
        </GlowCard>
      </div>
    </AppShell>
  )
}
