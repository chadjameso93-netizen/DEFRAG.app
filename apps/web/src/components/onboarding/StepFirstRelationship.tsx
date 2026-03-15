"use client"
import { Panel } from "@/components/ui/Panel";

import { useOnboarding } from "@/lib/store/onboarding"

const TYPES = ["partner", "parent", "sibling", "friend", "colleague", "child", "other"]

export default function StepFirstRelationship() {
  const { firstRelationshipName, firstRelationshipType, firstRelationshipBirthDate, setField, setStep } = useOnboarding()

  const canContinue = firstRelationshipName.trim().length > 0

  return (
    <Panel className="p-8 sm:p-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#EAEAEA]/45">Step 6</p>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#EAEAEA]">Who do you want help understanding first?</h2>
      <p className="mt-3 text-sm leading-7 text-[#9A9A9A]">
        Start with the person or relationship that is most on your mind right now.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-[#EAEAEA]/50">Their name</label>
          <input
            type="text"
            value={firstRelationshipName}
            onChange={(e) => setField("firstRelationshipName", e.target.value)}
            placeholder="First name or nickname"
            className="mt-2 w-full bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-2 focus:border-[#4F6BFF] focus:outline-none transition-colors text-[#EAEAEA]"
          />
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-[#EAEAEA]/50">Relationship type</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setField("firstRelationshipType", t)}
                className={`rounded-xl border px-3 py-2 text-xs capitalize transition ${
                  firstRelationshipType === t
                    ? "border-white/[0.12] bg-[#1F1F1F] text-[#EAEAEA]"
                    : "border-[#1F1F1F] bg-[#0A0A0A] text-[#EAEAEA]/50 hover:border-white/[0.08]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-[#EAEAEA]/50">Their birth date (optional)</label>
          <input
            type="date"
            value={firstRelationshipBirthDate}
            onChange={(e) => setField("firstRelationshipBirthDate", e.target.value)}
            className="mt-2 w-full bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-2 focus:border-[#4F6BFF] focus:outline-none transition-colors text-[#EAEAEA]"
          />
        </div>
      </div>

      <button
        onClick={() => setStep("first-event")}
        disabled={!canContinue}
        className="mt-6 w-full rounded-[8px] bg-[#EAEAEA] px-6 py-3 text-sm font-medium text-[#000000] shadow-none transition-all duration-300 hover:shadow-none disabled:opacity-30"
      >
        Continue
      </button>
    </Panel>
  )
}
