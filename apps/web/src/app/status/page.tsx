import AppShell from "@/components/layout/AppShell"

export default function StatusPage() {
  return (
    <AppShell>
      <div className="animate-[page-enter_0.5s_ease_both] space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Platform status</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">Core product surfaces currently available in this build.</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
          <div className="glass-surface-light p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">Frontend</p>
            <h3 className="mt-4 text-lg font-medium text-[var(--text-primary)]">Ready</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              Landing, dashboard, relationships, timeline, simulations, pricing, settings, and legal pages are live.
            </p>
          </div>

          <div className="glass-surface-light p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">API</p>
            <h3 className="mt-4 text-lg font-medium text-[var(--text-primary)]">Configured</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              Auth, profile, relationships, events, insight, simulation, billing, and health endpoints are present.
            </p>
          </div>

          <div className="glass-surface-light p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">Launch state</p>
            <h3 className="mt-4 text-lg font-medium text-[var(--text-primary)]">Near-ready</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              The current repo is stable for continued premium polish and production hardening.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
