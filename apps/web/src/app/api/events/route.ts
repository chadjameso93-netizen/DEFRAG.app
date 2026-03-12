import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    events: [
      {
        id: "evt_1",
        type: "conflict",
        actor: "You",
        target: "Partner",
        severity: 0.7,
        createdAt: new Date().toISOString(),
      },
      {
        id: "evt_2",
        type: "repair",
        actor: "You",
        target: "Partner",
        severity: 0.4,
        createdAt: new Date().toISOString(),
      },
    ],
  })
}
