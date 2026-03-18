import { NextResponse } from "next/server"
import { z } from "zod"
import { createServerClient } from "@/lib/supabase/server"
import { runInsightPipeline } from "@/lib/ai/pipeline"
import { persistStarterArtifacts } from "@/lib/onboardingArtifacts"

const onboardingBootstrapSchema = z.object({
  relationship_name: z.string().trim().min(1, "relationship_name_required"),
  relationship_type: z.string().trim().optional(),
  relationship_birth_date: z.string().trim().optional(),
  event_description: z.string().trim().min(10, "event_description_required"),
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
  const parsed = onboardingBootstrapSchema.safeParse(body)

  if (!parsed.success) {
    const issue = parsed.error.issues[0]
    return NextResponse.json({ error: issue?.message || "invalid_onboarding_bootstrap" }, { status: 400 })
  }

  const input = parsed.data

  try {
    const insight = await runInsightPipeline({
      message: input.event_description,
      relationship_name: input.relationship_name,
      relationship_type: input.relationship_type,
    })

    const artifacts = await persistStarterArtifacts(supabase, user.id, {
      relationshipName: input.relationship_name,
      relationshipType: input.relationship_type,
      relationshipBirthDate: input.relationship_birth_date,
      eventDescription: input.event_description,
      insightText: insight.output_text,
    })

    return NextResponse.json({
      ok: true,
      relationship_id: artifacts.relationshipId,
      event_id: artifacts.eventId,
      insight: artifacts.insight,
      daily_read: artifacts.dailyRead,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "onboarding_bootstrap_failed"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
