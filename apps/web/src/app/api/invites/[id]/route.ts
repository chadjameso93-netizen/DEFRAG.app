import { NextResponse } from "next/server"
import { completeInvite, getInviteById } from "@/lib/data/inviteRepository"
import { getOptionalAuthenticatedUserId } from "@/lib/auth/routeUser"

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  try {
    const invite = await getInviteById(id)
    if (!invite) {
      return NextResponse.json({ error: "Invite not found." }, { status: 404 })
    }

    return NextResponse.json({ invite })
  } catch {
    return NextResponse.json({ error: "Invite storage is unavailable." }, { status: 503 })
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const actorUserId = await getOptionalAuthenticatedUserId()

  const fullName = String(body.fullName || "").trim()
  const birthDate = String(body.birthDate || "").trim()
  const birthTime = String(body.birthTime || "").trim()
  const birthPlace = String(body.birthPlace || "").trim()

  if (!fullName || !birthDate || !birthTime || !birthPlace) {
    return NextResponse.json({ error: "All intake fields are required." }, { status: 400 })
  }

  try {
    const result = await completeInvite(
      id,
      {
        fullName,
        birthDate,
        birthTime,
        birthPlace,
      },
      actorUserId
    )

    if (!result.invite) {
      return NextResponse.json({ error: "Invite not found." }, { status: 404 })
    }

    return NextResponse.json({ ok: true, invite: result.invite, alreadyCompleted: result.alreadyCompleted })
  } catch {
    return NextResponse.json({ error: "Invite storage is unavailable." }, { status: 503 })
  }
}
