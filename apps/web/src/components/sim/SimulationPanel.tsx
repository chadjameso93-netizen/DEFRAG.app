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
  const [loading, setLoading] = useState(false)

  async function run(action: "direct_confrontation" | "calm_boundary" | "delay") {
    setLoading(true)
    try {
      const res = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      })
      const data = await res.json()
      setResult(data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">Simulation</p>
      <h2 className="mt-4 text-xl font-medium text-[var(--text-primary)]">Compare likely outcomes</h2>
      <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
        Use this to pressure-test a response before you send it or say it.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button onClick={() => run("direct_confrontation")} className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-1)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors duration-300 hover:bg-[var(--surface-2)]">
          Direct
        </button>
        <button onClick={() => run("calm_boundary")} className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-1)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors duration-300 hover:bg-[var(--surface-2)]">
          Boundary
        </button>
        <button onClick={() => run("delay")} className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-1)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors duration-300 hover:bg-[var(--surface-2)]">
          Wait
        </button>
      </div>

      <div className="mt-6 rounded-[24px] border border-[var(--border-subtle)] bg-[var(--surface-1)] p-5">
        {loading ? (
          <p className="text-sm text-[var(--text-secondary)]">Running simulation...</p>
        ) : result ? (
          <div className="space-y-3 font-serif-accent text-sm text-[var(--text-secondary)]">
            {result.outcome ? <p><span className="font-medium text-[var(--text-primary)]">Outcome:</span> {result.outcome}</p> : null}
            {typeof result.probability === "number" ? <p><span className="font-medium text-[var(--text-primary)]">Probability:</span> {result.probability}</p> : null}
            {typeof result.risk === "number" ? <p><span className="font-medium text-[var(--text-primary)]">Risk:</span> {result.risk}</p> : null}
            {typeof result.repair === "number" ? <p><span className="font-medium text-[var(--text-primary)]">Repair potential:</span> {result.repair}</p> : null}
            {result.note ? <p><span className="font-medium text-[var(--text-primary)]">Guidance:</span> {result.note}</p> : null}
          </div>
        ) : (
          <p className="text-sm text-[var(--text-secondary)]">Choose an option to preview the likely pattern shift.</p>
        )}
      </div>
    </div>
  )
}
