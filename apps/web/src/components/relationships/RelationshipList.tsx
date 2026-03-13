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
        <div
          key={rel.id}
          className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:border-white/15 hover:bg-white/[0.06]"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-base font-medium text-white">
                {rel.source_name}{" -> "}{rel.target_name}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/40">
                {rel.relationship_type}
              </p>
            </div>

            <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-medium text-white/65">
              Live pattern
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">Tension</p>
                <p className="text-xs text-white/55">{Math.round(rel.tension_score * 100)}%</p>
              </div>
              <div className="h-2 rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-white"
                  style={{ width: `${Math.max(8, rel.tension_score * 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">Trust</p>
                <p className="text-xs text-white/55">{Math.round(rel.trust_score * 100)}%</p>
              </div>
              <div className="h-2 rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full rounded-full bg-[#e9dfcf]"
                  style={{ width: `${Math.max(8, rel.trust_score * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
