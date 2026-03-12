import AppShell from "@/components/layout/AppShell"
import PremiumPanel from "@/components/ui/PremiumPanel"
import InfoCard from "@/components/ui/InfoCard"
import EventTimeline from "@/components/timeline/EventTimeline"
import AddEventForm from "@/components/timeline/AddEventForm"
import { mockEvents } from "@/lib/mock/systemData"

export default function TimelinePage() {
  return (
    <AppShell
      title="Timeline"
      subtitle="Track what happened, when it happened, and how it shaped the current pattern."
    >
      <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
        <InfoCard eyebrow="Purpose" title="Log key moments" body="Capture the events that changed the system, including conflict, repair, stress, or meaningful observations." />
        <InfoCard eyebrow="Use" title="Follow sequence, not fragments" body="The timeline helps you understand how today’s pattern formed instead of reacting to a single moment." />
        <InfoCard eyebrow="Outcome" title="See the build-up clearly" body="This creates better context for simulations, dashboard interpretation, and future decisions." />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr] xl:gap-6">
        <PremiumPanel className="p-5 sm:p-6">
          <h3 className="text-lg font-medium text-white">Event timeline</h3>
          <p className="mt-2 text-sm leading-7 text-white/60">
            Review the sequence of key moments that are shaping the current dynamic.
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
