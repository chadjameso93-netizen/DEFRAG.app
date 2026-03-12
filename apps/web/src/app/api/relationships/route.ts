import { NextResponse } from "next/server"
import { addRelationship, getRelationships } from "@/lib/data/mockDb"

export async function GET() {
  return NextResponse.json({ relationships: getRelationships() })
}

export async function POST(req: Request) {
  const body = await req.json()

  const relationship = addRelationship({
    source_name: body.source_name || "You",
    target_name: body.target_name || "New Person",
    relationship_type: body.relationship_type || "personal",
    tension_score: body.tension_score ?? 0.35,
    trust_score: body.trust_score ?? 0.5,
  })

  return NextResponse.json({ ok: true, relationship })
}
