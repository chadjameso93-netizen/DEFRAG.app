import { NextResponse } from "next/server"
import { addInvite, getInvites } from "@/lib/data/mockDb"

export async function GET() {
  return NextResponse.json({ invites: getInvites() })
}

export async function POST(req: Request) {
  const body = await req.json()

  const name = String(body.name || "").trim()
  const relationship = String(body.relationship || "personal")
  const deliveryMethod = body.deliveryMethod as "email" | "sms" | "manual"
  const email = body.email ? String(body.email).trim() : undefined
  const phone = body.phone ? String(body.phone).trim() : undefined

  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 })
  }

  if (!["email", "sms", "manual"].includes(deliveryMethod)) {
    return NextResponse.json({ error: "Delivery method is invalid." }, { status: 400 })
  }

  if (deliveryMethod === "email" && !email) {
    return NextResponse.json({ error: "Email is required for email invites." }, { status: 400 })
  }

  if (deliveryMethod === "sms" && !phone) {
    return NextResponse.json({ error: "Phone number is required for SMS invites." }, { status: 400 })
  }

  const invite = addInvite({
    name,
    email,
    phone,
    relationship,
    deliveryMethod,
  })

  return NextResponse.json({ ok: true, invite })
}
