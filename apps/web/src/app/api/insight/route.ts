import { NextResponse } from "next/server"
import { generateInsight } from "@/lib/ai/engine"

export async function POST(req: Request) {

  const body = await req.json()

  const insight = await generateInsight(body)

  return NextResponse.json({ insight })
}
