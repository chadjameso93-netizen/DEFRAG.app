import { createClient } from "@/lib/supabase/server"
import { PLAN_LIMITS } from "@/lib/types"
import type { Entitlement } from "@/lib/types"

export async function getEntitlement(userId: string): Promise<Entitlement> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("entitlements")
    .select("*")
    .eq("user_id", userId)
    .single()

  if (!data) {
    return {
      user_id: userId,
      plan: "free",
      status: "trialing",
      insights_used_this_month: 0,
      insights_reset_at: new Date().toISOString(),
    }
  }

  return data as Entitlement
}

export function canUseInsights(entitlement: Entitlement): boolean {
  const limits = PLAN_LIMITS[entitlement.plan]
  if (entitlement.status === "canceled" || entitlement.status === "past_due") return false
  return entitlement.insights_used_this_month < limits.insights_per_month
}

export function canUseSimulations(entitlement: Entitlement): boolean {
  if (entitlement.status === "canceled" || entitlement.status === "past_due") return false
  return PLAN_LIMITS[entitlement.plan].simulations
}

export function canUseTimeline(entitlement: Entitlement): boolean {
  if (entitlement.status === "canceled" || entitlement.status === "past_due") return false
  return PLAN_LIMITS[entitlement.plan].timeline === "full"
}
