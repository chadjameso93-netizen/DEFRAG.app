type EventItem = {
  id: string
  event_type: string
  actor: string
  target: string
  severity: number
  notes: string
  created_at: string
}

export default function EventTimeline({ events }: { events: EventItem[] }) {
  const guidance = buildGuidance(events)

  return (
    <div className="space-y-4">
      {guidance ? (
        <div className="rounded-[22px] border border-white/10 bg-black/20 p-4 text-sm text-white/70">
          {guidance}
        </div>
      ) : null}
      {events.map((event) => (
        <div
          key={event.id}
          className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:border-white/15 hover:bg-white/[0.06]"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
              {event.event_type}
            </p>
            <p className="text-xs text-white/45">{new Date(event.created_at).toLocaleString()}</p>
          </div>

          <p className="mt-4 text-sm text-white/75">
            <span className="font-medium text-white">{event.actor}</span> →{" "}
            <span className="font-medium text-white">{event.target}</span>
          </p>

          <p className="mt-3 text-sm leading-7 text-white/60">{event.notes}</p>

          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.18em] text-white/40">Severity</p>
              <p className="text-xs text-white/55">{Math.round(event.severity * 100)}%</p>
            </div>
            <div className="h-2 rounded-full bg-white/10">
              <div
                className="h-2 rounded-full bg-[#e9dfcf]"
                style={{ width: `${Math.max(8, event.severity * 100)}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function buildGuidance(events: EventItem[]) {
  if (!events.length) return "Add a few events to unlock timing guidance."

  const recent = events[0]
  if (recent.event_type === "conflict") {
    return "Recent tension suggests this conversation may escalate if addressed immediately."
  }
  if (recent.event_type === "repair") {
    return "Recent repair suggests this may be a better time to revisit the topic."
  }
  if (recent.event_type === "withdrawal") {
    return "Distance has been increasing; a gentle check‑in may lower pressure."
  }
  return "Timing looks neutral; consider what would reduce pressure before the next step."
}
