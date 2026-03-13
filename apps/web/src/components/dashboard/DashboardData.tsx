"use client"

import { useEffect, useMemo, useState } from "react"
import RelationshipList from "@/components/relationships/RelationshipList"
import EventTimeline from "@/components/timeline/EventTimeline"
import PatternSummary from "@/components/dashboard/PatternSummary"
import BowenDisplay from "@/components/bowen/BowenDisplay"
import { useSession } from "@/hooks/useSession"

type EventRecord = {
  id: string
  event_type: string
  actor: string | null
  target: string | null
  severity: number
  notes: string | null
  occurred_at: string
  created_at: string
}

type InsightRecord = {
  id: string
  summary: string
  confidence: number
}

export function useDashboardData() {
  const { session, loading } = useSession()
  const userId = session?.user?.id
  const [relationships, setRelationships] = useState<any[]>([])
  const [events, setEvents] = useState<EventRecord[]>([])
  const [insights, setInsights] = useState<InsightRecord[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (loading || !userId) return

    async function load() {
      setError(null)
      try {
        const [relRes, evtRes, insightRes] = await Promise.all([
          fetch("/api/relationships", { cache: "no-store" }),
          fetch("/api/events", { cache: "no-store" }),
          fetch("/api/insights", { cache: "no-store" }),
        ])

        if (relRes.ok) {
          const relJson = (await relRes.json()) as { relationships?: any[] }
          setRelationships(relJson.relationships ?? [])
        }

        if (evtRes.status === 401 || insightRes.status === 401) {
          setError("Sign in to load your relational data.")
          return
        }

        if (!evtRes.ok) {
          throw new Error(`Events request failed: ${evtRes.status}`)
        }

        if (!insightRes.ok) {
          throw new Error(`Insights request failed: ${insightRes.status}`)
        }

        const evtJson = (await evtRes.json()) as { events?: EventRecord[] }
        const insightJson = (await insightRes.json()) as { insights?: InsightRecord[] }

        setEvents(evtJson.events ?? [])
        setInsights(insightJson.insights ?? [])
      } catch (err: any) {
        setError(err?.message || "Failed to load dashboard data")
      }
    }

    load()
  }, [loading, userId])

  const timelineEvents = useMemo(() => {
    return events.map((event) => ({
      ...event,
      created_at: event.occurred_at || event.created_at,
      actor: event.actor || "You",
      target: event.target || "",
      notes: event.notes || "",
    }))
  }, [events])

  const latestInsight = insights[0]?.summary || null

  return { loading, userId, error, relationships, timelineEvents, latestInsight }
}

export function DashboardRelationships() {
  const { loading, userId, error, relationships } = useDashboardData()

  if (loading) return <p className="text-sm text-white/60">Loading your system…</p>
  if (!userId) return <p className="text-sm text-white/60">Sign in to load your relational data.</p>
  if (error) return <p className="text-sm text-white/60">{error}</p>

  return <RelationshipList relationships={relationships} />
}

export function DashboardTimeline({ limit }: { limit?: number }) {
  const { loading, userId, error, timelineEvents } = useDashboardData()
  const preview = limit ? timelineEvents.slice(0, limit) : timelineEvents

  if (loading) return <p className="text-sm text-white/60">Loading your system…</p>
  if (!userId) return <p className="text-sm text-white/60">Sign in to load your relational data.</p>
  if (error) return <p className="text-sm text-white/60">{error}</p>

  return <EventTimeline events={preview} />
}

export function DashboardPatternSummary() {
  const { loading, userId, error, latestInsight } = useDashboardData()

  if (loading) return <p className="text-sm text-white/60">Loading insight…</p>
  if (!userId) return <p className="text-sm text-white/60">Sign in to load insight.</p>
  if (error) return <p className="text-sm text-white/60">{error}</p>

  return <PatternSummary summary={latestInsight ?? undefined} />
}

export function DashboardBowenDisplay() {
  const { loading, userId, error, relationships, timelineEvents } = useDashboardData()

  if (loading) return <p className="text-sm text-white/60">Loading relationship display…</p>
  if (!userId) return <p className="text-sm text-white/60">Sign in to load relationship display.</p>
  if (error) return <p className="text-sm text-white/60">{error}</p>

  return <BowenDisplay relationships={relationships} events={timelineEvents} />
}
