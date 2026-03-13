import { NextResponse } from "next/server"
import { z } from "zod"
import { createInvite, listInvitesByOwner } from "@/lib/data/inviteRepository"
import { getRouteUserId } from "@/lib/auth/routeUser"

const createInviteSchema = z
  .object({
    email: z.string().email().optional(),
    phone: z.string().min(7).max(32).optional(),
    expiresAt: z.string().datetime().optional(),
  })
  .refine((value) => Boolean(value.email || value.phone), {
    message: "Provide email or phone",
  })

function isStorageError(error: unknown) {
  return error instanceof Error || Boolean(error)
}

export async function GET() {
  const userId = await getRouteUserId()
  if (!userId) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 })
  }

  try {
    const invites = await listInvitesByOwner(userId)
    return NextResponse.json({ invites })
  } catch (error) {
    if (isStorageError(error)) {
      return NextResponse.json({ error: "Invite storage unavailable" }, { status: 503 })
    }

    return NextResponse.json({ error: "Unable to list invites" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const userId = await getRouteUserId()
  if (!userId) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const parsed = createInviteSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid invite payload", details: parsed.error.flatten() }, { status: 400 })
  }

  try {
    const invite = await createInvite({
      createdByUserId: userId,
      email: parsed.data.email,
      phone: parsed.data.phone,
      expiresAt: parsed.data.expiresAt,
    })

    return NextResponse.json({ ok: true, invite }, { status: 201 })
  } catch (error) {
    if (isStorageError(error)) {
      return NextResponse.json({ error: "Invite storage unavailable" }, { status: 503 })
    }

    return NextResponse.json({ error: "Unable to create invite" }, { status: 500 })
  }
}
