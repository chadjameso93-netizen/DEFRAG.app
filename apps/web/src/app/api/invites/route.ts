import { NextResponse } from "next/server"
import { addInvite, getInvites } from "@/lib/data/mockDb"

export async function GET() {
  return NextResponse.json({ invites: getInvites() })
}

export async function POST(req: Request) {
  const body = await req.json()

  const invite = addInvite({
    name: body.name || "New person",
    email: body.email || undefined,
    phone: body.phone || undefined,
    relationship: body.relationship || "personal",
    deliveryMethod: body.deliveryMethod || "manual",
  })

  return NextResponse.json({ ok: true, invite })
}
