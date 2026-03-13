import { NextResponse } from "next/server"
import { z } from "zod"
import { getRouteUserId } from "@/lib/auth/routeUser"
import { buildInsight } from "@/lib/insights/relationalInference"
import { createInsight, listInsights } from "@/lib/data/insightRepository"
import { listRelationalEvents } from "@/lib/data/eventRepository"
import { composeNarrative } from "@defrag/narrative-composer"
import { enforceLanguageGuardrails } from "@defrag/language-governor"

const generateSchema = z.object({
  message: z.string().max(2000).optional(),
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
    const userMessage = parsed.data.message?.trim() ?? ""
    const precheck = enforceLanguageGuardrails(userMessage)

    if (precheck.crisisDetected) {
      return NextResponse.json(
        {
          ok: true,
          narrative: precheck.text,
          guardrail: {
            rewritten: precheck.rewritten,
            issues: precheck.issues,
            simulation_disabled: true,
          },
        },
        { status: 200 }
      )
    }

    const events = await listRelationalEvents(userId)
    const draft = buildInsight(events)

    const composed = composeNarrative({
      acknowledgement: "That sounds like a difficult interaction.",
      patternContext:
        draft.pattern === "recurring_conflict"
          ? "This can follow a pattern where pressure builds and conversations become reactive."
          : "This can follow a pattern where communication shifts based on timing and pressure.",
      insight: draft.summary,
      guidance: draft.guidance,
      reflectionPrompt: "What tends to change when the pace of the conversation slows down?",
    })

    const guarded = enforceLanguageGuardrails(composed.narrative)

    const insight = await createInsight({
      userId,
      relationshipId: parsed.data.relationshipId ?? null,
      summary: guarded.text,
      confidence: draft.confidence,
      evidence: draft.evidence,
      alternateExplanations: draft.alternateExplanations,
    })

    return NextResponse.json(
      {
        ok: true,
        insight,
        narrative: guarded.text,
        pattern: draft.pattern,
        guidance: draft.guidance,
        features: draft.features,
        guardrail: {
          rewritten: guarded.rewritten,
          issues: guarded.issues,
          simulation_disabled: guarded.simulationDisabled,
        },
      },
      { status: 201 }
    )
  } catch {
    return NextResponse.json({ error: "Insight generation unavailable" }, { status: 503 })
  }
}
