import { NextResponse } from "next/server"
import { completeInviteIntake, getInvite } from "@/lib/data/mockDb"

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const invite = getInvite(id)

  if (!invite) {
    return NextResponse.json({ error: "Invite not found." }, { status: 404 })
  }

  return NextResponse.json({ invite })
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const invite = completeInviteIntake(id, {
    fullName: body.fullName || "",
    birthDate: body.birthDate || "",
    birthTime: body.birthTime || "",
    birthPlace: body.birthPlace || "",
  })

  if (!invite) {
    return NextResponse.json({ error: "Invite not found." }, { status: 404 })
  }

  return NextResponse.json({ ok: true, invite })
}
