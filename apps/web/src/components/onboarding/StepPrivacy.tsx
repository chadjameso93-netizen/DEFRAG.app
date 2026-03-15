"use client"
import { Panel } from "@/components/ui/Panel";

import { useOnboarding } from "@/lib/store/onboarding"

export default function StepPrivacy() {
  const { privacyAccepted, setField, setStep } = useOnboarding()

  return (
    <Panel className="p-8 sm:p-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#EAEAEA]/45">Step 5</p>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#EAEAEA]">Privacy and consent</h2>
      <p className="mt-3 text-sm leading-7 text-[#9A9A9A]">
        Defrag is not therapy or medical advice. It is a relational intelligence tool designed to help you see patterns more clearly.
      </p>

      <div className="mt-6 space-y-3">
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-4">
          <p className="text-sm font-medium text-[#EAEAEA]">What we store</p>
          <p className="mt-1 text-xs text-[#EAEAEA]/50">
            Your profile data, relationship entries, events, and insights. All encrypted at rest.
          </p>
        </div>
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-4">
          <p className="text-sm font-medium text-[#EAEAEA]">What we don&apos;t do</p>
          <p className="mt-1 text-xs text-[#EAEAEA]/50">
            No ad tracking. No sale of personal data. No sharing of your relational graph.
          </p>
        </div>
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-4">
          <p className="text-sm font-medium text-[#EAEAEA]">Your control</p>
          <p className="mt-1 text-xs text-[#EAEAEA]/50">
            You can export or delete all your data at any time from Settings.
          </p>
        </div>
      </div>

      <label className="mt-6 flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={privacyAccepted}
          onChange={(e) => setField("privacyAccepted", e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 accent-white"
        />
        <span className="text-sm text-[#EAEAEA]/70">
          I understand that Defrag is not therapy or medical advice. I accept the privacy policy and terms of use.
        </span>
      </label>

      <button
        onClick={() => setStep("first-relationship")}
        disabled={!privacyAccepted}
        className="mt-6 w-full rounded-[8px] bg-[#EAEAEA] px-6 py-3 text-sm font-medium text-[#000000] shadow-none transition-all duration-300 hover:shadow-none disabled:opacity-30"
      >
        Continue
      </button>
    </Panel>
  )
}
