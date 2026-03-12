import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()
  const message = body?.message || "No message provided."

  return NextResponse.json({
    insight: `Defrag sees a pattern worth slowing down for. Based on what you shared — "${message}" — the healthiest next step may be to reduce urgency, clarify what you need, and avoid reacting too quickly.`,
  })
}
