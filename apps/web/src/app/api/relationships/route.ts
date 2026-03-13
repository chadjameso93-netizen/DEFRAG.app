import { NextResponse } from "next/server"
import { z } from "zod"
import { getRouteUserId } from "@/lib/auth/routeUser"
import { createRelationship, listRelationships } from "@/lib/data/relationshipRepository"

const createRelationshipSchema = z.object({
  sourceName: z.string().min(1).max(120).optional(),
  targetName: z.string().min(1).max(120),
  relationshipType: z.string().min(1).max(80).optional(),
  tensionScore: z.number().min(0).max(1).optional(),
  trustScore: z.number().min(0).max(1).optional(),
})

export async function GET() {
  const userId = await getRouteUserId()
  if (!userId) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 })
  }

  try {
    const relationships = await listRelationships(userId)
    return NextResponse.json({ relationships })
  } catch {
    return NextResponse.json({ error: "Relationship storage unavailable" }, { status: 503 })
  }
}

export async function POST(req: Request) {
  const userId = await getRouteUserId()
  if (!userId) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const parsed = createRelationshipSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid relationship payload", details: parsed.error.flatten() }, { status: 400 })
  }

  try {
    const relationship = await createRelationship({
      userId,
      sourceName: parsed.data.sourceName ?? "You",
      targetName: parsed.data.targetName,
      relationshipType: parsed.data.relationshipType ?? "personal",
      tensionScore: parsed.data.tensionScore ?? 0.35,
      trustScore: parsed.data.trustScore ?? 0.5,
    })

    return NextResponse.json({ ok: true, relationship }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Relationship storage unavailable" }, { status: 503 })
  }
}
