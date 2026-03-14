"use client"

import { useOnboarding } from "@/lib/store/onboarding"
import GlowCard from "@/components/ui/GlowCard"

const OPTIONS = [
  { value: "personal" as const, label: "Me + one person", desc: "Understand a specific relationship more clearly." },
  { value: "family" as const, label: "My family system", desc: "Map how family dynamics are shaping things." },
  { value: "team" as const, label: "My team", desc: "See what is affecting collaboration and trust." },
]

export default function StepFocus() {
  const { focus, setField, setStep } = useOnboarding()

  return (
    <GlowCard className="p-8 sm:p-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">Step 2</p>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">Who are you here for first?</h2>
      <p className="mt-3 text-sm leading-7 text-white/60">
        This helps Defrag set up the right starting view.
      </p>

      <div className="mt-6 space-y-3">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setField("focus", opt.value)}
            className={`w-full rounded-2xl border p-4 text-left transition ${
              focus === opt.value
                ? "border-white/[0.12] bg-white/[0.06]"
                : "border-white/[0.06] bg-white/[0.03] hover:border-white/[0.08]"
            }`}
          >
            <p className="text-sm font-medium text-white">{opt.label}</p>
            <p className="mt-1 text-xs text-white/50">{opt.desc}</p>
          </button>
        ))}
      </div>

      <button
        onClick={() => setStep("account")}
        disabled={!focus}
        className="mt-6 w-full rounded-2xl bg-[var(--text-primary)] px-6 py-3 text-sm font-medium text-[var(--surface-0)] shadow-[0_0_20px_rgba(245,245,240,0.04)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,245,240,0.08)] disabled:opacity-30"
      >
        Continue
      </button>
    </GlowCard>
  )
}
