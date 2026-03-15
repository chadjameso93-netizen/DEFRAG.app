"use client"
import { Panel } from "@/components/ui/Panel";

import { useOnboarding } from "@/lib/store/onboarding"

export default function StepWelcome() {
  const setStep = useOnboarding((s) => s.setStep)

  return (
    <Panel className="p-8 text-center sm:p-12">
      <p className="text-[11px] font-semibold uppercase tracking-[0.36em] text-[#EAEAEA]/40">
        Defrag
      </p>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-[#EAEAEA] sm:text-4xl">
        See what&apos;s really happening in your relationships.
      </h1>
      <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-[#9A9A9A]">
        Defrag helps you understand invisible patterns, find better timing, and communicate with more clarity.
      </p>
      <button
        onClick={() => setStep("focus")}
        className="mt-8 inline-flex items-center gap-2 rounded-[8px] bg-[#EAEAEA] px-8 py-3 text-sm font-medium text-[#000000] shadow-none transition-all duration-300 hover:shadow-none"
      >
        Begin
      </button>
    </Panel>
  )
}
