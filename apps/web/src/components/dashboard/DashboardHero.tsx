import PremiumPanel from "@/components/ui/PremiumPanel"

export default function DashboardHero() {
  return (
    <PremiumPanel className="overflow-hidden p-5 sm:p-6 lg:p-8">
      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">Today</p>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Relational field is elevated but workable.
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">
            Recent signals suggest heightened sensitivity around unresolved topics. Slower tone, concise clarifications, and well-timed pauses are more likely to improve outcomes.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">System</p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-white">Elevated</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Repair</p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-white">Moderate</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Mode</p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-white">Pause first</p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-black/20 p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Daily guidance</p>
          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-white">Communication</p>
              <p className="mt-2 text-sm leading-7 text-white/60">Keep language short and specific. Avoid stacking multiple unresolved points at once.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-white">Timing</p>
              <p className="mt-2 text-sm leading-7 text-white/60">Pause before reacting to sensitive messages. Slight delays may improve clarity.</p>
            </div>
          </div>
        </div>
      </div>
    </PremiumPanel>
  )
}
