import { NextResponse } from "next/server"
import { generateInsight } from "@/lib/engine/relationalEngine"

export async function POST(req: Request) {
  const body = await req.json()
  const insight = generateInsight(body.message)

  return NextResponse.json({ insight })
}
