import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getOptionalAuthenticatedUserId } from "@/lib/auth/routeUser"

export async function GET(req: Request) {
  const userId = await getOptionalAuthenticatedUserId()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const relationshipId = searchParams.get("relationship_id")

  const supabase = await createClient()
  let query = supabase
    .from("system_events")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(50)

  if (relationshipId) {
    query = query.eq("relationship_id", relationshipId)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ events: data })
}

export async function POST(req: Request) {
  const userId = await getOptionalAuthenticatedUserId()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { event_type, actor, target, severity, notes, relationship_id } = body

  if (!notes || typeof notes !== "string" || !notes.trim()) {
    return NextResponse.json({ error: "notes is required" }, { status: 400 })
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("system_events")
    .insert({
      user_id: userId,
      relationship_id: relationship_id || null,
      event_type: event_type || "observation",
      actor: actor || "You",
      target: target || "Other",
      severity: severity ?? 0.4,
      notes: notes.trim(),
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true, event: data })
}
