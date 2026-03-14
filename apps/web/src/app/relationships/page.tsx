"use client"

import { useEffect, useState, useCallback } from "react"
import AppShell from "@/components/layout/AppShell"
import { Plus, X, Users, MessageSquare, Calendar, Zap } from "lucide-react"
import type { Relationship, SystemEvent } from "@/lib/types"
import Link from "next/link"

function TensionDot({ level }: { level: "low" | "moderate" | "high" }) {
  const color = level === "high" ? "bg-red-400" : level === "moderate" ? "bg-amber-400" : "bg-emerald-400"
  return <div className={`h-2 w-2 rounded-full ${color}`} title={level} />
}

function RelationshipDetail({
  relationship,
  events,
  onClose,
}: {
  relationship: Relationship
  events: SystemEvent[]
  onClose: () => void
}) {
  const tensionLevel: "low" | "moderate" | "high" =
    (relationship.tension_score ?? 0) > 0.65 ? "high" : (relationship.tension_score ?? 0) > 0.45 ? "moderate" : "low"

  const relEvents = events.filter((e) => e.relationship_id === relationship.id)

  return (
    <div className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-50">{relationship.target_name}</h2>
          <p className="mt-0.5 text-sm text-zinc-400">{relationship.relationship_type}</p>
        </div>
        <button onClick={onClose} className="rounded-md p-1 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300">
          <X size={16} />
        </button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Tension</p>
          <div className="mt-1 flex items-center gap-2">
            <TensionDot level={tensionLevel} />
            <span className="text-sm font-medium text-zinc-200">{Math.round((relationship.tension_score ?? 0) * 100)}%</span>
          </div>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Trust</p>
          <span className="mt-1 block text-sm font-medium text-zinc-200">{Math.round((relationship.trust_score ?? 0) * 100)}%</span>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Closeness</p>
          <span className="mt-1 block text-sm font-medium text-zinc-200">{Math.round((relationship.closeness_score ?? 0) * 100)}%</span>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Volatility</p>
          <span className="mt-1 block text-sm font-medium text-zinc-200">{Math.round((relationship.volatility_score ?? 0) * 100)}%</span>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Recent events</p>
        {relEvents.length === 0 ? (
          <p className="mt-3 text-sm text-zinc-500">No events logged for this relationship.</p>
        ) : (
          <div className="mt-3 space-y-2">
            {relEvents.slice(0, 5).map((evt) => (
              <div key={evt.id} className="flex items-start gap-2 text-[13px]">
                <div className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                  evt.event_type === "conflict" ? "bg-red-400" :
                  evt.event_type === "repair" ? "bg-emerald-400" : "bg-amber-400"
                }`} />
                <div>
                  <span className="font-medium text-zinc-300">{evt.event_type}</span>
                  <span className="ml-2 text-zinc-500">{evt.notes}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          href="/ai"
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-1.5 text-[13px] font-medium text-zinc-300 transition-colors hover:bg-zinc-800"
        >
          <MessageSquare size={14} /> Ask
        </Link>
        <Link
          href="/timeline"
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-1.5 text-[13px] font-medium text-zinc-300 transition-colors hover:bg-zinc-800"
        >
          <Calendar size={14} /> Log Event
        </Link>
        <Link
          href="/ai"
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-1.5 text-[13px] font-medium text-zinc-300 transition-colors hover:bg-zinc-800"
        >
          <Zap size={14} /> Simulate
        </Link>
      </div>
    </div>
  )
}

export default function RelationshipsPage() {
  const [relationships, setRelationships] = useState<Relationship[]>([])
  const [events, setEvents] = useState<SystemEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Relationship | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ target_name: "", relationship_type: "personal" })
  const [submitting, setSubmitting] = useState(false)

  const loadData = useCallback(async () => {
    try {
      const [relRes, evtRes] = await Promise.all([
        fetch("/api/relationships"),
        fetch("/api/events"),
      ])
      if (relRes.ok) {
        const d = await relRes.json()
        setRelationships(d.relationships ?? d ?? [])
      }
      if (evtRes.ok) {
        const d = await evtRes.json()
        setEvents(d.events ?? d ?? [])
      }
    } catch {} finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadData() }, [loadData])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.target_name.trim()) return
    setSubmitting(true)
    try {
      const res = await fetch("/api/relationships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setFormData({ target_name: "", relationship_type: "personal" })
        setShowForm(false)
        loadData()
      }
    } finally {
      setSubmitting(false)
    }
  }

  const rightPanel = selected ? (
    <RelationshipDetail relationship={selected} events={events} onClose={() => setSelected(null)} />
  ) : undefined

  return (
    <AppShell rightPanel={rightPanel}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-zinc-50">Relationships</h1>
            <p className="mt-1 text-sm text-zinc-400">Map and manage the people in your relational system.</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-50 px-3 py-1.5 text-[13px] font-medium text-zinc-900 transition-colors hover:bg-zinc-200"
          >
            <Plus size={14} />
            Add
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAdd} className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
            <p className="text-[13px] font-medium text-zinc-200">Add a relationship</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[12px] text-zinc-500">Name</label>
                <input
                  value={formData.target_name}
                  onChange={(e) => setFormData({ ...formData, target_name: e.target.value })}
                  placeholder="Their name"
                  className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-zinc-600"
                />
              </div>
              <div>
                <label className="mb-1 block text-[12px] text-zinc-500">Type</label>
                <select
                  value={formData.relationship_type}
                  onChange={(e) => setFormData({ ...formData, relationship_type: e.target.value })}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-zinc-600"
                >
                  <option value="personal">Personal</option>
                  <option value="family">Family</option>
                  <option value="professional">Professional</option>
                  <option value="friend">Friend</option>
                </select>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-md bg-zinc-50 px-4 py-1.5 text-[13px] font-medium text-zinc-900 transition-colors hover:bg-zinc-200 disabled:opacity-50"
              >
                {submitting ? "Adding..." : "Add relationship"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-md px-4 py-1.5 text-[13px] text-zinc-400 transition-colors hover:text-zinc-200"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => <div key={i} className="skeleton h-16 rounded-lg" />)}
          </div>
        ) : relationships.length === 0 ? (
          <div className="rounded-lg border border-dashed border-zinc-800 py-16 text-center">
            <Users size={28} className="mx-auto text-zinc-600" />
            <p className="mt-3 text-sm text-zinc-400">No relationships yet</p>
            <p className="mt-1 text-[13px] text-zinc-500">Add someone to start building your relational map.</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-zinc-50 px-4 py-2 text-[13px] font-medium text-zinc-900 transition-colors hover:bg-zinc-200"
            >
              <Plus size={14} /> Add relationship
            </button>
          </div>
        ) : (
          <div className="divide-y divide-zinc-800 rounded-lg border border-zinc-800">
            {relationships.map((rel) => {
              const tensionLevel: "low" | "moderate" | "high" =
                (rel.tension_score ?? 0) > 0.65 ? "high" : (rel.tension_score ?? 0) > 0.45 ? "moderate" : "low"
              const isSelected = selected?.id === rel.id
              return (
                <button
                  key={rel.id}
                  onClick={() => setSelected(isSelected ? null : rel)}
                  className={`flex w-full items-center gap-4 px-4 py-3 text-left transition-colors hover:bg-zinc-900 ${
                    isSelected ? "bg-zinc-900" : ""
                  }`}
                >
                  <TensionDot level={tensionLevel} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-medium text-zinc-100">{rel.target_name}</p>
                    <p className="text-[12px] text-zinc-500">{rel.relationship_type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[12px] font-mono text-zinc-400">
                      {Math.round((rel.tension_score ?? 0) * 100)}% tension
                    </p>
                    <p className="text-[11px] text-zinc-600">
                      {rel.created_at ? new Date(rel.created_at).toLocaleDateString() : ""}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </AppShell>
  )
}
