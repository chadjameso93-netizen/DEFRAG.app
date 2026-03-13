import { NextResponse } from "next/server"
import { z } from "zod"
import { createRelationalEvent, listRelationalEvents } from "@/lib/data/eventRepository"
import { getRouteUserId } from "@/lib/auth/routeUser"

const createEventSchema = z.object({
  relationshipId: z.string().uuid().optional(),
  eventType: z.string().min(2).max(80),
  actor: z.string().min(1).max(120).optional(),
  target: z.string().min(1).max(120).optional(),
  severity: z.number().min(0).max(1).optional(),
  notes: z.string().max(1200).optional(),
  occurredAt: z.string().datetime().optional(),
})

export async function GET() {
  const userId = await getRouteUserId()
  if (!userId) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 })
  }

  try {
    const events = await listRelationalEvents(userId)
    return NextResponse.json({ events })
  } catch {
    return NextResponse.json({ error: "Event storage unavailable" }, { status: 503 })
  }
}

export async function POST(req: Request) {
  const userId = await getRouteUserId()
  if (!userId) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const parsed = createEventSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid event payload", details: parsed.error.flatten() }, { status: 400 })
  }

  try {
    const event = await createRelationalEvent({
      userId,
      relationshipId: parsed.data.relationshipId ?? null,
      eventType: parsed.data.eventType,
      actor: parsed.data.actor ?? "You",
      target: parsed.data.target ?? null,
      severity: parsed.data.severity ?? 0.4,
      notes: parsed.data.notes ?? null,
      occurredAt: parsed.data.occurredAt,
    })

    return NextResponse.json({ ok: true, event }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Event storage unavailable" }, { status: 503 })
  }
}
