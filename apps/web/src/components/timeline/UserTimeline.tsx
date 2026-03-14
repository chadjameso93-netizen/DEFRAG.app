"use client"

export default function UserTimeline() {
  const events = [
    { id: 1, label: "Conversation noted", date: "Today" },
    { id: 2, label: "Invitation sent", date: "Yesterday" },
  ]

  return (
    <div className="glass-surface-light p-5">
      <h2 className="text-lg font-medium text-[var(--text-primary)]">User Timeline</h2>

      <div className="relative mt-4">
        {/* Vertical axis */}
        <div className="absolute left-[5px] top-1 bottom-1 w-px bg-white/[0.06]" />

        <ul className="space-y-3">
          {events.map((e) => (
            <li key={e.id} className="flex items-center gap-4 pl-4">
              <div className="h-[6px] w-[6px] shrink-0 rounded-full bg-[var(--text-tertiary)] opacity-60" />
              <span className="text-sm text-[var(--text-secondary)]">
                <span className="text-[var(--text-tertiary)]">{e.date}</span> — {e.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
