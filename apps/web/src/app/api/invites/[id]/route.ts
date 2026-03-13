import { NextResponse } from "next/server"
import { z } from "zod"
import { completeInvite, getInviteByToken, markInviteOpened } from "@/lib/data/inviteRepository"
import { getRouteUserId } from "@/lib/auth/routeUser"

const completeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  birthDate: z.string().min(1, "Birth date is required"),
  birthTime: z.string().min(1, "Birth time is required"),
  birthLocation: z.string().min(1, "Birth location is required"),
})

function asId(value: string | string[] | undefined) {
  if (!value) return null
  return Array.isArray(value) ? value[0] : value
}

export async function GET(_req: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params
  const id = asId(params.id)

  if (!id) {
    return NextResponse.json({ error: "Invite id required" }, { status: 400 })
  }

  try {
    const invite = await getInviteByToken(id)
    if (!invite) {
      return NextResponse.json({ error: "Invite not found" }, { status: 404 })
    }

    // Invite open should remain public-safe; auth context is optional metadata.
    let actorUserId: string | null = null
    try {
      actorUserId = await getRouteUserId()
    } catch {
      actorUserId = null
    }
    await markInviteOpened(id, actorUserId)

    return NextResponse.json({ invite })
  } catch {
    return NextResponse.json({ error: "Invite storage unavailable" }, { status: 503 })
  }
}

export async function POST(req: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params
  const id = asId(params.id)

  if (!id) {
    return NextResponse.json({ error: "Invite id required" }, { status: 400 })
  }

  const body = await req.json().catch(() => null)
  const parsed = completeSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid intake payload", details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  try {
    const actorUserId = await getRouteUserId()
    const result = await completeInvite({
      tokenOrId: id,
      submission: parsed.data,
      actorUserId,
    })

    if (result.notFound) {
      return NextResponse.json({ error: "Invite not found" }, { status: 404 })
    }

    return NextResponse.json({ ok: true, alreadyCompleted: result.alreadyCompleted, invite: result.invite })
  } catch {
    return NextResponse.json({ error: "Invite storage unavailable" }, { status: 503 })
  }
}
