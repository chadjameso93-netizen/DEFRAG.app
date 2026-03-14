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
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/25"
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
                    ? "border-white/30 bg-white/10 text-white"
                    : "border-white/10 bg-white/5 text-white/50 hover:border-white/20"
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
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-white/25"
          />
        </div>
      </div>

      <button
        onClick={() => setStep("first-event")}
        disabled={!canContinue}
        className="mt-6 w-full rounded-2xl bg-white px-6 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-100 disabled:opacity-30"
      >
        Continue
      </button>
    </GlowCard>
  )
}
