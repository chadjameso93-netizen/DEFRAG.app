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
        <div key={event.id} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
              {event.event_type}
            </p>
            <p className="text-xs text-zinc-500">{new Date(event.created_at).toLocaleString()}</p>
          </div>
          <p className="mt-2 text-sm text-zinc-700">
            <span className="font-medium text-zinc-950">{event.actor}</span> →{" "}
            <span className="font-medium text-zinc-950">{event.target}</span>
          </p>
          <p className="mt-2 text-sm leading-6 text-zinc-600">{event.notes}</p>
          <p className="mt-3 text-xs text-zinc-500">Severity: {event.severity}</p>
        </div>
      ))}
    </div>
  )
}
