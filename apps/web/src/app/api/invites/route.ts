import { NextResponse } from "next/server"
import { createInvite, listInvites } from "@/lib/data/inviteRepository"
import { requireAuthenticatedUserId } from "@/lib/auth/routeUser"

export async function GET() {
  const userId = await requireAuthenticatedUserId()
  if (!userId) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 })
  }

  try {
    const invites = await listInvites(userId)
    return NextResponse.json({ invites })
  } catch {
    return NextResponse.json({ error: "Invite storage is unavailable." }, { status: 503 })
  }
}

export async function POST(req: Request) {
  const userId = await requireAuthenticatedUserId()
  if (!userId) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 })
  }

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

  try {
    const invite = await createInvite({
      name,
      email,
      phone,
      relationship,
      deliveryMethod,
      createdByUserId: userId,
    })

    return NextResponse.json({ ok: true, invite })
  } catch {
    return NextResponse.json({ error: "Invite storage is unavailable." }, { status: 503 })
  }
}
