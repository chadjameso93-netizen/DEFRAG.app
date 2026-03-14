import { createAdminClient } from "@/lib/supabase/admin"
import {
  addInvite as addInviteMock,
  completeInviteIntake as completeInviteMock,
  getInvite as getInviteMock,
  getInvites as getInvitesMock,
  type InviteRecord,
} from "@/lib/data/mockDb"

type IntakePayload = {
  fullName: string
  birthDate: string
  birthTime: string
  birthPlace: string
}

let fallbackWarned = false

function hasDbConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
}

function isProductionLike() {
  const vercelEnv = process.env.VERCEL_ENV
  return process.env.NODE_ENV === "production" || vercelEnv === "preview" || vercelEnv === "production"
}

function allowMockFallback() {
  return process.env.ALLOW_MOCK_INVITE_FALLBACK === "true" && !isProductionLike()
}

function warnFallback(message: string) {
  if (!fallbackWarned) {
    console.warn(`[inviteRepository] mock fallback enabled: ${message}`)
    fallbackWarned = true
  }
}

function withFallback<T>(message: string, fn: () => T): T {
  if (!allowMockFallback()) {
    throw new Error(message)
  }

  warnFallback(message)
  return fn()
}

function deliveryMethodValue(value: string): InviteRecord["deliveryMethod"] {
  if (value === "sms" || value === "manual") return value
  return "email"
}

function statusValue(value: string): InviteRecord["status"] {
  if (value === "draft" || value === "completed") return value
  return "sent"
}

function mapInviteRow(row: any): InviteRecord {
  return {
    id: row.id,
    name: row.name || "New person",
    email: row.email || undefined,
    phone: row.phone || undefined,
    relationship: row.relationship || "personal",
    deliveryMethod: deliveryMethodValue(row.delivery_method || "email"),
    status: statusValue(row.status || "sent"),
    created_at: row.created_at,
  }
}

export async function listInvites(createdByUserId: string): Promise<InviteRecord[]> {
  if (!hasDbConfig()) {
    return withFallback("Database is not configured for invites.", () => getInvitesMock())
  }

  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from("invites")
      .select("id, name, email, phone, relationship, delivery_method, status, created_at")
      .eq("created_by_user_id", createdByUserId)
      .order("created_at", { ascending: false })

    if (error) throw error

    return (data || []).map(mapInviteRow)
  } catch {
    return withFallback("Invite listing failed due to database error.", () => getInvitesMock())
  }
}

export async function getInviteById(id: string): Promise<InviteRecord | undefined> {
  if (!hasDbConfig()) {
    return withFallback("Database is not configured for invite lookup.", () => getInviteMock(id))
  }

  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from("invites")
      .select("id, name, email, phone, relationship, delivery_method, status, created_at")
      .eq("id", id)
      .maybeSingle()

    if (error) throw error
    if (!data) return undefined

    const invite = mapInviteRow(data)

    const { data: submission } = await supabase
      .from("intake_submissions")
      .select("payload_json")
      .eq("invite_id", id)
      .order("submitted_at", { ascending: false })
      .limit(1)
      .maybeSingle()

    const payload = submission?.payload_json as Record<string, string> | null
    if (payload?.fullName) {
      invite.intake = {
        fullName: payload.fullName,
        birthDate: payload.birthDate,
        birthTime: payload.birthTime,
        birthPlace: payload.birthPlace,
      }
    }

    return invite
  } catch {
    return withFallback("Invite lookup failed due to database error.", () => getInviteMock(id))
  }
}

export async function createInvite(payload: {
  name: string
  relationship: string
  deliveryMethod: InviteRecord["deliveryMethod"]
  email?: string
  phone?: string
  createdByUserId: string
}) {
  if (!hasDbConfig()) {
    return withFallback("Database is not configured for invite creation.", () =>
      addInviteMock({
        name: payload.name,
        relationship: payload.relationship,
        deliveryMethod: payload.deliveryMethod,
        email: payload.email,
        phone: payload.phone,
      })
    )
  }

  try {
    const supabase = createAdminClient()
    const token = crypto.randomUUID()

    const { data, error } = await supabase
      .from("invites")
      .insert({
        created_by_user_id: payload.createdByUserId,
        invite_token: token,
        name: payload.name,
        relationship: payload.relationship,
        delivery_method: payload.deliveryMethod,
        email: payload.email || null,
        phone: payload.phone || null,
        status: "sent",
      })
      .select("id, name, email, phone, relationship, delivery_method, status, created_at")
      .single()

    if (error) throw error

    await supabase.from("invite_events").insert({
      invite_id: data.id,
      event_type: "created",
      actor_user_id: payload.createdByUserId,
      context_json: {
        deliveryMethod: payload.deliveryMethod,
      },
    })

    return mapInviteRow(data)
  } catch {
    return withFallback("Invite creation failed due to database error.", () =>
      addInviteMock({
        name: payload.name,
        relationship: payload.relationship,
        deliveryMethod: payload.deliveryMethod,
        email: payload.email,
        phone: payload.phone,
      })
    )
  }
}

export async function markInviteOpened(id: string, actorUserId?: string | null) {
  if (!hasDbConfig()) {
    return withFallback("Database is not configured for invite lifecycle updates.", () => undefined)
  }

  try {
    const supabase = createAdminClient()

    await supabase
      .from("invites")
      .update({
        status: "opened",
        opened_at: new Date().toISOString(),
      })
      .eq("id", id)
      .is("opened_at", null)

    await supabase.from("invite_events").insert({
      invite_id: id,
      event_type: "opened",
      actor_user_id: actorUserId || null,
      context_json: {},
    })
  } catch {
    withFallback("Invite open event failed due to database error.", () => undefined)
  }
}

export async function completeInvite(id: string, intake: IntakePayload, actorUserId?: string | null) {
  if (!hasDbConfig()) {
    const result = withFallback("Database is not configured for intake completion.", () => completeInviteMock(id, intake))
    return {
      invite: result.invite,
      alreadyCompleted: result.alreadyCompleted,
    }
  }

  try {
    const supabase = createAdminClient()

    const { data: current, error: currentError } = await supabase
      .from("invites")
      .select("id, name, email, phone, relationship, delivery_method, status, created_at")
      .eq("id", id)
      .maybeSingle()

    if (currentError) throw currentError
    if (!current) return { invite: undefined, alreadyCompleted: false }

    if (current.status === "completed") {
      return { invite: mapInviteRow(current), alreadyCompleted: true }
    }

    await supabase.from("intake_submissions").insert({
      invite_id: id,
      user_id: actorUserId || null,
      payload_json: intake,
      completion_state: "completed",
    })

    const { data: updated, error: updateError } = await supabase
      .from("invites")
      .update({
        status: "completed",
        completed_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("id, name, email, phone, relationship, delivery_method, status, created_at")
      .single()

    if (updateError) throw updateError

    await supabase.from("invite_events").insert({
      invite_id: id,
      event_type: "completed",
      actor_user_id: actorUserId || null,
      context_json: {},
    })

    const invite = mapInviteRow(updated)
    invite.intake = {
      fullName: intake.fullName,
      birthDate: intake.birthDate,
      birthTime: intake.birthTime,
      birthPlace: intake.birthPlace,
    }

    return { invite, alreadyCompleted: false }
  } catch {
    const result = withFallback("Intake completion failed due to database error.", () => completeInviteMock(id, intake))
    return {
      invite: result.invite,
      alreadyCompleted: result.alreadyCompleted,
    }
  }
}
