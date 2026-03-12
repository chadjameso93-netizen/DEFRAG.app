import { NextResponse } from "next/server"
import { mockRelationships } from "@/lib/mock/systemData"

export async function GET() {
  return NextResponse.json({ relationships: mockRelationships })
}
