"use client"
import { Panel } from "@/components/ui/Panel";

import { useOnboarding } from "@/lib/store/onboarding"

const OPTIONS = [
  { value: "personal" as const, label: "Me + one person", desc: "Understand a specific relationship more clearly." },
  { value: "family" as const, label: "My family system", desc: "Map how family dynamics are shaping things." },
  { value: "team" as const, label: "My team", desc: "See what is affecting collaboration and trust." },
]

export default function StepFocus() {
  const { focus, setField, setStep } = useOnboarding()

  return (
    <Panel className="p-8 sm:p-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#EAEAEA]/45">Step 2</p>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#EAEAEA]">Who are you here for first?</h2>
      <p className="mt-3 text-sm leading-7 text-[#9A9A9A]">
        This helps Defrag set up the right starting view.
      </p>

      <div className="mt-6 space-y-3">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setField("focus", opt.value)}
            className={`w-full rounded-2xl border p-4 text-left transition ${
              focus === opt.value
                ? "border-white/[0.12] bg-[#1F1F1F]"
                : "border-[#1F1F1F] bg-[#0A0A0A] hover:border-white/[0.08]"
            }`}
          >
            <p className="text-sm font-medium text-[#EAEAEA]">{opt.label}</p>
            <p className="mt-1 text-xs text-[#EAEAEA]/50">{opt.desc}</p>
          </button>
        ))}
      </div>

      <button
        onClick={() => setStep("account")}
        disabled={!focus}
        className="mt-6 w-full rounded-[8px] bg-[#EAEAEA] px-6 py-3 text-sm font-medium text-[#000000] shadow-none transition-all duration-300 hover:shadow-none disabled:opacity-30"
      >
        Continue
      </button>
    </Panel>
  )
}
