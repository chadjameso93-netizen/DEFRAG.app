"use client"
import { Panel } from "@/components/ui/Panel";

import { useOnboarding } from "@/lib/store/onboarding"

export default function StepNatal() {
  const { birthDate, birthTime, birthPlace, timeConfidence, setField, setStep } = useOnboarding()

  const canContinue = birthDate.length > 0

  return (
    <Panel className="p-8 sm:p-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#EAEAEA]/45">Step 4</p>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#EAEAEA]">When and where were you born?</h2>
      <p className="mt-3 text-sm leading-7 text-[#9A9A9A]">
        This helps Defrag build a more accurate picture of your relational patterns and timing. Unknown details are handled gracefully.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-[#EAEAEA]/50">Birth date</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setField("birthDate", e.target.value)}
            className="mt-2 w-full bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-2 focus:border-[#4F6BFF] focus:outline-none transition-colors text-[#EAEAEA]"
          />
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-[#EAEAEA]/50">Birth time</label>
          <input
            type="time"
            value={birthTime}
            onChange={(e) => setField("birthTime", e.target.value)}
            className="mt-2 w-full bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-2 focus:border-[#4F6BFF] focus:outline-none transition-colors text-[#EAEAEA]"
          />
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-[#EAEAEA]/50">Time confidence</label>
          <div className="mt-2 flex gap-2">
            {(["exact", "approximate", "unknown"] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setField("timeConfidence", opt)}
                className={`flex-1 rounded-xl border px-3 py-2 text-xs capitalize transition ${
                  timeConfidence === opt
                    ? "border-white/[0.12] bg-[#1F1F1F] text-[#EAEAEA]"
                    : "border-[#1F1F1F] bg-[#0A0A0A] text-[#EAEAEA]/50 hover:border-white/[0.08]"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-[#EAEAEA]/50">Birth location</label>
          <input
            type="text"
            value={birthPlace}
            onChange={(e) => setField("birthPlace", e.target.value)}
            placeholder="City, Country"
            className="mt-2 w-full bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-2 focus:border-[#4F6BFF] focus:outline-none transition-colors text-[#EAEAEA]"
          />
        </div>
      </div>

      <button
        onClick={() => setStep("privacy")}
        disabled={!canContinue}
        className="mt-6 w-full rounded-[8px] bg-[#EAEAEA] px-6 py-3 text-sm font-medium text-[#000000] shadow-none transition-all duration-300 hover:shadow-none disabled:opacity-30"
      >
        Continue
      </button>
    </Panel>
  )
}
