import AppShell from "@/components/layout/AppShell"

export default function StatusPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-zinc-50">Platform status</h1>
          <p className="mt-1 text-sm text-zinc-400">Core product surfaces currently available in this build.</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">Frontend</p>
            <h3 className="mt-4 text-lg font-medium text-zinc-100">Ready</h3>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Landing, dashboard, relationships, timeline, simulations, pricing, settings, and legal pages are live.
            </p>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">API</p>
            <h3 className="mt-4 text-lg font-medium text-zinc-100">Configured</h3>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Auth, profile, relationships, events, insight, simulation, billing, and health endpoints are present.
            </p>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">Launch state</p>
            <h3 className="mt-4 text-lg font-medium text-zinc-100">Near-ready</h3>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              The current repo is stable for continued premium polish and production hardening.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
