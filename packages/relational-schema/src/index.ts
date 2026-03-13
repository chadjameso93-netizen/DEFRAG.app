import { z } from "zod"

export const PersonSchema = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string().uuid(),
  name: z.string().min(1),
  role: z.string().min(1).optional(),
  created_at: z.string().optional(),
})

export const RelationshipSchema = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string().uuid(),
  source_person_id: z.string().uuid(),
  target_person_id: z.string().uuid(),
  relationship_type: z.enum(["personal", "family", "work", "other"]),
  tension_score: z.number().min(0).max(1).optional(),
  trust_score: z.number().min(0).max(1).optional(),
  created_at: z.string().optional(),
})

export const EventSchema = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string().uuid(),
  relationship_id: z.string().uuid().optional(),
  event_type: z.enum(["conflict", "repair", "withdrawal", "conversation", "boundary", "stress"]),
  severity: z.number().min(0).max(1),
  notes: z.string().optional(),
  occurred_at: z.string(),
  created_at: z.string().optional(),
})

export const InsightSchema = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string().uuid(),
  relationship_id: z.string().uuid().optional(),
  summary: z.string(),
  confidence: z.number().min(0).max(1),
  evidence: z.array(z.string()).default([]),
  alternate_explanations: z.array(z.string()).default([]),
  created_at: z.string().optional(),
})

export type Person = z.infer<typeof PersonSchema>
export type Relationship = z.infer<typeof RelationshipSchema>
export type Event = z.infer<typeof EventSchema>
export type Insight = z.infer<typeof InsightSchema>
