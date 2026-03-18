import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getOptionalAuthenticatedUserId } from "@/lib/auth/routeUser"

export async function GET() {
  const userId = await getOptionalAuthenticatedUserId()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single()

  if (error || !data) {
    return NextResponse.json({ profile: null })
  }

  return NextResponse.json({ profile: data })
}

export async function PUT(req: Request) {
  const userId = await getOptionalAuthenticatedUserId()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { full_name, birth_date, birth_time, birth_place, time_confidence } = body

  const supabase = await createClient()
  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("user_id", userId)
    .single()

  if (existing) {
    const { data, error } = await supabase
      .from("profiles")
      .update({
        full_name: full_name || undefined,
        birth_date: birth_date || undefined,
        birth_time: birth_time || undefined,
        birth_place: birth_place || undefined,
        time_confidence: time_confidence || undefined,
      })
      .eq("user_id", userId)
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true, profile: data })
  }

  const { data, error } = await supabase
    .from("profiles")
    .insert({
      user_id: userId,
      full_name: full_name || "",
      birth_date: birth_date || "",
      birth_time: birth_time || "",
      birth_place: birth_place || "",
      time_confidence: time_confidence || "unknown",
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true, profile: data })
}

export async function POST(req: Request) {
  return PUT(req)
}
