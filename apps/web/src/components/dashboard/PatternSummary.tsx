export default function PatternSummary({ summary }: { summary?: string }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40">Pattern summary</p>
      <h3 className="mt-3 text-lg font-medium text-white">Pressure is rising in one connection</h3>
      <p className="mt-2 text-sm leading-7 text-white/60">
        {summary ||
          "Tension is clustering after recent disagreements. Repair is present but inconsistent. The next step should reduce pressure rather than push for resolution."}
      </p>
      <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
        Timing guidance: consider a low-stakes check‑in within 24–48 hours while repair is still active.
      </div>
    </div>
  )
}
