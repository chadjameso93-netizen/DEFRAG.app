"use client"
import { Panel } from "@/components/ui/Panel";

import { useOnboarding } from "@/lib/store/onboarding"

export default function StepFirstEvent() {
  const { firstEventDescription, firstRelationshipName, setField, setStep } = useOnboarding()

  const canContinue = firstEventDescription.trim().length >= 10

  return (
    <Panel className="p-8 sm:p-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#EAEAEA]/45">Step 7</p>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#EAEAEA]">
        Describe one situation that&apos;s been on your mind.
      </h2>
      <p className="mt-3 text-sm leading-7 text-[#9A9A9A]">
        {firstRelationshipName
          ? `Think about something recent involving ${firstRelationshipName}. A moment, a conversation, or a pattern you've noticed.`
          : "Think about a recent moment, conversation, or pattern that has stayed with you."}
      </p>

      <div className="mt-6">
        <textarea
          value={firstEventDescription}
          onChange={(e) => {
            if (e.target.value.length <= 280) setField("firstEventDescription", e.target.value)
          }}
          rows={4}
          placeholder="What happened? How did it feel?"
          className="w-full resize-none bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-2 focus:border-[#4F6BFF] focus:outline-none transition-colors text-[#EAEAEA]"
        />
        <p className="mt-2 text-right text-xs text-[#EAEAEA]/30">{firstEventDescription.length}/280</p>
      </div>

      <button
        onClick={() => setStep("first-insight")}
        disabled={!canContinue}
        className="mt-4 w-full rounded-[8px] bg-[#EAEAEA] px-6 py-3 text-sm font-medium text-[#000000] shadow-none transition-all duration-300 hover:shadow-none disabled:opacity-30"
      >
        Get your first insight
      </button>
    </Panel>
  )
}
