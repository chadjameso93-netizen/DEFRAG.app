import { NextResponse } from "next/server"
import { addEvent, getEvents } from "@/lib/data/mockDb"

export async function GET() {
  return NextResponse.json({ events: getEvents() })
}

export async function POST(req: Request) {
  const body = await req.json()

  const event = addEvent({
    event_type: body.event_type || "observation",
    actor: body.actor || "You",
    target: body.target || "Other",
    severity: body.severity ?? 0.4,
    notes: body.notes || "No notes provided.",
  })

  return NextResponse.json({ ok: true, event })
}
