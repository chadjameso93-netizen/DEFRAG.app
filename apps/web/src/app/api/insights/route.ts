import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getOptionalAuthenticatedUserId } from "@/lib/auth/routeUser"
import { getEntitlement, canUseInsights } from "@/lib/entitlements"
import { runInsightPipeline } from "@/lib/ai/pipeline"

export async function POST(req: Request) {
  const body = await req.json()
  const { message, relationship_name, relationship_type, relationship_id, model } = body

  if (!message || typeof message !== "string" || message.trim().length < 5) {
    return NextResponse.json({ error: "Message must be at least 5 characters" }, { status: 400 })
  }

  const userId = await getOptionalAuthenticatedUserId()

  // Check entitlement if authenticated
  if (userId) {
    const entitlement = await getEntitlement(userId)
    if (!canUseInsights(entitlement)) {
      return NextResponse.json(
        { error: "Insight limit reached for your plan. Upgrade to continue." },
        { status: 403 },
      )
    }
  }

  // Gather context if we have a relationship_id and auth
  let recentEvents: Array<{ event_type: string; notes: string; created_at: string }> = []
  if (userId && relationship_id) {
    const supabase = await createClient()
    const { data: events } = await supabase
      .from("system_events")
      .select("event_type, notes, created_at")
      .eq("user_id", userId)
      .eq("relationship_id", relationship_id)
      .order("created_at", { ascending: false })
      .limit(5)
    if (events) recentEvents = events
  }

  const result = await runInsightPipeline({
    message: message.trim(),
    relationship_name,
    relationship_type,
    recent_events: recentEvents,
    model,
  })

  // Persist insight run and increment usage if authenticated
  if (userId) {
    const supabase = await createClient()

    await supabase.from("insight_runs").insert({
      user_id: userId,
      relationship_id: relationship_id || null,
      input_json: { message, relationship_name, relationship_type },
      output_text: result.output_text,
      proof_json: result.proof_json,
      model: result.model,
      tokens_in: result.tokens_in,
      tokens_out: result.tokens_out,
      cost_usd: result.cost_usd,
    })

    // Increment insight usage counter
    const entitlement = await getEntitlement(userId)
    await supabase
      .from("entitlements")
      .upsert({
        user_id: userId,
        plan: entitlement.plan,
        status: entitlement.status,
        insights_used_this_month: entitlement.insights_used_this_month + 1,
        insights_reset_at: entitlement.insights_reset_at,
      })
  }

  return NextResponse.json({
    output_text: result.output_text,
    proof_json: result.proof_json,
    model: result.model,
    tokens_in: result.tokens_in,
    tokens_out: result.tokens_out,
  })
}
