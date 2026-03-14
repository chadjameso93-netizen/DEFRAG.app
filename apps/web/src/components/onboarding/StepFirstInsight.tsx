"use client"

import { useState, useEffect } from "react"
import { useOnboarding } from "@/lib/store/onboarding"
import GlowCard from "@/components/ui/GlowCard"

export default function StepFirstInsight() {
  const { firstEventDescription, firstRelationshipName, insightResult, setField, setStep } = useOnboarding()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (insightResult) return
    setLoading(true)
    fetch("/api/insights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: firstEventDescription,
        relationship_name: firstRelationshipName,
      }),
    })
      .then((r) => r.json())
      .then((data) => setField("insightResult", data.output_text || data.insight || "Defrag is processing your situation."))
      .catch(() => setField("insightResult", "Defrag could not generate an insight right now. You can try again from the dashboard."))
      .finally(() => setLoading(false))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <GlowCard className="p-8 sm:p-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">Step 8</p>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">Your first insight</h2>

      {loading ? (
        <div className="mt-6 space-y-3">
          <div className="h-4 animate-pulse rounded bg-white/10" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-white/10" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-white/10" />
          <p className="mt-4 text-sm text-white/40">Analyzing your situation...</p>
        </div>
      ) : insightResult ? (
        <div className="mt-6 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="whitespace-pre-wrap text-sm leading-7 text-white/80">{insightResult}</p>
          </div>
        </div>
      ) : null}

      <button
        onClick={() => setStep("guided-tour")}
        disabled={loading}
        className="mt-6 w-full rounded-2xl bg-white px-6 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-100 disabled:opacity-30"
      >
        Continue to Defrag
      </button>
    </GlowCard>
  )
}
