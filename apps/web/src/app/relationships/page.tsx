import AppShell from "@/components/layout/AppShell"
import PremiumPanel from "@/components/ui/PremiumPanel"
import RelationshipList from "@/components/relationships/RelationshipList"
import AddRelationshipForm from "@/components/relationships/AddRelationshipForm"
import { mockRelationships } from "@/lib/mock/systemData"

export default function RelationshipsPage() {
  return (
    <AppShell
      title="Relationships"
      subtitle="Map the people in your system and track trust, tension, and role type across each connection."
    >
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr] xl:gap-6">
        <PremiumPanel className="p-5 sm:p-6">
          <h3 className="text-lg font-medium text-white">Relationship overview</h3>
          <p className="mt-2 text-sm leading-7 text-white/60">
            This page helps you organize the people in your system and track how each connection is currently functioning.
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
