"use client"

import { useState } from "react"

type SimResult = {
  risk: number
  repair: number
  note: string
}

export default function SimulationPanel() {
  const [result, setResult] = useState<SimResult | null>(null)

  function run(action: "direct" | "boundary" | "wait") {
    const outcomes: Record<string, SimResult> = {
      direct: {
        risk: 0.72,
        repair: 0.18,
        note: "Direct confrontation may increase tension if the system is already activated.",
      },
      boundary: {
        risk: 0.34,
        repair: 0.58,
        note: "A calm boundary often improves clarity, even if the first response is defensive.",
      },
      wait: {
        risk: 0.22,
        repair: 0.41,
        note: "Waiting can reduce immediate friction, but unresolved issues may remain.",
      },
    }

    setResult(outcomes[action])
  }

  return (
    <div>
      <h2 className="text-lg font-medium text-zinc-950">Simulation</h2>
      <p className="mt-2 text-sm text-zinc-600">
        Explore likely outcomes before acting.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button onClick={() => run("direct")} className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50">
          Direct
        </button>
        <button onClick={() => run("boundary")} className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50">
          Boundary
        </button>
        <button onClick={() => run("wait")} className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50">
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
