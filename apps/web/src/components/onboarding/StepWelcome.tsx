"use client"

import { useOnboarding } from "@/lib/store/onboarding"
import GlowCard from "@/components/ui/GlowCard"

export default function StepWelcome() {
  const setStep = useOnboarding((s) => s.setStep)

  return (
    <GlowCard className="p-8 text-center sm:p-12">
      <p className="text-[11px] font-semibold uppercase tracking-[0.36em] text-white/40">
        Defrag
      </p>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        See what&apos;s really happening in your relationships.
      </h1>
      <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-white/60">
        Defrag helps you understand invisible patterns, find better timing, and communicate with more clarity.
      </p>
      <button
        onClick={() => setStep("focus")}
        className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[var(--text-primary)] px-8 py-3 text-sm font-medium text-[var(--surface-0)] shadow-[0_0_20px_rgba(245,245,240,0.04)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,245,240,0.08)]"
      >
        Begin
      </button>
    </GlowCard>
  )
}
