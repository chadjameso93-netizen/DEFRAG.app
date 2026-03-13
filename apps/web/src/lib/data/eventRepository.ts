import { createAdminClient } from "@/lib/supabase/admin"

export type RelationalEventRecord = {
  id: string
  user_id: string
  relationship_id: string | null
  event_type: string
  actor: string | null
  target: string | null
  severity: number
  notes: string | null
  occurred_at: string
  created_at: string
}

export type CreateRelationalEventInput = {
  userId: string
  relationshipId?: string | null
  eventType: string
  actor?: string | null
  target?: string | null
  severity?: number
  notes?: string | null
  occurredAt?: string
}

function mapRecord(row: any): RelationalEventRecord {
  return {
    id: String(row.id),
    user_id: String(row.user_id),
    relationship_id: row.relationship_id ?? null,
    event_type: String(row.event_type),
    actor: row.actor ?? null,
    target: row.target ?? null,
    severity: Number(row.severity ?? 0),
    notes: row.notes ?? null,
    occurred_at: String(row.occurred_at),
    created_at: String(row.created_at ?? row.occurred_at),
  }
}

export async function createRelationalEvent(input: CreateRelationalEventInput): Promise<RelationalEventRecord> {
  const admin = createAdminClient()

  const { data, error } = await admin
    .from("events")
    .insert({
      user_id: input.userId,
      relationship_id: input.relationshipId ?? null,
      event_type: input.eventType,
      actor: input.actor ?? null,
      target: input.target ?? null,
      severity: input.severity ?? 0.4,
      notes: input.notes ?? null,
      occurred_at: input.occurredAt ?? new Date().toISOString(),
    })
    .select("id, user_id, relationship_id, event_type, actor, target, severity, notes, occurred_at, created_at")
    .single()

  if (error || !data) {
    throw error ?? new Error("Unable to create event")
  }

  return mapRecord(data)
}

export async function listRelationalEvents(userId: string): Promise<RelationalEventRecord[]> {
  const admin = createAdminClient()

  const { data, error } = await admin
    .from("events")
    .select("id, user_id, relationship_id, event_type, actor, target, severity, notes, occurred_at, created_at")
    .eq("user_id", userId)
    .order("occurred_at", { ascending: false })

  if (error) {
    throw error
  }

  return (data ?? []).map(mapRecord)
}
