import type { SupabaseClient } from "@supabase/supabase-js"

export type TimingAccuracy = "precise" | "noon_default" | "unknown"

export interface EnsureProfileInput {
  userId: string
  fullName?: string
  birthDate?: string
  birthTime?: string | null
  birthPlace?: string
  timeConfidence?: "exact" | "approximate" | "unknown"
}

export async function ensureProfile(supabase: SupabaseClient, input: EnsureProfileInput) {
  const payload = {
    user_id: input.userId,
    full_name: input.fullName ?? "",
    birth_date: input.birthDate ?? "",
    birth_time: input.birthTime ?? "",
    birth_place: input.birthPlace ?? "",
    time_confidence: input.timeConfidence ?? "unknown",
  }

  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("user_id", input.userId)
    .maybeSingle()

  if (existing) {
    const { data, error } = await supabase
      .from("profiles")
      .update(payload)
      .eq("user_id", input.userId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  const { data, error } = await supabase
    .from("profiles")
    .insert(payload)
    .select()
    .single()

  if (error) throw error
  return data
}

export function deriveTimingAccuracy(
  birthTime: string | null | undefined,
  timeConfidence: "exact" | "approximate" | "unknown" | undefined,
): TimingAccuracy {
  if (birthTime) return "precise"
  if (timeConfidence === "unknown") return "unknown"
  return "noon_default"
}
