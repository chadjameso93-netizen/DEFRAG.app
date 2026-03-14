"use client"

import { useOnboarding } from "@/lib/store/onboarding"
import GlowCard from "@/components/ui/GlowCard"

const TYPES = ["partner", "parent", "sibling", "friend", "colleague", "child", "other"]

export default function StepFirstRelationship() {
  const { firstRelationshipName, firstRelationshipType, firstRelationshipBirthDate, setField, setStep } = useOnboarding()

  const canContinue = firstRelationshipName.trim().length > 0

  return (
    <GlowCard className="p-8 sm:p-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">Step 6</p>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">Who do you want help understanding first?</h2>
      <p className="mt-3 text-sm leading-7 text-white/60">
        Start with the person or relationship that is most on your mind right now.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-white/50">Their name</label>
          <input
            type="text"
            value={firstRelationshipName}
            onChange={(e) => setField("firstRelationshipName", e.target.value)}
            placeholder="First name or nickname"
            className="mt-2 w-full glass-input"
          />
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-white/50">Relationship type</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setField("firstRelationshipType", t)}
                className={`rounded-xl border px-3 py-2 text-xs capitalize transition ${
                  firstRelationshipType === t
                    ? "border-white/[0.12] bg-white/[0.06] text-white"
                    : "border-white/[0.06] bg-white/[0.03] text-white/50 hover:border-white/[0.08]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-white/50">Their birth date (optional)</label>
          <input
            type="date"
            value={firstRelationshipBirthDate}
            onChange={(e) => setField("firstRelationshipBirthDate", e.target.value)}
            className="mt-2 w-full glass-input"
          />
        </div>
      </div>

      <button
        onClick={() => setStep("first-event")}
        disabled={!canContinue}
        className="mt-6 w-full rounded-2xl bg-[var(--text-primary)] px-6 py-3 text-sm font-medium text-[var(--surface-0)] shadow-[0_0_20px_rgba(245,245,240,0.04)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,245,240,0.08)] disabled:opacity-30"
      >
        Continue
      </button>
    </GlowCard>
  )
}
