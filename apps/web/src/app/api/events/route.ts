import { NextResponse } from "next/server"
import { mockEvents } from "@/lib/mock/systemData"

export async function GET() {
  return NextResponse.json({ events: mockEvents })
}
