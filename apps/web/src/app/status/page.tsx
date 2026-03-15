import AppShell from "@/components/layout/AppShell"

export default function StatusPage() {
  return (
    <AppShell>
      <div className="animate-[page-enter_0.5s_ease_both] space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-[#EAEAEA]">Platform status</h1>
          <p className="mt-1 text-sm text-[#9A9A9A]">Core product surfaces currently available in this build.</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#555555]">Frontend</p>
            <h3 className="mt-4 text-lg font-medium text-[#EAEAEA]">Ready</h3>
            <p className="mt-3 text-sm leading-7 text-[#9A9A9A]">
              Landing, dashboard, relationships, timeline, simulations, pricing, settings, and legal pages are live.
            </p>
          </div>

          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#555555]">API</p>
            <h3 className="mt-4 text-lg font-medium text-[#EAEAEA]">Configured</h3>
            <p className="mt-3 text-sm leading-7 text-[#9A9A9A]">
              Auth, profile, relationships, events, insight, simulation, billing, and health endpoints are present.
            </p>
          </div>

          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#555555]">Launch state</p>
            <h3 className="mt-4 text-lg font-medium text-[#EAEAEA]">Near-ready</h3>
            <p className="mt-3 text-sm leading-7 text-[#9A9A9A]">
              The current repo is stable for continued premium polish and production hardening.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
