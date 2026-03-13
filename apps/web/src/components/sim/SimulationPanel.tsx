"use client"

import { useEffect, useState } from "react"

type RelationshipOption = {
  id: string
  source_name: string
  target_name: string
}

type SimulationPayload = {
  action: "slow_down" | "clarify" | "set_boundary" | "revisit_later"
  estimated_short_term_effect: string
  estimated_risk_level: number
  estimated_repair_opportunity: number
  why: string
}

type SimulationResponse = {
  simulation: SimulationPayload | null
  narrative?: string
  guardrail?: {
    simulation_disabled?: boolean
    issues?: string[]
  }
}

const ACTIONS: Array<{ id: SimulationPayload["action"]; label: string }> = [
  { id: "slow_down", label: "Slow down" },
  { id: "clarify", label: "Clarify" },
  { id: "set_boundary", label: "Set boundary" },
  { id: "revisit_later", label: "Revisit later" },
]

export default function SimulationPanel() {
  const [relationships, setRelationships] = useState<RelationshipOption[]>([])
  const [relationshipId, setRelationshipId] = useState("")
  const [contextNote, setContextNote] = useState("")
  const [result, setResult] = useState<SimulationResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingRelationships, setLoadingRelationships] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/relationships", { cache: "no-store" })
      .then(async (res) => {
        if (res.status === 401) {
          setError("Sign in to simulate a relationship decision.")
          return
        }

        if (!res.ok) {
          setError("Relationship data is unavailable right now.")
          return
        }

        const data = (await res.json()) as { relationships?: RelationshipOption[] }
        const nextRelationships = data.relationships ?? []
        setRelationships(nextRelationships)
        setRelationshipId(nextRelationships[0]?.id ?? "")
      })
      .catch(() => setError("Unable to load relationship choices."))
      .finally(() => setLoadingRelationships(false))
  }, [])

  async function run(action: SimulationPayload["action"]) {
    if (!relationshipId) {
      setError("Choose a relationship before running a simulation.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/simulation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          relationship_id: relationshipId,
          action,
          context_note: contextNote || undefined,
        }),
      })

      const data = (await res.json()) as SimulationResponse | { error?: string }
      if (!res.ok) {
        setError((data as { error?: string }).error || "Unable to run simulation.")
        setResult(null)
        return
      }

      setResult(data as SimulationResponse)
    } finally {
      setLoading(false)
    }
  }

  const simulationDisabled = Boolean(result?.guardrail?.simulation_disabled)

  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Simulation</p>
      <h2 className="mt-4 text-xl font-medium text-white">Compare likely outcomes</h2>
      <p className="mt-3 text-sm leading-7 text-white/60">
        Use this to pressure-test a response before you send it or say it.
      </p>

      <div className="mt-6 grid gap-3">
        <select
          value={relationshipId}
          onChange={(event) => setRelationshipId(event.target.value)}
          disabled={loadingRelationships || !relationships.length}
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20 disabled:opacity-50"
        >
          <option value="">Choose relationship</option>
          {relationships.map((relationship) => (
            <option key={relationship.id} value={relationship.id}>
              {relationship.source_name} to {relationship.target_name}
            </option>
          ))}
        </select>

        <textarea
          value={contextNote}
          onChange={(event) => setContextNote(event.target.value)}
          placeholder="Optional context note"
          className="min-h-[100px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20"
        />
      </div>

      {simulationDisabled ? (
        <div className="mt-4 rounded-xl border border-amber-300/30 bg-amber-200/10 p-3 text-xs text-amber-100">
          Safety mode is active. Simulation actions are disabled for this response.
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-3">
        {ACTIONS.map((action) => (
          <button
            key={action.id}
            onClick={() => run(action.id)}
            disabled={loading || loadingRelationships || !relationships.length || simulationDisabled}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 disabled:opacity-50"
          >
            {action.label}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
        {loading ? (
          <p className="text-sm text-white/60">Running simulation...</p>
        ) : error ? (
          <p className="text-sm text-white/60">{error}</p>
        ) : result?.simulation ? (
          <div className="space-y-3 text-sm text-white/70">
            <p>
              <span className="font-medium text-white">Short-term effect:</span>{" "}
              {result.simulation.estimated_short_term_effect}
            </p>
            <p>
              <span className="font-medium text-white">Risk level:</span>{" "}
              {result.simulation.estimated_risk_level}
            </p>
            <p>
              <span className="font-medium text-white">Repair opportunity:</span>{" "}
              {result.simulation.estimated_repair_opportunity}
            </p>
            <p>
              <span className="font-medium text-white">Why:</span> {result.simulation.why}
            </p>
          </div>
        ) : result?.narrative ? (
          <p className="text-sm leading-7 text-white/70">{result.narrative}</p>
        ) : loadingRelationships ? (
          <p className="text-sm text-white/60">Loading relationships...</p>
        ) : !relationships.length ? (
          <p className="text-sm text-white/60">Add a relationship before running a simulation.</p>
        ) : (
          <p className="text-sm text-white/60">Choose an option to preview the likely pattern shift.</p>
        )}
      </div>
    </div>
  )
}
