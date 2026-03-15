import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getOptionalAuthenticatedUserId } from "@/lib/auth/routeUser"
import { getEntitlement } from "@/lib/entitlements"
import { PLAN_LIMITS } from "@/lib/types"

export async function GET() {
  const userId = await getOptionalAuthenticatedUserId()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("relationships")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ relationships: data })
}

export async function POST(req: Request) {
  const userId = await getOptionalAuthenticatedUserId()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { target_name, relationship_type } = body

  if (!target_name || typeof target_name !== "string" || !target_name.trim()) {
    return NextResponse.json({ error: "target_name is required" }, { status: 400 })
  }

  // Check relationship limit
  const supabase = await createClient()
  const entitlement = await getEntitlement(userId)
  const limit = PLAN_LIMITS[entitlement.plan].relationships

  const { count } = await supabase
    .from("relationships")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)

  if (count !== null && count >= limit) {
    return NextResponse.json(
      { error: `Relationship limit reached (${limit}). Upgrade your plan.` },
      { status: 403 },
    )
  }

  const { data, error } = await supabase
    .from("relationships")
    .insert({
      user_id: userId,
      source_name: "You",
      target_name: target_name.trim(),
      relationship_type: relationship_type || "other",
      tension_score: 0.3,
      trust_score: 0.5,
      tension_level: "low",
      closeness_score: 0.5,
      volatility_score: 0.3,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true, relationship: data })
}
