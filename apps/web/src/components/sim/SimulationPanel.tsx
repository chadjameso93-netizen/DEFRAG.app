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
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#555555]">Simulation</p>
      <h2 className="mt-4 text-xl font-medium text-[#EAEAEA]">Compare likely outcomes</h2>
      <p className="mt-3 text-sm leading-7 text-[#9A9A9A]">
        Use this to pressure-test a response before you send it or say it.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button onClick={() => run("direct_confrontation")} className="rounded-2xl border border-[#1F1F1F] bg-[#0A0A0A] px-4 py-2 text-sm font-medium text-[#EAEAEA] transition-colors duration-300 hover:bg-[#1F1F1F]">
          Direct
        </button>
        <button onClick={() => run("calm_boundary")} className="rounded-2xl border border-[#1F1F1F] bg-[#0A0A0A] px-4 py-2 text-sm font-medium text-[#EAEAEA] transition-colors duration-300 hover:bg-[#1F1F1F]">
          Boundary
        </button>
        <button onClick={() => run("delay")} className="rounded-2xl border border-[#1F1F1F] bg-[#0A0A0A] px-4 py-2 text-sm font-medium text-[#EAEAEA] transition-colors duration-300 hover:bg-[#1F1F1F]">
          Wait
        </button>
      </div>

      <div className="mt-6 bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-5">
        {loading ? (
          <p className="text-sm text-[#9A9A9A]">Running simulation...</p>
        ) : result ? (
          <div className="space-y-3 font-serif-accent text-sm text-[#9A9A9A]">
            {result.outcome ? <p><span className="font-medium text-[#EAEAEA]">Outcome:</span> {result.outcome}</p> : null}
            {typeof result.probability === "number" ? <p><span className="font-medium text-[#EAEAEA]">Probability:</span> {result.probability}</p> : null}
            {typeof result.risk === "number" ? <p><span className="font-medium text-[#EAEAEA]">Risk:</span> {result.risk}</p> : null}
            {typeof result.repair === "number" ? <p><span className="font-medium text-[#EAEAEA]">Repair potential:</span> {result.repair}</p> : null}
            {result.note ? <p><span className="font-medium text-[#EAEAEA]">Guidance:</span> {result.note}</p> : null}
          </div>
        ) : (
          <p className="text-sm text-[#9A9A9A]">Choose an option to preview the likely pattern shift.</p>
        )}
      </div>
    </div>
  )
}
