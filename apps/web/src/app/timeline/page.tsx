import AppShell from "@/components/layout/AppShell"
import EventTimeline from "@/components/timeline/EventTimeline"
import { mockEvents } from "@/lib/mock/systemData"

export default function TimelinePage() {
  return (
    <AppShell title="Timeline" subtitle="Review the moments that are shaping the current dynamic.">
      <EventTimeline events={mockEvents} />
    </AppShell>
  )
}
