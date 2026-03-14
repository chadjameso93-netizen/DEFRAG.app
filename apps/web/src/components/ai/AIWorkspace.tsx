"use client"

import Link from "next/link"
import AIChat from "@/components/chat/AIChat"
import PremiumPanel from "@/components/ui/PremiumPanel"

type RelationshipItem = {
  id: string
  source_name: string
  target_name: string
  relationship_type: string
  tension_score: number
  trust_score: number
}

type EventItem = {
  id: string
  event_type: string
  actor: string
  target: string
  notes: string
  created_at: string
}

export default function AIWorkspace({
  relationships,
  events,
}: {
  relationships: RelationshipItem[]
  events: EventItem[]
}) {
  return (
    <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr] xl:gap-6">
      <div className="space-y-4">
        <PremiumPanel className="p-5 sm:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Relationship context</p>
          <h3 className="mt-4 text-lg font-medium text-white">What is active right now</h3>
          <div className="mt-5 space-y-3">
            {relationships.slice(0, 3).map((relationship) => (
              <div key={relationship.id} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-medium text-white">
                  {relationship.source_name} and {relationship.target_name}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/40">{relationship.relationship_type}</p>
                <p className="mt-3 text-sm text-white/65">
                  Pressure {Math.round(relationship.tension_score * 100)}%, trust {Math.round(relationship.trust_score * 100)}%.
                </p>
              </div>
            ))}
          </div>
        </PremiumPanel>

        <PremiumPanel className="p-5 sm:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Timeline context</p>
          <div className="mt-4 space-y-3">
            {events.slice(0, 3).map((event) => (
              <div key={event.id} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-medium text-white">{event.event_type}</p>
                <p className="mt-2 text-sm text-white/65">{event.notes}</p>
              </div>
            ))}
          </div>
          <Link href="/timeline" className="mt-5 inline-flex text-sm text-white/70 transition hover:text-white">
            Review full timeline
          </Link>
        </PremiumPanel>
      </div>

      <PremiumPanel className="p-3 sm:p-4">
        <AIChat />
      </PremiumPanel>
    </div>
  )
}
