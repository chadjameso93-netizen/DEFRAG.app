import { createAdminClient } from "@/lib/supabase/admin"

export type InsightRecord = {
  id: string
  user_id: string
  relationship_id: string | null
  summary: string
  confidence: number
  evidence: string[]
  alternate_explanations: string[]
  created_at: string
}

export type CreateInsightInput = {
  userId: string
  relationshipId?: string | null
  summary: string
  confidence: number
  evidence: string[]
  alternateExplanations: string[]
}

function mapRecord(row: any): InsightRecord {
  return {
    id: String(row.id),
    user_id: String(row.user_id),
    relationship_id: row.relationship_id ?? null,
    summary: String(row.summary),
    confidence: Number(row.confidence ?? 0),
    evidence: Array.isArray(row.evidence) ? row.evidence.map(String) : [],
    alternate_explanations: Array.isArray(row.alternate_explanations)
      ? row.alternate_explanations.map(String)
      : [],
    created_at: String(row.created_at),
  }
}

export async function createInsight(input: CreateInsightInput): Promise<InsightRecord> {
  const admin = createAdminClient()

  const { data, error } = await admin
    .from("insights")
    .insert({
      user_id: input.userId,
      relationship_id: input.relationshipId ?? null,
      summary: input.summary,
      confidence: input.confidence,
      evidence: input.evidence,
      alternate_explanations: input.alternateExplanations,
    })
    .select("id, user_id, relationship_id, summary, confidence, evidence, alternate_explanations, created_at")
    .single()

  if (error || !data) {
    throw error ?? new Error("Unable to create insight")
  }

  return mapRecord(data)
}

export async function listInsights(userId: string): Promise<InsightRecord[]> {
  const admin = createAdminClient()

  const { data, error } = await admin
    .from("insights")
    .select("id, user_id, relationship_id, summary, confidence, evidence, alternate_explanations, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    throw error
  }

  return (data ?? []).map(mapRecord)
}
