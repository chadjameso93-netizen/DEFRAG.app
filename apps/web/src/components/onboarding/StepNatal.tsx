"use client"

import { useOnboarding } from "@/lib/store/onboarding"
import GlowCard from "@/components/ui/GlowCard"

export default function StepNatal() {
  const { birthDate, birthTime, birthPlace, timeConfidence, setField, setStep } = useOnboarding()

  const canContinue = birthDate.length > 0

  return (
    <GlowCard className="p-8 sm:p-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">Step 4</p>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">When and where were you born?</h2>
      <p className="mt-3 text-sm leading-7 text-white/60">
        This helps Defrag build a more accurate picture of your relational patterns and timing. Unknown details are handled gracefully.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-white/50">Birth date</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setField("birthDate", e.target.value)}
            className="mt-2 w-full glass-input"
          />
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-white/50">Birth time</label>
          <input
            type="time"
            value={birthTime}
            onChange={(e) => setField("birthTime", e.target.value)}
            className="mt-2 w-full glass-input"
          />
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-white/50">Time confidence</label>
          <div className="mt-2 flex gap-2">
            {(["exact", "approximate", "unknown"] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setField("timeConfidence", opt)}
                className={`flex-1 rounded-xl border px-3 py-2 text-xs capitalize transition ${
                  timeConfidence === opt
                    ? "border-white/[0.12] bg-white/[0.06] text-white"
                    : "border-white/[0.06] bg-white/[0.03] text-white/50 hover:border-white/[0.08]"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-white/50">Birth location</label>
          <input
            type="text"
            value={birthPlace}
            onChange={(e) => setField("birthPlace", e.target.value)}
            placeholder="City, Country"
            className="mt-2 w-full glass-input"
          />
        </div>
      </div>

      <button
        onClick={() => setStep("privacy")}
        disabled={!canContinue}
        className="mt-6 w-full rounded-2xl bg-[var(--text-primary)] px-6 py-3 text-sm font-medium text-[var(--surface-0)] shadow-[0_0_20px_rgba(245,245,240,0.04)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,245,240,0.08)] disabled:opacity-30"
      >
        Continue
      </button>
    </GlowCard>
  )
}
