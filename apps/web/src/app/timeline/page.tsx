"use client"
import { useEffect, useState, useCallback } from "react"
import AppShell from "@/components/layout/AppShell"
import { Plus, X, Calendar, MessageSquare, Info, Activity } from "lucide-react"
import type { Relationship, SystemEvent } from "@/lib/types"
import Link from "next/link"
import { Panel } from "@/components/ui/Panel"
import { Button } from "@/components/ui/Button"

function ActivationIndicator({ level }: { level: "supportive" | "soft" | "fragile" }) {
  const opacity = level === "fragile" ? "opacity-100" : level === "soft" ? "opacity-60" : "opacity-30"
  return <div className={`h-1.5 w-1.5 rounded-full bg-[#EAEAEA] ${opacity}`} title={level} />
}

function EventIndicator({ type }: { type: string }) {
  const opacity = type === "conflict" ? "opacity-100" : type === "repair" ? "opacity-40" : "opacity-70"
  return <div className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#EAEAEA] ${opacity}`} />
}

function Skeleton({ className }: { className?: string }) {
  return <div className={`skeleton ${className ?? ""}`} />
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
    <div className="p-8 flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
           <Info size={14} className="text-[#4F6BFF]" />
           <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#555555]">System Entry</span>
        </div>
        <button onClick={onClose} className="rounded-full p-2 text-[#555555] transition-all hover:bg-[#111] hover:text-[#EAEAEA]">
          <X size={18} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <label className="text-[11px] font-bold uppercase tracking-widest text-[#555555]">Event Type</label>
            <select
              value={form.event_type}
              onChange={(e) => setForm({ ...form, event_type: e.target.value })}
              className="bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-4 focus:border-[#4F6BFF] focus:outline-none transition-all text-[#EAEAEA] text-[15px] font-light appearance-none"
            >
              <option value="observation">Observation</option>
              <option value="conflict">Conflict</option>
              <option value="repair">Repair</option>
              <option value="stress">Stress</option>
              <option value="connection">Connection</option>
            </select>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[11px] font-bold uppercase tracking-widest text-[#555555]">Relational Focus</label>
            <select
              value={form.relationship_id}
              onChange={(e) => setForm({ ...form, relationship_id: e.target.value })}
              className="bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-4 focus:border-[#4F6BFF] focus:outline-none transition-all text-[#EAEAEA] text-[15px] font-light appearance-none"
            >
              <option value="">General Field</option>
              {relationships.map((r) => (
                <option key={r.id} value={r.id}>{r.target_name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[11px] font-bold uppercase tracking-widest text-[#555555]">Severity Matrix</label>
            <div className="p-4 border border-[#1F1F1F] rounded-[12px] bg-[#000000] flex flex-col gap-4">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={form.severity}
                onChange={(e) => setForm({ ...form, severity: parseFloat(e.target.value) })}
                className="w-full accent-[#EAEAEA]"
              />
              <div className="flex justify-between text-[11px] font-mono text-[#333] uppercase tracking-widest">
                <span>Low</span>
                <span>{Math.round(form.severity * 100)}%</span>
                <span>High</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[11px] font-bold uppercase tracking-widest text-[#555555]">Operational Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="What structural shift occurred?"
              rows={4}
              className="bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-4 focus:border-[#4F6BFF] focus:outline-none transition-all text-[#EAEAEA] text-[15px] font-light resize-none leading-relaxed"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            type="submit"
            disabled={submitting || !form.notes.trim()}
            className="w-full h-12"
          >
            {submitting ? "Writing Log..." : "Commence Logging"}
          </Button>
          <Button
            variant="ghost"
            type="button"
            onClick={onClose}
            className="w-full h-12"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

function getBandForDate(events: SystemEvent[], dateStr: string): "supportive" | "soft" | "fragile" {
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
      <div className="animate-[page-enter_0.5s_ease_both] space-y-12 max-w-[1200px] mx-auto pb-20">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold tracking-tight text-[#EAEAEA]">Timeline</h1>
            <p className="text-[15px] text-[#9A9A9A] font-light">The historical architecture of your relational system.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/ai" className="hidden sm:block">
              <Button variant="secondary" className="px-6 h-11">
                <Activity size={16} /> Plan Session
              </Button>
            </Link>
            <Button
              onClick={() => setShowAddPanel(true)}
              className="px-6 h-11"
            >
              <Plus size={18} />
              Log Event
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-24" />)}
          </div>
        ) : events.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-[#1F1F1F] py-32 text-center flex flex-col items-center gap-6">
            <Calendar size={32} className="text-[#333]" />
            <div className="flex flex-col gap-2">
              <p className="text-[16px] text-[#EAEAEA] font-medium">Timeline Empty</p>
              <p className="text-[14px] text-[#555555] max-w-[320px]">Begin tracking events to see the evolution of your relational system.</p>
            </div>
            <Button onClick={() => setShowAddPanel(true)} className="px-8">
              <Plus size={18} /> Log First Event
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-16">
            {sortedDates.map((date) => {
              const dayEvents = grouped.get(date) ?? []
              const band = getBandForDate(events, date)
              const dateObj = new Date(date + "T12:00:00")
              const isToday = date === new Date().toISOString().split("T")[0]

              return (
                <div key={date} className="flex flex-col gap-8">
                  {/* Date header */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 pr-4 border-r border-[#111]">
                       <span className="text-[14px] font-semibold text-[#EAEAEA]">
                         {isToday ? "Today" : dateObj.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                       </span>
                       <ActivationIndicator level={band} />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#333]">
                      {dayEvents.length} Recorded Signal{dayEvents.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Event list */}
                  <div className="grid gap-4">
                    {dayEvents.map((evt) => (
                      <Panel
                        key={evt.id}
                        className="p-8 flex items-start gap-8 hover:border-[#333] transition-colors duration-500 shadow-2xl overflow-hidden group"
                      >
                        <EventIndicator type={evt.event_type} />
                        <div className="flex-1 flex flex-col gap-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                               <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#EAEAEA]">{evt.event_type}</span>
                               <span className="text-[12px] text-[#EAEAEA] opacity-20 group-hover:opacity-40 transition-opacity">/</span>
                               <span className="text-[12px] text-[#555555] font-medium">{evt.actor} &rarr; {evt.target}</span>
                            </div>
                            {evt.created_at && (
                              <span className="text-[11px] font-mono text-[#333] uppercase">
                                {new Date(evt.created_at).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                              </span>
                            )}
                          </div>
                          <p className="text-[15px] font-light leading-relaxed text-[#9A9A9A] max-w-3xl">{evt.notes}</p>
                        </div>
                      </Panel>
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
