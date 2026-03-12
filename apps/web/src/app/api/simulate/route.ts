import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()
  const action = body?.action || "wait"

  const outcomes: Record<string, { risk: number; repair: number; note: string }> = {
    direct_confrontation: {
      risk: 0.72,
      repair: 0.18,
      note: "Direct confrontation may increase tension if the system is already activated.",
    },
    calm_boundary: {
      risk: 0.34,
      repair: 0.58,
      note: "A calm boundary often improves clarity, even if the first response is defensive.",
    },
    delay: {
      risk: 0.22,
      repair: 0.41,
      note: "Waiting can reduce immediate friction, but unresolved issues may remain.",
    },
  }

  return NextResponse.json(outcomes[action] || outcomes.delay)
}
