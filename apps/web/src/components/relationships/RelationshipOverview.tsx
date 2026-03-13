"use client"

import { useEffect, useState } from "react"
import RelationshipList from "@/components/relationships/RelationshipList"

type RelationshipItem = {
  id: string
  source_name: string
  target_name: string
  relationship_type: string
  tension_score: number
  trust_score: number
}

export default function RelationshipOverview() {
  const [relationships, setRelationships] = useState<RelationshipItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/relationships", { cache: "no-store" })
      .then(async (res) => {
        if (res.status === 401) {
          setError("Sign in to load relationships.")
          return
        }

        if (!res.ok) {
          setError("Relationship data is unavailable right now.")
          return
        }

        const data = (await res.json()) as { relationships?: RelationshipItem[] }
        setRelationships(data.relationships ?? [])
      })
      .catch(() => setError("Unable to load relationships."))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-sm text-white/60">Loading relationships…</p>
  if (error) return <p className="text-sm text-white/60">{error}</p>

  if (!relationships.length) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/70">
        No relationships yet. Add a person to start your relationship display.
      </div>
    )
  }

  return <RelationshipList relationships={relationships} />
}
