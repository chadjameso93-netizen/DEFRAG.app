import PremiumPanel from "@/components/ui/PremiumPanel"

export default function DashboardHero() {
  return (
    <PremiumPanel className="overflow-hidden p-5 sm:p-6 lg:p-8">
      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">Platform overview</p>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Your relationship system, organized in one place.
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">
            Defrag helps you track important relationships, understand how events are shaping the current dynamic, explore likely outcomes, and receive practical guidance before the next conversation.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Relationships</p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-white">Mapped</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Timeline</p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-white">Active</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Guidance</p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-white">Ready</p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-black/20 p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">What Defrag does</p>
          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-white">Map the system</p>
              <p className="mt-2 text-sm leading-7 text-white/60">See the people involved, how they connect, and where pressure may be building.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-white">Track events over time</p>
              <p className="mt-2 text-sm leading-7 text-white/60">Log conflict, repair, stress, and key moments to understand the larger pattern.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-white">Prepare before acting</p>
              <p className="mt-2 text-sm leading-7 text-white/60">Use simulations and AI guidance to choose healthier next steps with more clarity.</p>
            </div>
          </div>
        </div>
      </div>
    </PremiumPanel>
  )
}
