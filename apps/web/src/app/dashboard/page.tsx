"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import AppShell from "@/components/layout/AppShell"
import { ArrowRight, MessageSquare, TrendingUp, Users, Zap } from "lucide-react"
import type { Relationship, SystemEvent } from "@/lib/types"

function PressureIndicator({ level }: { level: "low" | "moderate" | "high" }) {
  const config = {
    low: { text: "text-emerald-400", label: "Low", dot: "bg-emerald-400" },
    moderate: { text: "text-amber-400", label: "Moderate", dot: "bg-amber-400" },
    high: { text: "text-red-400", label: "High", dot: "bg-red-400" },
  }
  const c = config[level]
  return (
    <div className="flex items-center gap-2">
      <div className={`h-2 w-2 rounded-full ${c.dot}`} />
      <span className={`text-sm font-medium ${c.text}`}>{c.label}</span>
    </div>
  )
}

function Skeleton({ className }: { className?: string }) {
  return <div className={`skeleton ${className ?? ""}`} />
}

function StatCard({ label, value, icon: Icon }: { label: string; value: string; icon: React.ComponentType<{ size?: number; className?: string }> }) {
  return (
    <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-1)] p-4">
      <div className="flex items-center gap-2">
        <Icon size={14} className="text-[var(--text-muted)]" />
        <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">{label}</p>
      </div>
      <p className="mt-2 text-lg font-semibold text-[var(--text-primary)]">{value}</p>
    </div>
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
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Today</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">Your relational field at a glance.</p>
        </div>

        {/* Stats row */}
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-1)] p-4">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-[var(--text-muted)]" />
              <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Field pressure</p>
            </div>
            <div className="mt-2">
              <PressureIndicator level={pressureLevel} />
            </div>
          </div>
          <StatCard label="Relationships" value={String(relationships.length)} icon={Users} />
          <StatCard label="Events tracked" value={String(events.length)} icon={TrendingUp} />
        </div>

        {/* Priority Relationship */}
        {priorityRel && (
          <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-1)] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Priority relationship</p>
                <p className="mt-1 text-base font-medium text-[var(--text-primary)]">{priorityRel.target_name}</p>
                <p className="mt-0.5 text-sm text-[var(--text-secondary)]">
                  {priorityRel.relationship_type} &middot; tension {Math.round((priorityRel.tension_score ?? 0) * 100)}%
                </p>
              </div>
              <PressureIndicator
                level={(priorityRel.tension_score ?? 0) > 0.65 ? "high" : (priorityRel.tension_score ?? 0) > 0.45 ? "moderate" : "low"}
              />
            </div>
            <div className="mt-4">
              <Link href="/relationships" className="text-[13px] font-medium text-[var(--text-secondary)] transition-colors duration-300 hover:text-[var(--text-primary)]">
                View details &rarr;
              </Link>
            </div>
          </div>
        )}

        {/* Suggested Action */}
        <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-1)] p-5">
          <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Suggested action</p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
            {pressureLevel === "high"
              ? "Consider pausing before initiating any difficult conversations today. A calm observation approach is likely more effective right now."
              : pressureLevel === "moderate"
              ? "Short, clear check-ins with your closest relationships may help ease current tension before it builds."
              : "Things are relatively calm. This is a good window for meaningful conversations or gentle reconnection."}
          </p>
          <div className="mt-4">
            <Link
              href="/ai"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--text-primary)] px-4 py-2 text-[13px] font-medium text-[var(--surface-0)] transition-colors duration-300 hover:bg-[var(--surface-2)]"
            >
              <MessageSquare size={14} />
              Ask about a situation
            </Link>
          </div>
        </div>

        {/* Recent Events */}
        <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-1)] p-5">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Recent events</p>
            <Link href="/timeline" className="text-[12px] text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--text-secondary)]">
              View all
            </Link>
          </div>
          {recentEvents.length === 0 ? (
            <div className="mt-4 rounded-lg border border-dashed border-[var(--border-subtle)] py-8 text-center">
              <p className="text-sm text-[var(--text-muted)]">No events yet</p>
              <Link href="/timeline" className="mt-2 inline-block text-[13px] font-medium text-[var(--text-secondary)] transition-colors duration-300 hover:text-[var(--text-primary)]">
                Log your first event &rarr;
              </Link>
            </div>
          ) : (
            <div className="mt-3 space-y-2">
              {recentEvents.map((evt) => (
                <div key={evt.id} className="flex items-start gap-3 rounded-md px-3 py-2 transition-colors duration-300 hover:bg-[var(--surface-2)]/50">
                  <div className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                    evt.event_type === "conflict" ? "bg-red-400" :
                    evt.event_type === "repair" ? "bg-emerald-400" : "bg-amber-400"
                  }`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[13px] font-medium text-[var(--text-primary)]">{evt.event_type}</p>
                      <span className="text-[11px] text-[var(--text-muted)]">{evt.actor} &rarr; {evt.target}</span>
                    </div>
                    <p className="mt-0.5 truncate text-[12px] text-[var(--text-muted)]">{evt.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Empty state for no relationships */}
        {relationships.length === 0 && (
          <div className="rounded-lg border border-dashed border-[var(--border-subtle)] py-12 text-center">
            <Users size={24} className="mx-auto text-[var(--text-muted)]" />
            <p className="mt-3 text-sm text-[var(--text-secondary)]">No relationships mapped yet</p>
            <Link
              href="/relationships"
              className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium text-[var(--text-secondary)] transition-colors duration-300 hover:text-[var(--text-primary)]"
            >
              Add your first relationship <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </AppShell>
  )
}
