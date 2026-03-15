"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import AppShell from "@/components/layout/AppShell"
import { MessageSquare, TrendingUp, Users, Zap, Map, Target } from "lucide-react"
import type { Relationship, SystemEvent } from "@/lib/types"
import SystemMap from "@/components/dashboard/SystemMap"
import { Panel } from "@/components/ui/Panel"
import { Button } from "@/components/ui/Button"

function PressureIndicator({ level }: { level: "low" | "moderate" | "high" }) {
  const config = {
    low: { label: "Low", opacity: "opacity-40" },
    moderate: { label: "Moderate", opacity: "opacity-70" },
    high: { label: "High", opacity: "opacity-100" },
  }
  const c = config[level]
  return (
    <div className="flex items-center gap-2">
      <div className={`h-1.5 w-1.5 rounded-full bg-[#EAEAEA] ${c.opacity}`} />
      <span className={`text-[13px] font-medium text-[#EAEAEA] ${c.opacity}`}>{c.label}</span>
    </div>
  )
}

function Skeleton({ className }: { className?: string }) {
  return <div className={`skeleton ${className ?? ""}`} />
}

function StatCard({ label, value, icon: Icon }: { label: string; value: string; icon: React.ComponentType<{ size?: number; className?: string }> }) {
  return (
    <Panel className="p-5 flex flex-col justify-between hover:border-[#333] transition-colors duration-500">
      <div className="flex items-center gap-2">
        <Icon size={14} className="text-[#555555]" />
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#555555]">{label}</p>
      </div>
      <p className="mt-4 text-2xl font-semibold text-[#EAEAEA] tracking-tight">{value}</p>
    </Panel>
  )
}

export default function DashboardPage() {
  const [relationships, setRelationships] = useState<Relationship[]>([])
  const [events, setEvents] = useState<SystemEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [relRes, evtRes] = await Promise.all([
          fetch("/api/relationships"),
          fetch("/api/events"),
        ])
        if (relRes.ok) {
          const relData = await relRes.json()
          setRelationships(relData.relationships ?? relData ?? [])
        }
        if (evtRes.ok) {
          const evtData = await evtRes.json()
          setEvents(evtData.events ?? evtData ?? [])
        }
      } catch {
        // Fallback to empty state
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const avgTension = relationships.length
    ? relationships.reduce((sum, r) => sum + (r.tension_score ?? 0), 0) / relationships.length
    : 0
  const pressureLevel: "low" | "moderate" | "high" =
    avgTension > 0.65 ? "high" : avgTension > 0.45 ? "moderate" : "low"

  const priorityRel = [...relationships].sort((a, b) => (b.tension_score ?? 0) - (a.tension_score ?? 0))[0]
  const recentEvents = events.slice(0, 3)

  if (loading) {
    return (
      <AppShell>
        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <div className="grid gap-4 sm:grid-cols-3">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
          <Skeleton className="h-48" />
          <Skeleton className="h-36" />
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="animate-[page-enter_0.5s_ease_both] space-y-8 max-w-[1200px] mx-auto pb-20">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight text-[#EAEAEA]">Workspace Overview</h1>
          <p className="text-[15px] text-[#9A9A9A] font-light">Your relational field and active trajectories.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Panel className="p-5 flex flex-col justify-between hover:border-[#333] transition-colors duration-500">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-[#555555]" />
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#555555]">Field pressure</p>
            </div>
            <div className="mt-4">
              <PressureIndicator level={pressureLevel} />
            </div>
          </Panel>
          <StatCard label="Relationships" value={String(relationships.length)} icon={Users} />
          <StatCard label="System Events" value={String(events.length)} icon={TrendingUp} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* System Map Visualization */}
            <Panel className="p-0 overflow-hidden hover:border-[#333] transition-colors duration-500">
              <div className="px-8 py-6 border-b border-[#1A1A1A] flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <Map size={14} className="text-[#555555]"/>
                   <span className="text-[10px] font-bold uppercase tracking-widest text-[#555555]">Expression Map</span>
                </div>
                <div className="h-1.5 w-1.5 rounded-full bg-[#EAEAEA] opacity-40 animate-pulse" />
              </div>
              <div className="p-8">
                <SystemMap relationships={relationships} />
              </div>
            </Panel>

            {/* Recent Trajectory Log */}
            <Panel className="flex flex-col gap-8 hover:border-[#333] transition-colors duration-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <TrendingUp size={14} className="text-[#555555]"/>
                   <span className="text-[10px] font-bold uppercase tracking-widest text-[#555555]">Recent Trajectories</span>
                </div>
                <Link href="/timeline" className="text-[10px] uppercase font-bold tracking-widest text-[#555555] hover:text-[#9A9A9A] transition-colors">
                  View Timeline &rarr;
                </Link>
              </div>
              
              {recentEvents.length === 0 ? (
                <div className="rounded-[12px] border border-dashed border-[#1F1F1F] py-12 text-center">
                  <p className="text-[13px] text-[#555555]">No events logged in this cycle.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {recentEvents.map((evt) => (
                    <div key={evt.id} className="group flex items-center justify-between p-4 border border-[#111] bg-[#050505] rounded-[12px] hover:border-[#333] transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#EAEAEA] opacity-40 group-hover:opacity-100 transition-opacity" />
                        <div className="flex flex-col gap-1">
                          <span className="text-[13px] text-[#EAEAEA] font-medium uppercase tracking-tight">{evt.event_type}</span>
                          <span className="text-[11px] text-[#555555]">{evt.actor} &rarr; {evt.target}</span>
                        </div>
                      </div>
                      <span className="text-[11px] text-[#555555] font-mono">{new Date(evt.created_at).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </Panel>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {/* Priority Focus */}
            {priorityRel && (
              <Panel className="flex flex-col gap-6 hover:border-[#333] transition-colors duration-500">
                <div className="flex items-center gap-3">
                   <Target size={14} className="text-[#555555]"/>
                   <span className="text-[10px] font-bold uppercase tracking-widest text-[#555555]">System Focus</span>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-[18px] font-semibold text-[#EAEAEA]">{priorityRel.target_name}</h3>
                  <p className="text-[13px] text-[#9A9A9A]">{priorityRel.relationship_type}</p>
                </div>
                <div className="pt-6 border-t border-[#1A1A1A] flex flex-col gap-2">
                   <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-[#555555]">
                      <span>Tension</span>
                      <span>{Math.round((priorityRel.tension_score ?? 0) * 100)}%</span>
                   </div>
                   <div className="h-1 w-full bg-[#111] rounded-full overflow-hidden">
                      <div className="h-full bg-[#EAEAEA] opacity-40" style={{ width: `${(priorityRel.tension_score ?? 0) * 100}%` }} />
                   </div>
                </div>
                <Link href="/relationships">
                  <Button variant="outline" className="w-full text-[12px] h-10">
                    Analyze Depth
                  </Button>
                </Link>
              </Panel>
            )}

            {/* Active Guidance */}
            <Panel className="flex flex-col gap-6 bg-[#0A0A0A] border-l-2 border-l-[#EAEAEA] hover:border-[#333] transition-colors duration-500">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#555555]">System Insight</span>
              <p className="text-[14px] leading-relaxed text-[#9A9A9A] font-light">
                {pressureLevel === "high"
                  ? "Field pressure is critical. Structural pause recommended. Non-engagement is the optimal trajectory for the next 48 hours."
                  : pressureLevel === "moderate"
                  ? "Elevated friction detected. Small, low-stakes interactions are required to stabilize the system before deep dives."
                  : "Field pressure is minimal. This is the optimal window for addressing structural boundary issues."}
              </p>
              <Link href="/ai">
                <Button className="w-full text-[12px] h-10">
                  <MessageSquare size={14} className="mr-2" />
                  Run Situation Parse
                </Button>
              </Link>
            </Panel>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
