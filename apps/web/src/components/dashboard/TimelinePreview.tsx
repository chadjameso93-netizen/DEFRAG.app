import Link from "next/link"
import { ArrowRight } from "lucide-react"

type EventItem = {
  id: string
  event_type: string
  actor: string
  target: string
  notes: string
  created_at: string
}

export default function TimelinePreview({ events }: { events: EventItem[] }) {
  const preview = events.slice(0, 3)
  const guidance = buildForwardGuidance(preview)

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Timeline preview</p>
          <h3 className="mt-3 text-lg font-medium text-white">Recent movement and forward awareness</h3>
        </div>
        <Link href="/timeline" className="hidden items-center gap-2 text-sm text-white/65 transition hover:text-white sm:inline-flex">
          Open timeline
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="mt-5 rounded-[24px] border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/70">{guidance}</div>

      <div className="mt-6 space-y-3">
        {preview.map((event) => (
          <div key={event.id} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/42">{event.event_type}</p>
              <p className="text-xs text-white/45">{new Date(event.created_at).toLocaleString()}</p>
            </div>
            <p className="mt-3 text-sm text-white/78">
              <span className="font-medium text-white">{event.actor}</span> with <span className="font-medium text-white">{event.target}</span>
            </p>
            <p className="mt-2 text-sm leading-7 text-white/62">{event.notes}</p>
          </div>
        ))}
      </div>

      <Link href="/timeline" className="mt-5 inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white sm:hidden">
        Open timeline
        <ArrowRight size={16} />
      </Link>
    </div>
  )
}

function buildForwardGuidance(events: EventItem[]) {
  if (!events.length) {
    return "Add a few timeline entries to unlock forward awareness."
  }

  const latest = events[0]
  if (latest.event_type === "conflict") {
    return "Recent tension suggests this conversation may escalate if addressed immediately."
  }
  if (latest.event_type === "repair") {
    return "Recent repair suggests this may be a better time to revisit the topic."
  }
  if (latest.event_type === "withdrawal") {
    return "Distance has been increasing. A short check-in may lower pressure."
  }
  return "Timing looks neutral. Choose the next step that lowers pressure before deeper discussion."
}
