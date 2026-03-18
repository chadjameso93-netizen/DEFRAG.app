"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Activity, ArrowLeft, Calendar, UserRound } from "lucide-react"
import AppShell from "@/components/layout/AppShell"
import { Panel } from "@/components/ui/Panel"
import { Button } from "@/components/ui/Button"
import { getEvents, getRelationships } from "@/lib/api"
import type { Relationship, SystemEvent } from "@/lib/types"

export default function RelationshipDetailPage() {
  const params = useParams<{ id: string }>()
  const relationshipId = typeof params?.id === "string" ? params.id : ""
  const [relationship, setRelationship] = useState<Relationship | null>(null)
  const [events, setEvents] = useState<SystemEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function load() {
      try {
        const [relationshipData, eventData] = await Promise.all([
          getRelationships<Relationship>(),
          getEvents<SystemEvent>(relationshipId),
        ])

        if (!active) return
        setRelationship(relationshipData.relationships.find((item) => item.id === relationshipId) ?? null)
        setEvents(eventData.events ?? [])
      } catch {
        if (!active) return
        setRelationship(null)
        setEvents([])
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    void load()
    return () => {
      active = false
    }
  }, [relationshipId])

  const summary = useMemo(() => {
    if (!relationship) return null

    return [
      { label: "Trust", value: `${Math.round((relationship.trust_score ?? 0) * 100)}%` },
      { label: "Tension", value: `${Math.round((relationship.tension_score ?? 0) * 100)}%` },
      { label: "Closeness", value: `${Math.round((relationship.closeness_score ?? 0) * 100)}%` },
      { label: "Volatility", value: `${Math.round((relationship.volatility_score ?? 0) * 100)}%` },
    ]
  }, [relationship])

  return (
    <AppShell>
      <div className="mx-auto flex max-w-[1080px] flex-col gap-6 pb-20">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <Link href="/relationships" className="inline-flex items-center gap-2 text-sm text-[#9A9A9A] transition hover:text-[#EAEAEA]">
              <ArrowLeft size={14} />
              Back to relationships
            </Link>
            <h1 className="text-3xl font-semibold tracking-tight text-[#EAEAEA]">
              {loading ? "Loading relationship..." : relationship?.target_name ?? "Relationship"}
            </h1>
            <p className="text-[15px] font-light text-[#9A9A9A]">
              See what this looks like, the recent timeline, and where to focus next.
            </p>
          </div>
          <Link href="/app">
            <Button className="h-11 px-5">
              <Activity size={16} />
              Open workspace
            </Button>
          </Link>
        </div>

        {relationship ? (
          <>
            <div className="grid gap-4 md:grid-cols-4">
              {summary?.map((item) => (
                <Panel key={item.label} className="p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#555555]">{item.label}</p>
                  <p className="mt-3 text-2xl font-semibold tracking-tight text-[#EAEAEA]">{item.value}</p>
                </Panel>
              ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <Panel className="p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#555555]">Overview</p>
                <div className="mt-5 space-y-4 text-sm leading-7 text-[#9A9A9A]">
                  <p><span className="text-[#EAEAEA]">Your side:</span> Stay clear, measured, and specific before you push for movement.</p>
                  <p><span className="text-[#EAEAEA]">Their side:</span> This person may respond better to steadiness than pressure.</p>
                  <p><span className="text-[#EAEAEA]">The wider pattern:</span> Use the timeline to separate a temporary spike from a repeating loop.</p>
                </div>
              </Panel>

              <Panel className="p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#555555]">Details</p>
                <div className="mt-5 space-y-4 text-sm text-[#9A9A9A]">
                  <div className="flex items-center gap-3">
                    <UserRound size={16} className="text-[#555555]" />
                    <span>{relationship.relationship_type ?? "Relationship"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-[#555555]" />
                    <span>{events.length} recent timeline {events.length === 1 ? "entry" : "entries"}</span>
                  </div>
                </div>
              </Panel>
            </div>

            <Panel className="p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#555555]">Recent timeline</p>
              <div className="mt-5 space-y-4">
                {events.length > 0 ? (
                  events.map((event) => (
                    <div key={event.id} className="rounded-[20px] border border-[#1F1F1F] bg-[#0A0A0A] p-4">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-sm font-medium text-[#EAEAEA]">{event.event_type ?? "Observation"}</p>
                        <p className="text-xs text-[#555555]">{new Date(event.created_at).toLocaleDateString()}</p>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-[#9A9A9A]">{event.notes}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm leading-7 text-[#9A9A9A]">
                    No timeline entries yet. Add a note in the timeline to make this relationship easier to read.
                  </p>
                )}
              </div>
            </Panel>
          </>
        ) : (
          <Panel className="p-8">
            <p className="text-sm leading-7 text-[#9A9A9A]">
              This relationship could not be loaded yet. Go back to the relationships list and choose a saved person.
            </p>
          </Panel>
        )}
      </div>
    </AppShell>
  )
}
