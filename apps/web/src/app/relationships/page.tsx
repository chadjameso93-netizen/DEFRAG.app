import AppShell from "@/components/layout/AppShell"
import RelationshipList from "@/components/relationships/RelationshipList"
import { mockRelationships } from "@/lib/mock/systemData"

export default function RelationshipsPage() {
  return (
    <AppShell title="Relationships" subtitle="View your current relationship system, including tension and trust across key connections.">
      <RelationshipList relationships={mockRelationships} />
    </AppShell>
  )
}
