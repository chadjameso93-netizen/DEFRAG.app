import { NextResponse } from "next/server"
import { z } from "zod"
import { getRouteUserId } from "@/lib/auth/routeUser"
import { listRelationalEvents } from "@/lib/data/eventRepository"
import { listInsights } from "@/lib/data/insightRepository"
import { listRelationships } from "@/lib/data/relationshipRepository"
import { simulateRelationshipAction, type SimulationAction } from "@/lib/simulations/simulationEngine"
import { enforceLanguageGuardrails } from "@defrag/language-governor"

const simulationSchema = z.object({
  relationship_id: z.string().uuid(),
  action: z.enum(["slow_down", "clarify", "set_boundary", "revisit_later"]),
  context_note: z.string().max(2000).optional(),
})

export async function POST(req: Request) {
  const userId = await getRouteUserId()
  if (!userId) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const parsed = simulationSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid simulation payload", details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  try {
    const guardrail = enforceLanguageGuardrails(parsed.data.context_note ?? "")
    if (guardrail.crisisDetected) {
      return NextResponse.json({
        simulation: null,
        narrative: guardrail.text,
        guardrail: {
          rewritten: guardrail.rewritten,
          issues: guardrail.issues,
          simulation_disabled: true,
        },
      })
    }

    const [relationships, events, insights] = await Promise.all([
      listRelationships(userId),
      listRelationalEvents(userId),
      listInsights(userId),
    ])

    const relationship = relationships.find((item) => item.id === parsed.data.relationship_id)
    if (!relationship) {
      return NextResponse.json({ error: "Relationship not found" }, { status: 404 })
    }

    const relationshipEvents = events.filter(
      (event) =>
        event.relationship_id === relationship.id ||
        event.target === relationship.target_name ||
        event.actor === relationship.target_name
    )
    const latestInsight =
      insights.find((insight) => insight.relationship_id === relationship.id) ?? insights[0] ?? null

    const simulation = simulateRelationshipAction(parsed.data.action as SimulationAction, {
      relationship,
      events: relationshipEvents,
      latestInsight,
    })

    return NextResponse.json({
      simulation,
      guardrail: {
        rewritten: guardrail.rewritten,
        issues: guardrail.issues,
        simulation_disabled: false,
      },
    })
  } catch {
    return NextResponse.json({ error: "Simulation unavailable" }, { status: 503 })
  }
}
