import AppShell from "@/components/layout/AppShell"
import DashboardHero from "@/components/dashboard/DashboardHero"
import StatCard from "@/components/dashboard/StatCard"
import PremiumPanel from "@/components/ui/PremiumPanel"
import RelationshipGraph from "@/components/graph/RelationshipGraph"
import FamilyGraph from "@/components/genogram/FamilyGraph"
import AIChat from "@/components/chat/AIChat"
import EventTimeline from "@/components/timeline/EventTimeline"
import RelationshipList from "@/components/relationships/RelationshipList"
import SimulationPanel from "@/components/sim/SimulationPanel"
import { mockEvents, mockRelationships } from "@/lib/mock/systemData"

export default function DashboardPage() {
  return (
    <AppShell
      title="Dashboard"
      subtitle="This is your main Defrag workspace. Track relationships, review timelines, explore simulations, and get AI guidance in one place."
    >
      <DashboardHero />

      <section className="grid gap-4 sm:gap-6 md:grid-cols-3">
        <StatCard label="Relationships" value="3" note="Active connections currently mapped in your system." />
        <StatCard label="Recent events" value="2" note="Key moments currently shaping the active pattern." />
        <StatCard label="Next step" value="Review" note="Use the timeline and simulation tools before acting." />
      </section>

      <section className="grid gap-4 lg:gap-6 2xl:grid-cols-[1.15fr_0.85fr]">
        <PremiumPanel className="p-5 sm:p-6">
          <h2 className="text-lg font-medium text-white">Relationship map</h2>
          <p className="mt-2 text-sm text-white/60">Visualize the current people, structure, and pressure points in your system.</p>
          <div className="mt-6">
            <RelationshipGraph />
          </div>
        </PremiumPanel>

        <PremiumPanel className="p-5 sm:p-6">
          <AIChat />
        </PremiumPanel>
      </section>

      <section className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        <PremiumPanel className="p-5 sm:p-6">
          <h2 className="text-lg font-medium text-white">Family system</h2>
          <p className="mt-2 text-sm text-white/60">See the wider family structure and how roles may influence the present dynamic.</p>
          <div className="mt-6">
            <FamilyGraph />
          </div>
        </PremiumPanel>

        <PremiumPanel className="p-5 sm:p-6">
          <SimulationPanel />
        </PremiumPanel>
      </section>

      <section className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        <PremiumPanel className="p-5 sm:p-6">
          <h2 className="text-lg font-medium text-white">Relationship list</h2>
          <p className="mt-2 text-sm text-white/60">Review trust, tension, and connection type across your mapped relationships.</p>
          <div className="mt-6">
            <RelationshipList relationships={mockRelationships} />
          </div>
        </PremiumPanel>

        <PremiumPanel className="p-5 sm:p-6">
          <h2 className="text-lg font-medium text-white">Timeline</h2>
          <p className="mt-2 text-sm text-white/60">Understand how conflict, repair, and other events are shaping the pattern over time.</p>
          <div className="mt-6">
            <EventTimeline events={mockEvents} />
          </div>
        </PremiumPanel>
      </section>
    </AppShell>
  )
}
