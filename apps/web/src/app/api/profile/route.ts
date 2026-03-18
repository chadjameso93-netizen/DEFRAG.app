import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getOptionalAuthenticatedUserId } from "@/lib/auth/routeUser"
import { ensureProfile } from "@/lib/profile"

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
  try {
    const profile = await ensureProfile(supabase, {
      userId,
      fullName: full_name,
      birthDate: birth_date,
      birthTime: birth_time,
      birthPlace: birth_place,
      timeConfidence: time_confidence,
    })

    return NextResponse.json({ ok: true, profile })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Profile update failed."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  return PUT(req)
}
