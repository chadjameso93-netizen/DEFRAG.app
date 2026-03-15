"use client"
import { useEffect, useState, useCallback } from "react"
import AppShell from "@/components/layout/AppShell"
import { Plus, X, Users, Activity, Info } from "lucide-react"
import type { Relationship, SystemEvent } from "@/lib/types"
import Link from "next/link"
import { Panel } from "@/components/ui/Panel"
import { Button } from "@/components/ui/Button"

function TensionIndicator({ level }: { level: "low" | "moderate" | "high" }) {
  const opacity = level === "high" ? "opacity-100" : level === "moderate" ? "opacity-60" : "opacity-30"
  return <div className={`h-1.5 w-1.5 rounded-full bg-[#EAEAEA] ${opacity}`} title={level} />
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
    <div className="p-8 flex flex-col gap-10">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold tracking-tight text-[#EAEAEA]">{relationship.target_name}</h2>
          <p className="text-[13px] text-[#9A9A9A] uppercase tracking-widest">{relationship.relationship_type}</p>
        </div>
        <button onClick={onClose} className="rounded-full p-2 text-[#555555] transition-all hover:bg-[#111] hover:text-[#EAEAEA]">
          <X size={18} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Tension", val: `${Math.round((relationship.tension_score ?? 0) * 100)}%`, indicator: <TensionIndicator level={tensionLevel} /> },
          { label: "Trust", val: `${Math.round((relationship.trust_score ?? 0) * 100)}%` },
          { label: "Closeness", val: `${Math.round((relationship.closeness_score ?? 0) * 100)}%` },
          { label: "Volatility", val: `${Math.round((relationship.volatility_score ?? 0) * 100)}%` },
        ].map((stat, i) => (
          <div key={i} className="bg-[#050505] border border-[#1A1A1A] rounded-[12px] p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-[#555555]">
               {stat.indicator} {stat.label}
            </div>
            <span className="text-[18px] font-semibold text-[#EAEAEA] tabular-nums">{stat.val}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#555555]">Event History</span>
        {relEvents.length === 0 ? (
          <p className="text-[13px] text-[#555555] italic">No active trajectories.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {relEvents.slice(0, 5).map((evt) => (
              <div key={evt.id} className="flex flex-col gap-2 p-4 border border-[#111] bg-[#050505] rounded-[12px]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#9A9A9A]">{evt.event_type}</span>
                  <span className="text-[10px] font-mono text-[#333]">{new Date(evt.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-[13px] leading-relaxed text-[#555555] line-clamp-2">{evt.notes}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <Link href="/ai">
          <Button className="w-full h-12 shadow-2xl">
            <Activity size={16} /> Run Depth Analysis
          </Button>
        </Link>
        <Link href="/timeline">
          <Button variant="secondary" className="w-full h-12">
            <Plus size={16} /> Log System Event
          </Button>
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
      <div className="animate-[page-enter_0.5s_ease_both] space-y-12 max-w-[1200px] mx-auto pb-20">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold tracking-tight text-[#EAEAEA]">Relationships</h1>
            <p className="text-[15px] text-[#9A9A9A] font-light">Structure and analyze your relational network.</p>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="px-6 h-11"
          >
            <Plus size={18} />
            Map Person
          </Button>
        </div>

        {showForm && (
          <Panel className="p-8 border-[#333] shadow-2xl relative">
            <div className="flex items-center gap-3 mb-8">
               <Info size={14} className="text-[#4F6BFF]" />
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#555555]">System Entry</span>
            </div>
            <form onSubmit={handleAdd} className="flex flex-col gap-8">
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="flex flex-col gap-3">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-[#555555]">Identity / Name</label>
                  <input
                    value={formData.target_name}
                    onChange={(e) => setFormData({ ...formData, target_name: e.target.value })}
                    placeholder="e.g. Co-founder"
                    className="bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-4 focus:border-[#4F6BFF] focus:outline-none transition-all text-[#EAEAEA] text-[15px] font-light"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-[#555555]">Relational Type</label>
                  <select
                    value={formData.relationship_type}
                    onChange={(e) => setFormData({ ...formData, relationship_type: e.target.value })}
                    className="bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-4 px-3 focus:border-[#4F6BFF] focus:outline-none transition-all text-[#EAEAEA] text-[15px] font-light appearance-none"
                  >
                    <option value="personal">Personal</option>
                    <option value="family">Family</option>
                    <option value="professional">Professional</option>
                    <option value="friend">Friend</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="px-8 h-12"
                >
                  {submitting ? "Processing..." : "Commence Mapping"}
                </Button>
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="h-12"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Panel>
        )}

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => <div key={i} className="skeleton h-[200px]" />)}
          </div>
        ) : relationships.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-[#1F1F1F] py-32 text-center flex flex-col items-center gap-6">
            <Users size={32} className="text-[#333]" />
            <div className="flex flex-col gap-2">
              <p className="text-[16px] text-[#EAEAEA] font-medium">System Empty</p>
              <p className="text-[14px] text-[#555555] max-w-[320px]">Map your first relationship to begin generating subtext insights.</p>
            </div>
            <Button onClick={() => setShowForm(true)} className="px-8">
              <Plus size={18} /> Map Relationship
            </Button>
          </div>
        ) : (
          <div className="grid gap-[24px] sm:grid-cols-2 lg:grid-cols-3">
            {relationships.map((rel) => {
              const tensionLevel: "low" | "moderate" | "high" =
                (rel.tension_score ?? 0) > 0.65 ? "high" : (rel.tension_score ?? 0) > 0.45 ? "moderate" : "low"
              const isSelected = selected?.id === rel.id
              return (
                <Panel
                  key={rel.id}
                  onClick={() => setSelected(isSelected ? null : rel)}
                  className={`p-[32px] cursor-pointer group transition-all duration-500 hover:-translate-y-1 shadow-2xl overflow-hidden ${
                    isSelected ? "border-[#EAEAEA] ring-1 ring-[#EAEAEA]/10" : "hover:border-[#333]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-8">
                    <TensionIndicator level={tensionLevel} />
                    <span className="text-[10px] font-mono tracking-widest text-[#333] group-hover:text-[#555] transition-colors">
                      ID: {rel.id.slice(0, 8)}
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-1 mb-8">
                    <h3 className="text-[20px] font-semibold text-[#EAEAEA] tracking-tight truncate">{rel.target_name}</h3>
                    <span className="text-[12px] text-[#555555] uppercase tracking-widest leading-none">{rel.relationship_type}</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#111] pt-6">
                    <div className="flex flex-col">
                       <span className="text-[10px] uppercase tracking-widest text-[#333]">Tension</span>
                       <span className="text-[14px] text-[#555555] font-medium font-mono">{Math.round((rel.tension_score ?? 0) * 100)}%</span>
                    </div>
                    <div className="text-[12px] font-medium text-[#555555] group-hover:text-[#EAEAEA] transition-colors">
                      Audit System &rarr;
                    </div>
                  </div>
                </Panel>
              )
            })}
          </div>
        )}
      </div>
    </AppShell>
  )
}
