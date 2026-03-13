import AppShell from "@/components/layout/AppShell"
import PremiumPanel from "@/components/ui/PremiumPanel"
import InfoCard from "@/components/ui/InfoCard"
import RelationshipList from "@/components/relationships/RelationshipList"
import AddRelationshipForm from "@/components/relationships/AddRelationshipForm"
import { mockRelationships } from "@/lib/mock/systemData"

export default function RelationshipsPage() {
  return (
    <AppShell title="Relationships" subtitle="Build and maintain the relationship layer of the platform.">
      <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
        <InfoCard
          eyebrow="Purpose"
          title="Map the people in the system"
          body="Track the connections that meaningfully affect the dynamic you are trying to understand."
        />
        <InfoCard
          eyebrow="Use"
          title="Review trust and tension"
          body="Each relationship can be reviewed through connection type, tension level, and overall trust pattern."
        />
        <InfoCard
          eyebrow="Outcome"
          title="Create a clearer system view"
          body="This makes it easier to spot where strain, influence, or repair potential is actually located."
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr] xl:gap-6">
        <PremiumPanel className="p-5 sm:p-6">
          <h3 className="text-lg font-medium text-white">Relationship overview</h3>
          <p className="mt-2 text-sm leading-7 text-white/60">
            Review the active people in your system and how each connection is currently functioning.
          </p>
          <div className="mt-6">
            <RelationshipList relationships={mockRelationships} />
          </div>
        </PremiumPanel>

        <AddRelationshipForm />
      </div>
    </AppShell>
  )
}
