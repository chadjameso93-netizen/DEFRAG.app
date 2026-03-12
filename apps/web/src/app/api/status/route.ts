import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    ok: true,
    web: "running",
    build: "active",
  })
}
