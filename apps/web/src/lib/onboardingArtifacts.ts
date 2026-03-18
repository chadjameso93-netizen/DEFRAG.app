import type { SupabaseClient } from "@supabase/supabase-js"

type JsonRecord = Record<string, unknown>

export interface StarterArtifactInput {
  relationshipName: string
  relationshipType?: string
  relationshipBirthDate?: string
  eventDescription: string
  insightText: string
}

export interface StarterArtifacts {
  relationshipId: string | null
  eventId: string | null
  insight: string
  dailyRead: string
}

function buildStarterDailyRead(input: StarterArtifactInput) {
  const relationship = input.relationshipName.trim() || "this person"
  const event = input.eventDescription.trim()

  const summary = event.length > 140 ? `${event.slice(0, 137)}…` : event

  return `Start simple with ${relationship} today. What feels charged may not need a big response yet. Keep the next move easy to receive, stay close to what is actually known, and avoid turning "${summary}" into a bigger story before you have more signal.`
}

function getOnboardingState(profile: JsonRecord | null | undefined) {
  const symbolic = (profile?.symbolic_profile_json as JsonRecord | null | undefined) ?? {}
  return {
    symbolic,
    onboarding: (symbolic.onboarding as JsonRecord | null | undefined) ?? {},
  }
}

export async function persistStarterArtifacts(
  supabase: SupabaseClient,
  userId: string,
  input: StarterArtifactInput,
): Promise<StarterArtifacts> {
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("symbolic_profile_json")
    .eq("user_id", userId)
    .single()

  if (profileError) throw profileError

  const { symbolic, onboarding } = getOnboardingState(profile as JsonRecord)
  const existingInsight = typeof onboarding.starter_insight === "string" ? onboarding.starter_insight : null
  const existingDailyRead =
    typeof onboarding.starter_daily_read === "string" ? onboarding.starter_daily_read : null

  let relationshipId =
    typeof onboarding.starter_relationship_id === "string" ? onboarding.starter_relationship_id : null
  let eventId = typeof onboarding.starter_event_id === "string" ? onboarding.starter_event_id : null

  if (!relationshipId) {
    const { data: relationship, error } = await supabase
      .from("relationships")
      .insert({
        user_id: userId,
        source_name: "You",
        target_name: input.relationshipName.trim(),
        relationship_type: input.relationshipType || "other",
        tension_score: 0.35,
        trust_score: 0.5,
        tension_level: "low",
        closeness_score: 0.5,
        volatility_score: 0.3,
      })
      .select("id")
      .single()

    if (error) throw error
    relationshipId = relationship.id
  }

  if (!eventId) {
    const { data: event, error } = await supabase
      .from("system_events")
      .insert({
        user_id: userId,
        relationship_id: relationshipId,
        event_type: "observation",
        actor: "You",
        target: input.relationshipName.trim() || "Other",
        severity: 0.4,
        notes: input.eventDescription.trim(),
      })
      .select("id")
      .single()

    if (error) throw error
    eventId = event.id
  }

  const dailyRead = existingDailyRead || buildStarterDailyRead(input)
  const starterInsight = existingInsight || input.insightText

  const nextSymbolic: JsonRecord = {
    ...symbolic,
    onboarding: {
      ...onboarding,
      starter_relationship_id: relationshipId,
      starter_event_id: eventId,
      starter_relationship_name: input.relationshipName.trim(),
      starter_relationship_type: input.relationshipType || "other",
      starter_relationship_birth_date: input.relationshipBirthDate || null,
      starter_event_description: input.eventDescription.trim(),
      starter_insight: starterInsight,
      starter_daily_read: dailyRead,
      completed_at: onboarding.completed_at || new Date().toISOString(),
    },
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ symbolic_profile_json: nextSymbolic })
    .eq("user_id", userId)

  if (updateError) throw updateError

  return {
    relationshipId,
    eventId,
    insight: starterInsight,
    dailyRead,
  }
}
