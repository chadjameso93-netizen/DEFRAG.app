import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    ok: true,
    web: "running",
    auth: "ready",
    billing: "ready",
    data: "mock-db-ready",
  })
}
