import { NextResponse } from "next/server"
import { z } from "zod"
import { createServerClient } from "@/lib/supabase/server"
import { deriveTimingAccuracy, ensureProfile } from "@/lib/profile"

const onboardingSchema = z.object({
  full_name: z.string().trim().optional(),
  dob: z.string().trim().min(1, "dob_required"),
  birth_time: z.string().trim().min(1).nullable().optional(),
  birth_city: z.string().trim().optional(),
  time_confidence: z.enum(["exact", "approximate", "unknown"]).optional(),
})

export async function POST(req: Request) {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const parsed = onboardingSchema.safeParse(body)

  if (!parsed.success) {
    const issue = parsed.error.issues[0]
    const message = issue?.message === "dob_required" ? "dob_required" : "invalid_onboarding_payload"
    return NextResponse.json({ error: message }, { status: 400 })
  }

  const input = parsed.data
  const timingAccuracy = deriveTimingAccuracy(input.birth_time, input.time_confidence)

  const birthlinePayload = {
    user_id: user.id,
    dob: input.dob,
    birth_time: input.birth_time ?? null,
    birth_city: input.birth_city ?? null,
    timing_accuracy: timingAccuracy,
    birth_time_confidence: input.time_confidence ?? "unknown",
    updated_at: new Date().toISOString(),
  }

  const { error: birthlineError } = await supabase
    .from("birthlines")
    .upsert(birthlinePayload, { onConflict: "user_id" })

  if (birthlineError) {
    return NextResponse.json({ error: birthlineError.message }, { status: 500 })
  }

  await ensureProfile(supabase, {
    userId: user.id,
    fullName: input.full_name,
    birthDate: input.dob,
    birthTime: input.birth_time ?? "",
    birthPlace: input.birth_city,
    timeConfidence: input.time_confidence ?? "unknown",
  })

  return NextResponse.json({
    ok: true,
    user_id: user.id,
    timing_accuracy: timingAccuracy,
  })
}
