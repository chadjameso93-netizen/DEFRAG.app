type RelationshipItem = {
  id: string
  source_name: string
  target_name: string
  relationship_type: string
  tension_score: number
  trust_score: number
}

export default function RelationshipList({
  relationships,
}: {
  relationships: RelationshipItem[]
}) {
  return (
    <div className="space-y-4">
      {relationships.map((rel) => (
        <div key={rel.id} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-zinc-950">
              {rel.source_name} → {rel.target_name}
            </p>
            <span className="w-fit rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
              {rel.relationship_type}
            </span>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Tension</p>
              <div className="mt-2 h-2 rounded-full bg-zinc-100">
                <div className="h-2 rounded-full bg-zinc-900" style={{ width: `${Math.max(8, rel.tension_score * 100)}%` }} />
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Trust</p>
              <div className="mt-2 h-2 rounded-full bg-zinc-100">
                <div className="h-2 rounded-full bg-zinc-400" style={{ width: `${Math.max(8, rel.trust_score * 100)}%` }} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
