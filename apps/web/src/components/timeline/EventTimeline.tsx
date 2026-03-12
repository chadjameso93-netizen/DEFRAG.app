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
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              {event.event_type}
            </p>
            <p className="text-xs text-white/45">
              {new Date(event.created_at).toLocaleString()}
            </p>
          </div>

          <p className="mt-3 text-sm text-white/75">
            <span className="font-medium text-white">{event.actor}</span> →{" "}
            <span className="font-medium text-white">{event.target}</span>
          </p>

          <p className="mt-2 text-sm leading-6 text-white/60">{event.notes}</p>
          <p className="mt-3 text-xs text-white/45">Severity: {event.severity}</p>
        </div>
      ))}
    </div>
  )
}
