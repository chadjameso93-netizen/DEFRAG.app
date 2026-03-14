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
    <div className="relative space-y-0">
      {/* Thin vertical axis line */}
      <div className="absolute left-[11px] top-3 bottom-3 w-px bg-white/[0.06]" />

      {events.map((event, i) => (
        <div
          key={event.id}
          className="group relative flex gap-5 py-4"
        >
          {/* Event dot */}
          <div className="relative z-10 mt-1.5 flex shrink-0 items-center justify-center">
            <div className="h-[8px] w-[8px] rounded-full bg-[var(--text-secondary)] opacity-60 transition-all duration-300 group-hover:scale-[1.4] group-hover:opacity-100" />
          </div>

          {/* Event content */}
          <div className="glass-surface-light flex-1 p-4 transition-all duration-300 group-hover:border-white/[0.08]">
            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
              <p className="typo-label text-[10px]">
                {event.event_type}
              </p>
              <p className="text-xs text-[var(--text-tertiary)]">
                {new Date(event.created_at).toLocaleString()}
              </p>
            </div>

            <p className="mt-3 text-sm text-[var(--text-secondary)]">
              <span className="font-medium text-[var(--text-primary)]">{event.actor}</span>
              {" → "}
              <span className="font-medium text-[var(--text-primary)]">{event.target}</span>
            </p>

            <p className="mt-2 text-sm leading-7 text-[var(--text-tertiary)]">{event.notes}</p>

            <div className="mt-3">
              <div className="mb-1.5 flex items-center justify-between">
                <p className="typo-label text-[9px]">Severity</p>
                <p className="text-xs text-[var(--text-tertiary)]">{Math.round(event.severity * 100)}%</p>
              </div>
              <div className="h-1 rounded-full bg-white/[0.06]">
                <div
                  className="h-1 rounded-full bg-[var(--text-secondary)] transition-all duration-500"
                  style={{ width: `${Math.max(8, event.severity * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
