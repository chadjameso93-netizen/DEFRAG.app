"use client"
import { Panel } from "@/components/ui/Panel";

import { useState, useEffect } from "react"
import { useOnboarding } from "@/lib/store/onboarding"

export default function StepFirstInsight() {
  const {
    firstEventDescription,
    firstRelationshipName,
    firstRelationshipType,
    firstRelationshipBirthDate,
    insightResult,
    setField,
    setStep,
  } = useOnboarding()
  const [loading, setLoading] = useState(!insightResult)

  useEffect(() => {
    if (insightResult) return
    fetch("/api/onboarding/bootstrap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_description: firstEventDescription,
        relationship_name: firstRelationshipName,
        relationship_type: firstRelationshipType,
        relationship_birth_date: firstRelationshipBirthDate,
      }),
    })
      .then((r) => r.json())
      .then((data) => setField("insightResult", data.insight || data.output_text || "Defrag is processing your situation."))
      .catch(() => setField("insightResult", "Defrag could not generate an insight right now. You can try again from the dashboard."))
      .finally(() => setLoading(false))
  }, [firstEventDescription, firstRelationshipBirthDate, firstRelationshipName, firstRelationshipType, insightResult, setField])

  return (
    <Panel className="p-8 sm:p-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#EAEAEA]/45">Step 8</p>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#EAEAEA]">Your first insight</h2>

      {loading ? (
        <div className="mt-6 space-y-3">
          <div className="h-4 animate-pulse rounded bg-[#1F1F1F]" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-[#1F1F1F]" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-[#1F1F1F]" />
          <p className="mt-4 text-sm text-[#EAEAEA]/40">Analyzing your situation...</p>
        </div>
      ) : insightResult ? (
        <div className="mt-6 space-y-4">
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-5">
            <p className="whitespace-pre-wrap text-sm leading-7 text-[#EAEAEA]/80">{insightResult}</p>
          </div>
        </div>
      ) : null}

      <button
        onClick={() => setStep("guided-tour")}
        disabled={loading}
        className="mt-6 w-full rounded-[8px] bg-[#EAEAEA] px-6 py-3 text-sm font-medium text-[#000000] shadow-none transition-all duration-300 hover:shadow-none disabled:opacity-30"
      >
        Continue to Defrag
      </button>
    </Panel>
  )
}
