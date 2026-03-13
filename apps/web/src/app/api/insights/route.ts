import { NextResponse } from "next/server"
import { z } from "zod"
import { getRouteUserId } from "@/lib/auth/routeUser"
import { buildInsight } from "@/lib/insights/relationalInference"
import { createInsight, listInsights } from "@/lib/data/insightRepository"
import { listRelationalEvents } from "@/lib/data/eventRepository"

const generateSchema = z.object({
  relationshipId: z.string().uuid().optional(),
})

export async function GET() {
  const userId = await getRouteUserId()
  if (!userId) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 })
  }

  try {
    const insights = await listInsights(userId)
    return NextResponse.json({ insights })
  } catch {
    return NextResponse.json({ error: "Insight storage unavailable" }, { status: 503 })
  }
}

export async function POST(req: Request) {
  const userId = await getRouteUserId()
  if (!userId) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const parsed = generateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid insight request", details: parsed.error.flatten() }, { status: 400 })
  }

  try {
    const events = await listRelationalEvents(userId)
    const draft = buildInsight(events)

    const insight = await createInsight({
      userId,
      relationshipId: parsed.data.relationshipId ?? null,
      summary: `${draft.summary} ${draft.guidance}`,
      confidence: draft.confidence,
      evidence: draft.evidence,
      alternateExplanations: draft.alternateExplanations,
    })

    return NextResponse.json(
      {
        insight,
        pattern: draft.pattern,
        guidance: draft.guidance,
        features: draft.features,
      },
      { status: 201 }
    )
  } catch {
    return NextResponse.json({ error: "Insight generation unavailable" }, { status: 503 })
  }
}
