import { createAdminClient } from "@/lib/supabase/admin"

export type RelationshipRecord = {
  id: string
  user_id: string
  source_name: string
  target_name: string
  relationship_type: string
  tension_score: number
  trust_score: number
  created_at: string
}

export type CreateRelationshipInput = {
  userId: string
  sourceName?: string
  targetName: string
  relationshipType?: string
  tensionScore?: number
  trustScore?: number
}

function mapRecord(row: any): RelationshipRecord {
  return {
    id: String(row.id),
    user_id: String(row.user_id),
    source_name: String(row.source_name),
    target_name: String(row.target_name),
    relationship_type: String(row.relationship_type ?? "personal"),
    tension_score: Number(row.tension_score ?? 0.2),
    trust_score: Number(row.trust_score ?? 0.5),
    created_at: String(row.created_at ?? new Date().toISOString()),
  }
}

export async function createRelationship(input: CreateRelationshipInput): Promise<RelationshipRecord> {
  const admin = createAdminClient()

  const { data, error } = await admin
    .from("relationships")
    .insert({
      user_id: input.userId,
      source_name: input.sourceName ?? "You",
      target_name: input.targetName,
      relationship_type: input.relationshipType ?? "personal",
      tension_score: input.tensionScore ?? 0.35,
      trust_score: input.trustScore ?? 0.5,
    })
    .select("id, user_id, source_name, target_name, relationship_type, tension_score, trust_score, created_at")
    .single()

  if (error || !data) {
    throw error ?? new Error("Unable to create relationship")
  }

  return mapRecord(data)
}

export async function listRelationships(userId: string): Promise<RelationshipRecord[]> {
  const admin = createAdminClient()

  const { data, error } = await admin
    .from("relationships")
    .select("id, user_id, source_name, target_name, relationship_type, tension_score, trust_score, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    throw error
  }

  return (data ?? []).map(mapRecord)
}
