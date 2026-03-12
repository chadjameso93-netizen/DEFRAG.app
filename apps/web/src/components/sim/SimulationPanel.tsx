"use client"

import { useState } from "react"

type SimResult = {
  risk?: number
  repair?: number
  note?: string
  outcome?: string
  probability?: number
}

export default function SimulationPanel() {
  const [result, setResult] = useState<SimResult | null>(null)

  async function run(action: "direct_confrontation" | "calm_boundary" | "delay") {
    const res = await fetch("/api/simulate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    })
    const data = await res.json()
    setResult(data)
  }

  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Simulation</p>
      <h2 className="mt-4 text-lg font-medium text-white">Test likely outcomes before you act</h2>
      <p className="mt-3 text-sm leading-7 text-white/60">
        Compare different approaches before the conversation happens.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button onClick={() => run("direct_confrontation")} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10">
          Direct
        </button>
        <button onClick={() => run("calm_boundary")} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10">
          Boundary
        </button>
        <button onClick={() => run("delay")} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10">
          Wait
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
        {result ? (
          <div className="space-y-3 text-sm text-white/70">
            {result.outcome ? <p><span className="font-medium text-white">Outcome:</span> {result.outcome}</p> : null}
            {typeof result.probability === "number" ? <p><span className="font-medium text-white">Probability:</span> {result.probability}</p> : null}
            {typeof result.risk === "number" ? <p><span className="font-medium text-white">Risk:</span> {result.risk}</p> : null}
            {typeof result.repair === "number" ? <p><span className="font-medium text-white">Repair potential:</span> {result.repair}</p> : null}
            {result.note ? <p><span className="font-medium text-white">Guidance:</span> {result.note}</p> : null}
          </div>
        ) : (
          <p className="text-sm text-white/60">Choose an option to preview a likely outcome.</p>
        )}
      </div>
    </div>
  )
}
