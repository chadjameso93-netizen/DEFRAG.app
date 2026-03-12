import AppShell from "@/components/layout/AppShell"
import PremiumPanel from "@/components/ui/PremiumPanel"
import EventTimeline from "@/components/timeline/EventTimeline"
import AddEventForm from "@/components/timeline/AddEventForm"
import { mockEvents } from "@/lib/mock/systemData"

export default function TimelinePage() {
  return (
    <AppShell
      title="Timeline"
      subtitle="Track important events over time so you can understand how the current dynamic is forming."
    >
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr] xl:gap-6">
        <PremiumPanel className="p-5 sm:p-6">
          <h3 className="text-lg font-medium text-white">Event timeline</h3>
          <p className="mt-2 text-sm leading-7 text-white/60">
            Use the timeline to log conflict, repair, stress, and observations so the larger pattern becomes clearer.
          </p>
          <div className="mt-6">
            <EventTimeline events={mockEvents} />
          </div>
        </PremiumPanel>

        <AddEventForm />
      </div>
    </AppShell>
  )
}
