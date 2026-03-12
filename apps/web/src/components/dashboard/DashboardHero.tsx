import PremiumPanel from "@/components/ui/PremiumPanel"

export default function DashboardHero() {
  return (
    <PremiumPanel className="overflow-hidden p-5 sm:p-6 lg:p-8">
      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Today</p>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
            Relational field is elevated but workable.
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600">
            Recent signals suggest heightened sensitivity around unresolved topics. A slower tone, concise clarifications, and well-timed pauses are more likely to improve outcomes.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-zinc-500">System state</p>
              <p className="mt-2 text-lg font-semibold tracking-tight">Elevated</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-zinc-500">Repair</p>
              <p className="mt-2 text-lg font-semibold tracking-tight">Moderate</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-zinc-500">Suggested mode</p>
              <p className="mt-2 text-lg font-semibold tracking-tight">Pause first</p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-zinc-200 bg-[linear-gradient(180deg,#ffffff,#f5f7fb)] p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-zinc-500">Daily guidance</p>
          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-4">
              <p className="text-sm font-medium text-zinc-950">Communication</p>
              <p className="mt-2 text-sm leading-7 text-zinc-600">Keep language short and specific. Avoid stacking multiple unresolved points at once.</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-4">
              <p className="text-sm font-medium text-zinc-950">Timing</p>
              <p className="mt-2 text-sm leading-7 text-zinc-600">Pause before reacting to sensitive messages. Slight delays may improve clarity.</p>
            </div>
          </div>
        </div>
      </div>
    </PremiumPanel>
  )
}
