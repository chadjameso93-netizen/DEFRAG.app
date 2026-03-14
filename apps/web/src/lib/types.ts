// Canonical types from the DEFRAG spec

export interface Profile {
  id?: string
  user_id: string
  full_name: string
  birth_date: string
  birth_time: string
  birth_place: string
  time_confidence: "exact" | "approximate" | "unknown"
  symbolic_profile_json?: Record<string, unknown>
}

export interface Relationship {
  id: string
  user_id: string
  source_name: string
  target_name: string
  relationship_type: string
  tension_level: "low" | "moderate" | "high"
  tension_score: number
  trust_score: number
  closeness_score: number
  volatility_score: number
  created_at: string
}

export interface SystemEvent {
  id: string
  user_id: string
  relationship_id?: string
  event_type: string
  actor: string
  target: string
  severity: number
  notes: string
  created_at: string
}

export interface Entitlement {
  user_id: string
  plan: "free" | "solo" | "team"
  status: "trialing" | "active" | "past_due" | "canceled"
  stripe_customer_id?: string
  stripe_subscription_id?: string
  trial_ends_at?: string
  current_period_end?: string
  insights_used_this_month: number
  insights_reset_at: string
}

export interface InsightRun {
  id: string
  user_id: string
  relationship_id?: string
  input_json: Record<string, unknown>
  output_text: string
  proof_json: ProofJson
  model: string
  tokens_in: number
  tokens_out: number
  cost_usd: number
  created_at: string
}

export interface ProofJson {
  intent: {
    type: "conflict_preparation" | "emotional_processing" | "timing_question" | "pattern_question"
    goal: string
  }
  context_summary: {
    user_blueprint: string
    other_blueprint: string
    relationship_state: string
    recent_events: string[]
  }
  patterns_detected: Array<{
    name: string
    evidence: string[]
    confidence: "low" | "medium" | "high"
  }>
  timing_assessment: {
    pressure_level: "low" | "moderate" | "high"
    support_for_direct_conversation: "low" | "medium" | "high"
    notes: string
  }
  relational_hypothesis: {
    user_experience: string
    other_experience: string
    dynamic_summary: string
  }
}

export interface StripeEvent {
  id: string
  type: string
  payload: Record<string, unknown>
  created_at: string
}

export const PLAN_LIMITS = {
  free: { relationships: 2, insights_per_month: 5, simulations: false, timeline: "minimal", deep_dives: false },
  solo: { relationships: 50, insights_per_month: 150, simulations: true, timeline: "full", deep_dives: true },
  team: { relationships: 200, insights_per_month: 500, simulations: true, timeline: "full", deep_dives: true },
} as const
