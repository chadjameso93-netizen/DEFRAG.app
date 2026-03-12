"use client"

import { useState } from "react"

type SimResult = {
  risk: number
  repair: number
  note: string
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
      <h2 className="text-lg font-medium text-zinc-950">Simulation</h2>
      <p className="mt-2 text-sm text-zinc-600">
        Explore likely outcomes before acting.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button onClick={() => run("direct_confrontation")} className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50">
          Direct
        </button>
        <button onClick={() => run("calm_boundary")} className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50">
          Boundary
        </button>
        <button onClick={() => run("delay")} className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50">
          Wait
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
        {result ? (
          <div className="space-y-2 text-sm text-zinc-700">
            <p><span className="font-medium text-zinc-950">Risk:</span> {result.risk}</p>
            <p><span className="font-medium text-zinc-950">Repair potential:</span> {result.repair}</p>
            <p><span className="font-medium text-zinc-950">Guidance:</span> {result.note}</p>
          </div>
        ) : (
          <p className="text-sm text-zinc-600">
            Choose an option to preview a likely outcome.
          </p>
        )}
      </div>
    </div>
  )
}
