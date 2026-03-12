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
        <div key={rel.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-white">
              {rel.source_name} → {rel.target_name}
            </p>
            <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
              {rel.relationship_type}
            </span>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/40">Tension</p>
              <div className="mt-2 h-2 rounded-full bg-white/10">
                <div className="h-2 rounded-full bg-white" style={{ width: `${Math.max(8, rel.tension_score * 100)}%` }} />
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/40">Trust</p>
              <div className="mt-2 h-2 rounded-full bg-white/10">
                <div className="h-2 rounded-full bg-sky-300" style={{ width: `${Math.max(8, rel.trust_score * 100)}%` }} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
