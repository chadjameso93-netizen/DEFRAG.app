export default function DailyRead() {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40">Daily read</p>
      <h2 className="mt-3 text-xl font-medium text-white">Strategic reflection for today</h2>
      <p className="mt-2 text-sm leading-7 text-white/60">
        A short audio briefing and transcript to help you orient to the current relationship system.
      </p>

      <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/40">
          <span>Audio brief</span>
          <span>1:32</span>
        </div>
        <div className="mt-3 h-2 rounded-full bg-white/10">
          <div className="h-2 w-1/3 rounded-full bg-white" />
        </div>
        <div className="mt-4 flex gap-3">
          <button className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-950">Play</button>
          <button className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-white/70">Transcript</button>
        </div>
      </div>

      <details className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
        <summary className="cursor-pointer text-xs uppercase tracking-[0.2em] text-white/50">
          Transcript
        </summary>
        <p className="mt-3 text-sm leading-7 text-white/60">
          Today your system shows mixed energy: some repair is active, but pressure is rising in one connection. A calm
          check-in may help reduce escalation risk before the next conversation window.
        </p>
      </details>
    </div>
  )
}
