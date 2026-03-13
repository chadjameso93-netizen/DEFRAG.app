import { NextResponse } from "next/server"
import { completeInvite, getInviteById } from "@/lib/data/inviteRepository"

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const invite = await getInviteById(id)

  if (!invite) {
    return NextResponse.json({ error: "Invite not found." }, { status: 404 })
  }

  return NextResponse.json({ invite })
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()

  const fullName = String(body.fullName || "").trim()
  const birthDate = String(body.birthDate || "").trim()
  const birthTime = String(body.birthTime || "").trim()
  const birthPlace = String(body.birthPlace || "").trim()

  if (!fullName || !birthDate || !birthTime || !birthPlace) {
    return NextResponse.json({ error: "All intake fields are required." }, { status: 400 })
  }

  const result = await completeInvite(id, {
    fullName,
    birthDate,
    birthTime,
    birthPlace,
  })

  if (!result.invite) {
    return NextResponse.json({ error: "Invite not found." }, { status: 404 })
  }

  return NextResponse.json({ ok: true, invite: result.invite, alreadyCompleted: result.alreadyCompleted })
}
