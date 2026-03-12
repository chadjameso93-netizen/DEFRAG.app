import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    status: "trial",
    plan: "core",
    trialEndsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
  })
}
