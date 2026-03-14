"use client"

import { useEffect, useState, useCallback } from "react"
import AppShell from "@/components/layout/AppShell"
import { Plus, X, Calendar, MessageSquare } from "lucide-react"
import type { Relationship, SystemEvent } from "@/lib/types"
import Link from "next/link"

type BandLevel = "supportive" | "soft" | "fragile"

function ActivationBand({ level }: { level: BandLevel }) {
  const config = {
    supportive: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400", label: "Supportive" },
    soft: { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400", label: "Soft" },
    fragile: { bg: "bg-red-500/10", border: "border-red-500/20", text: "text-red-400", label: "Fragile" },
  }
  const c = config[level]
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${c.bg} ${c.border} ${c.text}`}>
      {c.label}
    </span>
  )
}

function EventDot({ type }: { type: string }) {
  const color =
    type === "conflict" ? "bg-red-400" :
    type === "repair" ? "bg-emerald-400" :
    type === "stress" ? "bg-amber-400" : "bg-zinc-500"
  return <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${color}`} />
}

function AddEventPanel({
  relationships,
  onClose,
  onAdded,
}: {
  relationships: Relationship[]
  onClose: () => void
  onAdded: () => void
}) {
  const [form, setForm] = useState({
    event_type: "observation",
    notes: "",
    relationship_id: "",
    severity: 0.4,
  })
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.notes.trim()) return
    setSubmitting(true)
    try {
      const rel = relationships.find((r) => r.id === form.relationship_id)
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_type: form.event_type,
          notes: form.notes,
          relationship_id: form.relationship_id || undefined,
          actor: "You",
          target: rel?.target_name ?? "Other",
          severity: form.severity,
        }),
      })
      if (res.ok) {
        setForm({ event_type: "observation", notes: "", relationship_id: "", severity: 0.4 })
        onAdded()
        onClose()
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-50">Log event</h2>
        <button onClick={onClose} className="rounded-md p-1 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300">
          <X size={16} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <div>
          <label className="mb-1 block text-[12px] text-zinc-500">Type</label>
          <select
            value={form.event_type}
            onChange={(e) => setForm({ ...form, event_type: e.target.value })}
            className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-600"
          >
            <option value="observation">Observation</option>
            <option value="conflict">Conflict</option>
            <option value="repair">Repair</option>
            <option value="stress">Stress</option>
            <option value="connection">Connection</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-[12px] text-zinc-500">Relationship</label>
          <select
            value={form.relationship_id}
            onChange={(e) => setForm({ ...form, relationship_id: e.target.value })}
            className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-600"
          >
            <option value="">General</option>
            {relationships.map((r) => (
              <option key={r.id} value={r.id}>{r.target_name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-[12px] text-zinc-500">Severity</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={form.severity}
            onChange={(e) => setForm({ ...form, severity: parseFloat(e.target.value) })}
            className="w-full accent-zinc-400"
          />
          <div className="flex justify-between text-[11px] text-zinc-500">
            <span>Low</span>
            <span>{Math.round(form.severity * 100)}%</span>
            <span>High</span>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-[12px] text-zinc-500">What happened?</label>
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Describe the event..."
            rows={3}
            className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-600"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={submitting || !form.notes.trim()}
            className="rounded-md bg-zinc-50 px-4 py-1.5 text-[13px] font-medium text-zinc-900 transition-colors hover:bg-zinc-200 disabled:opacity-50"
          >
            {submitting ? "Saving..." : "Log event"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-4 py-1.5 text-[13px] text-zinc-400 transition-colors hover:text-zinc-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

function getBandForDate(events: SystemEvent[], dateStr: string): BandLevel {
  const dayEvents = events.filter((e) => e.created_at?.startsWith(dateStr))
  if (dayEvents.length === 0) return "supportive"
  const avgSeverity = dayEvents.reduce((sum, e) => sum + (e.severity ?? 0), 0) / dayEvents.length
  if (avgSeverity > 0.65) return "fragile"
  if (avgSeverity > 0.4) return "soft"
  return "supportive"
}

function groupEventsByDate(events: SystemEvent[]): Map<string, SystemEvent[]> {
  const groups = new Map<string, SystemEvent[]>()
  for (const evt of events) {
    const date = evt.created_at ? evt.created_at.split("T")[0] : "unknown"
    if (!groups.has(date)) groups.set(date, [])
    groups.get(date)!.push(evt)
  }
  return groups
}

export default function TimelinePage() {
  const [events, setEvents] = useState<SystemEvent[]>([])
  const [relationships, setRelationships] = useState<Relationship[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddPanel, setShowAddPanel] = useState(false)

  const loadData = useCallback(async () => {
    try {
      const [evtRes, relRes] = await Promise.all([
        fetch("/api/events"),
        fetch("/api/relationships"),
      ])
      if (evtRes.ok) {
        const d = await evtRes.json()
        setEvents(d.events ?? d ?? [])
      }
      if (relRes.ok) {
        const d = await relRes.json()
        setRelationships(d.relationships ?? d ?? [])
      }
    } catch {} finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadData() }, [loadData])

  const grouped = groupEventsByDate(events)
  const sortedDates = [...grouped.keys()].sort((a, b) => b.localeCompare(a))

  const rightPanel = showAddPanel ? (
    <AddEventPanel
      relationships={relationships}
      onClose={() => setShowAddPanel(false)}
      onAdded={loadData}
    />
  ) : undefined

  return (
    <AppShell rightPanel={rightPanel}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-zinc-50">Timeline</h1>
            <p className="mt-1 text-sm text-zinc-400">Track what happened, when, and how it shaped the current pattern.</p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/ai"
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-1.5 text-[13px] font-medium text-zinc-300 transition-colors hover:bg-zinc-800"
            >
              <MessageSquare size={14} /> Plan a conversation
            </Link>
            <button
              onClick={() => setShowAddPanel(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-50 px-3 py-1.5 text-[13px] font-medium text-zinc-900 transition-colors hover:bg-zinc-200"
            >
              <Plus size={14} /> Log event
            </button>
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="skeleton h-20 rounded-lg" />)}
          </div>
        ) : events.length === 0 ? (
          <div className="rounded-lg border border-dashed border-zinc-800 py-16 text-center">
            <Calendar size={28} className="mx-auto text-zinc-600" />
            <p className="mt-3 text-sm text-zinc-400">No events logged yet</p>
            <p className="mt-1 text-[13px] text-zinc-500">Log your first event to start tracking relational patterns.</p>
            <button
              onClick={() => setShowAddPanel(true)}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-zinc-50 px-4 py-2 text-[13px] font-medium text-zinc-900 transition-colors hover:bg-zinc-200"
            >
              <Plus size={14} /> Log event
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedDates.map((date) => {
              const dayEvents = grouped.get(date) ?? []
              const band = getBandForDate(events, date)
              const dateObj = new Date(date + "T12:00:00")
              const isToday = date === new Date().toISOString().split("T")[0]

              return (
                <div key={date} className="relative">
                  {/* Date header with activation band */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-zinc-200">
                        {isToday ? "Today" : dateObj.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                      </p>
                      <ActivationBand level={band} />
                    </div>
                    <div className="h-px flex-1 bg-zinc-800" />
                    <p className="text-[11px] text-zinc-500">{dayEvents.length} event{dayEvents.length !== 1 ? "s" : ""}</p>
                  </div>

                  {/* Event list */}
                  <div className="mt-3 space-y-1">
                    {dayEvents.map((evt) => (
                      <div
                        key={evt.id}
                        className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-zinc-900"
                      >
                        <EventDot type={evt.event_type} />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] font-medium text-zinc-200">{evt.event_type}</span>
                            <span className="text-[11px] text-zinc-500">{evt.actor} → {evt.target}</span>
                            {evt.created_at && (
                              <span className="ml-auto text-[11px] text-zinc-600">
                                {new Date(evt.created_at).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-[12px] leading-relaxed text-zinc-400">{evt.notes}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </AppShell>
  )
}
