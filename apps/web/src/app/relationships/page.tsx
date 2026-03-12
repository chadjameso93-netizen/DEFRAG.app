import AppShell from "@/components/layout/AppShell"
import RelationshipList from "@/components/relationships/RelationshipList"
import { mockRelationships } from "@/lib/mock/systemData"

export default function RelationshipsPage() {
  return (
    <AppShell title="Relationships" subtitle="Track trust, tension, and the current shape of your relationship system.">
      <RelationshipList relationships={mockRelationships} />
    </AppShell>
  )
}
