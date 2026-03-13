import { createAdminClient } from "@/lib/supabase/admin"
import {
  addInvite as addInviteMock,
  completeInviteIntake as completeInviteMock,
  getInvite as getInviteMock,
  getInvites as getInvitesMock,
  type InviteRecord,
} from "@/lib/data/mockDb"

const FALLBACK_USER_ID = "00000000-0000-0000-0000-000000000000"

type IntakePayload = {
  fullName: string
  birthDate: string
  birthTime: string
  birthPlace: string
}

function hasDbConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
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

export async function listInvites(): Promise<InviteRecord[]> {
  if (!hasDbConfig()) {
    return getInvitesMock()
  }

  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from("invites")
      .select("id, name, email, phone, relationship, delivery_method, status, created_at")
      .order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return (data || []).map(mapInviteRow)
  } catch {
    return getInvitesMock()
  }
}

export async function getInviteById(id: string): Promise<InviteRecord | undefined> {
  if (!hasDbConfig()) {
    return getInviteMock(id)
  }

  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from("invites")
      .select("id, name, email, phone, relationship, delivery_method, status, created_at")
      .eq("id", id)
      .maybeSingle()

    if (error) {
      throw error
    }

    if (!data) {
      return undefined
    }

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
    return getInviteMock(id)
  }
}

export async function createInvite(payload: {
  name: string
  relationship: string
  deliveryMethod: InviteRecord["deliveryMethod"]
  email?: string
  phone?: string
  createdByUserId?: string
}) {
  if (!hasDbConfig()) {
    return addInviteMock({
      name: payload.name,
      relationship: payload.relationship,
      deliveryMethod: payload.deliveryMethod,
      email: payload.email,
      phone: payload.phone,
    })
  }

  try {
    const supabase = createAdminClient()
    const token = crypto.randomUUID()
    const createdBy = payload.createdByUserId || FALLBACK_USER_ID

    const { data, error } = await supabase
      .from("invites")
      .insert({
        created_by_user_id: createdBy,
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

    if (error) {
      throw error
    }

    await supabase.from("invite_events").insert({
      invite_id: data.id,
      event_type: "created",
      context_json: {
        deliveryMethod: payload.deliveryMethod,
      },
    })

    return mapInviteRow(data)
  } catch {
    return addInviteMock({
      name: payload.name,
      relationship: payload.relationship,
      deliveryMethod: payload.deliveryMethod,
      email: payload.email,
      phone: payload.phone,
    })
  }
}

export async function markInviteOpened(id: string) {
  if (!hasDbConfig()) {
    return
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
      context_json: {},
    })
  } catch {
    // Non-fatal for page rendering.
  }
}

export async function completeInvite(id: string, intake: IntakePayload) {
  if (!hasDbConfig()) {
    const result = completeInviteMock(id, intake)
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

    if (currentError) {
      throw currentError
    }

    if (!current) {
      return { invite: undefined, alreadyCompleted: false }
    }

    if (current.status === "completed") {
      return { invite: mapInviteRow(current), alreadyCompleted: true }
    }

    await supabase.from("intake_submissions").insert({
      invite_id: id,
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

    if (updateError) {
      throw updateError
    }

    await supabase.from("invite_events").insert({
      invite_id: id,
      event_type: "completed",
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
    const result = completeInviteMock(id, intake)
    return {
      invite: result.invite,
      alreadyCompleted: result.alreadyCompleted,
    }
  }
}
