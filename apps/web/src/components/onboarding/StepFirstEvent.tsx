"use client"

import { useOnboarding } from "@/lib/store/onboarding"
import GlowCard from "@/components/ui/GlowCard"

export default function StepFirstEvent() {
  const { firstEventDescription, firstRelationshipName, setField, setStep } = useOnboarding()

  const canContinue = firstEventDescription.trim().length >= 10

  return (
    <GlowCard className="p-8 sm:p-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">Step 7</p>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">
        Describe one situation that&apos;s been on your mind.
      </h2>
      <p className="mt-3 text-sm leading-7 text-white/60">
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
          className="w-full resize-none glass-input"
        />
        <p className="mt-2 text-right text-xs text-white/30">{firstEventDescription.length}/280</p>
      </div>

      <button
        onClick={() => setStep("first-insight")}
        disabled={!canContinue}
        className="mt-4 w-full rounded-2xl bg-[var(--text-primary)] px-6 py-3 text-sm font-medium text-[var(--surface-0)] shadow-[0_0_20px_rgba(245,245,240,0.04)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,245,240,0.08)] disabled:opacity-30"
      >
        Get your first insight
      </button>
    </GlowCard>
  )
}
