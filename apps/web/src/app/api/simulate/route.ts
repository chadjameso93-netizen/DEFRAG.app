import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  return NextResponse.json({
    outcome: "Simulation indicates calm clarification has highest success probability.",
    probability: 0.63,
    scenario: body
  })
}
