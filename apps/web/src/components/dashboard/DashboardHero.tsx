import { Panel } from "@/components/ui/Panel";

export default function DashboardHero() {
  return (
    <Panel className="overflow-hidden p-5 sm:p-6 lg:p-8">
      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#EAEAEA]/45">Dashboard</p>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[#EAEAEA] sm:text-3xl">
            Your relationship system, organized in one place.
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#9A9A9A]">
            Review the people involved, the events shaping the pattern, and the likely outcomes before deciding what to do next.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#1F1F1F] bg-[#0A0A0A] px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-[#EAEAEA]/40">Mapped</p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-[#EAEAEA]">Relationships</p>
            </div>
            <div className="rounded-2xl border border-[#1F1F1F] bg-[#0A0A0A] px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-[#EAEAEA]/40">Tracked</p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-[#EAEAEA]">Events</p>
            </div>
            <div className="rounded-2xl border border-[#1F1F1F] bg-[#0A0A0A] px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-[#EAEAEA]/40">Prepared</p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-[#EAEAEA]">Next steps</p>
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="rounded-2xl border border-[#1F1F1F] bg-[#0A0A0A] p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-[#EAEAEA]/40">What to do here</p>
            <p className="mt-2 text-sm leading-7 text-[#9A9A9A]">Start with the relationship map, then review the timeline, then test possible responses in simulations.</p>
          </div>
          <div className="rounded-2xl border border-[#1F1F1F] bg-[#0A0A0A] p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-[#EAEAEA]/40">Current use</p>
            <p className="mt-2 text-sm leading-7 text-[#9A9A9A]">This dashboard is the central workspace for understanding the system before acting inside it.</p>
          </div>
        </div>
      </div>
    </Panel>
  )
}
