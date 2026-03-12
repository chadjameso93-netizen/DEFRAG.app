import AppShell from "@/components/layout/AppShell"
import StatCard from "@/components/dashboard/StatCard"
import Surface from "@/components/ui/Surface"
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
      title="Relational intelligence"
      subtitle="A clearer view of your current system, relationship pressure, and likely communication patterns."
    >
      <section className="grid gap-4 sm:gap-6 md:grid-cols-3">
        <StatCard label="System state" value="Elevated" note="Recent conflict signals suggest higher sensitivity." />
        <StatCard label="Repair potential" value="Moderate" note="Small clarifications may improve outcomes." />
        <StatCard label="Daily insight" value="Pause first" note="Allow a beat before reacting to sensitive messages." />
      </section>

      <section className="grid gap-6 2xl:grid-cols-[1.15fr_0.85fr]">
        <Surface className="p-5 sm:p-6">
          <h2 className="text-lg font-medium text-zinc-950">Relationship map</h2>
          <p className="mt-2 text-sm text-zinc-600">Visual overview of the current relationship system.</p>
          <div className="mt-6">
            <RelationshipGraph />
          </div>
        </Surface>

        <Surface className="p-5 sm:p-6">
          <AIChat />
        </Surface>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Surface className="p-5 sm:p-6">
          <h2 className="text-lg font-medium text-zinc-950">Family system map</h2>
          <p className="mt-2 text-sm text-zinc-600">View the wider family pattern and key roles.</p>
          <div className="mt-6">
            <FamilyGraph />
          </div>
        </Surface>

        <Surface className="p-5 sm:p-6">
          <SimulationPanel />
        </Surface>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Surface className="p-5 sm:p-6">
          <h2 className="text-lg font-medium text-zinc-950">Current relationships</h2>
          <p className="mt-2 text-sm text-zinc-600">Track trust and tension across your current system.</p>
          <div className="mt-6">
            <RelationshipList relationships={mockRelationships} />
          </div>
        </Surface>

        <Surface className="p-5 sm:p-6">
          <h2 className="text-lg font-medium text-zinc-950">Event timeline</h2>
          <p className="mt-2 text-sm text-zinc-600">Review the moments shaping the current pattern.</p>
          <div className="mt-6">
            <EventTimeline events={mockEvents} />
          </div>
        </Surface>
      </section>
    </AppShell>
  )
}
