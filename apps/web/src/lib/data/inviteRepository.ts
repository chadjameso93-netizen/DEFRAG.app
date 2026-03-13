import { randomUUID } from "node:crypto"
import { createAdminClient } from "@/lib/supabase/admin"

export type InviteStatus = "created" | "opened" | "completed" | "expired" | "revoked"

export type InviteRecord = {
  id: string
  created_by_user_id: string
  invite_token: string
  email: string | null
  phone: string | null
  status: InviteStatus
  created_at: string
  opened_at: string | null
  completed_at: string | null
  expires_at: string | null
}

export type IntakeSubmissionInput = {
  name: string
  birthDate: string
  birthTime: string
  birthLocation: string
}

const mockState = {
  invites: [] as InviteRecord[],
  completedByToken: new Set<string>(),
}

let warnedMockFallback = false

function isProductionLike() {
  const vercelEnv = process.env.VERCEL_ENV
  return process.env.NODE_ENV === "production" || vercelEnv === "preview" || vercelEnv === "production"
}

function allowMockFallback() {
  return process.env.ALLOW_MOCK_INVITE_FALLBACK === "true"
}

function canUseMockFallback() {
  return allowMockFallback() && !isProductionLike()
}

function shouldUseMock(error: unknown) {
  if (!canUseMockFallback()) {
    throw error
  }

  if (!warnedMockFallback) {
    console.warn("[inviteRepository] Using mock fallback; set ALLOW_MOCK_INVITE_FALLBACK=false to disable")
    warnedMockFallback = true
  }

  return true
}

function nowIso() {
  return new Date().toISOString()
}

function toIsoOrNull(value: string | null | undefined) {
  return value ?? null
}

function toInviteRecord(row: any): InviteRecord {
  return {
    id: String(row.id),
    created_by_user_id: String(row.created_by_user_id),
    invite_token: String(row.invite_token),
    email: row.email ?? null,
    phone: row.phone ?? null,
    status: (row.status ?? "created") as InviteStatus,
    created_at: String(row.created_at ?? nowIso()),
    opened_at: toIsoOrNull(row.opened_at),
    completed_at: toIsoOrNull(row.completed_at),
    expires_at: toIsoOrNull(row.expires_at),
  }
}

async function logEvent(inviteId: string, eventType: string, actorUserId?: string | null, context?: Record<string, unknown>) {
  const admin = createAdminClient()
  await admin.from("invite_events").insert({
    invite_id: inviteId,
    event_type: eventType,
    actor_user_id: actorUserId ?? null,
    context_json: context ?? {},
  })
}

export async function listInvitesByOwner(createdByUserId: string): Promise<InviteRecord[]> {
  try {
    const admin = createAdminClient()
    const { data, error } = await admin
      .from("invites")
      .select("id, created_by_user_id, invite_token, email, phone, status, created_at, opened_at, completed_at, expires_at")
      .eq("created_by_user_id", createdByUserId)
      .order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return (data ?? []).map(toInviteRecord)
  } catch (error) {
    if (!shouldUseMock(error)) {
      return []
    }

    return mockState.invites.filter((invite) => invite.created_by_user_id === createdByUserId)
  }
}

export async function createInvite(params: {
  createdByUserId: string
  email?: string
  phone?: string
  expiresAt?: string | null
}): Promise<InviteRecord> {
  const token = randomUUID()

  try {
    const admin = createAdminClient()
    const { data, error } = await admin
      .from("invites")
      .insert({
        created_by_user_id: params.createdByUserId,
        invite_token: token,
        email: params.email ?? null,
        phone: params.phone ?? null,
        status: "created",
        expires_at: params.expiresAt ?? null,
      })
      .select("id, created_by_user_id, invite_token, email, phone, status, created_at, opened_at, completed_at, expires_at")
      .single()

    if (error || !data) {
      throw error ?? new Error("Invite insert failed")
    }

    await logEvent(data.id, "created", params.createdByUserId)
    return toInviteRecord(data)
  } catch (error) {
    if (!shouldUseMock(error)) {
      throw error
    }

    const created: InviteRecord = {
      id: randomUUID(),
      created_by_user_id: params.createdByUserId,
      invite_token: token,
      email: params.email ?? null,
      phone: params.phone ?? null,
      status: "created",
      created_at: nowIso(),
      opened_at: null,
      completed_at: null,
      expires_at: params.expiresAt ?? null,
    }

    mockState.invites.unshift(created)
    return created
  }
}

export async function getInviteByToken(tokenOrId: string): Promise<InviteRecord | null> {
  try {
    const admin = createAdminClient()

    let query = admin
      .from("invites")
      .select("id, created_by_user_id, invite_token, email, phone, status, created_at, opened_at, completed_at, expires_at")

    if (tokenOrId.includes("-")) {
      query = query.or(`invite_token.eq.${tokenOrId},id.eq.${tokenOrId}`)
    } else {
      query = query.eq("invite_token", tokenOrId)
    }

    const { data, error } = await query.maybeSingle()

    if (error) {
      throw error
    }

    return data ? toInviteRecord(data) : null
  } catch (error) {
    if (!shouldUseMock(error)) {
      return null
    }

    return mockState.invites.find((invite) => invite.invite_token === tokenOrId || invite.id === tokenOrId) ?? null
  }
}

export async function markInviteOpened(tokenOrId: string, actorUserId?: string | null): Promise<void> {
  const invite = await getInviteByToken(tokenOrId)
  if (!invite || invite.opened_at) {
    return
  }

  try {
    const admin = createAdminClient()
    const { error } = await admin
      .from("invites")
      .update({
        status: invite.status === "created" ? "opened" : invite.status,
        opened_at: nowIso(),
      })
      .eq("id", invite.id)

    if (error) {
      throw error
    }

    await logEvent(invite.id, "opened", actorUserId)
  } catch (error) {
    if (!shouldUseMock(error)) {
      return
    }

    const idx = mockState.invites.findIndex((item) => item.id === invite.id)
    if (idx >= 0) {
      mockState.invites[idx] = {
        ...mockState.invites[idx],
        opened_at: nowIso(),
        status: mockState.invites[idx].status === "created" ? "opened" : mockState.invites[idx].status,
      }
    }
  }
}

export async function completeInvite(params: {
  tokenOrId: string
  submission: IntakeSubmissionInput
  actorUserId?: string | null
}) {
  const invite = await getInviteByToken(params.tokenOrId)

  if (!invite) {
    return { ok: false as const, notFound: true as const, alreadyCompleted: false as const }
  }

  if (invite.status === "completed" || invite.completed_at) {
    return { ok: true as const, notFound: false as const, alreadyCompleted: true as const, invite }
  }

  try {
    const admin = createAdminClient()
    const completedAt = nowIso()

    const { error: insertError } = await admin.from("intake_submissions").insert({
      invite_id: invite.id,
      submitted_by_user_id: params.actorUserId ?? null,
      name: params.submission.name,
      birth_date: params.submission.birthDate,
      birth_time: params.submission.birthTime,
      birth_location: params.submission.birthLocation,
      payload_json: {
        name: params.submission.name,
        birthDate: params.submission.birthDate,
        birthTime: params.submission.birthTime,
        birthLocation: params.submission.birthLocation,
      },
      completion_state: "completed",
    })

    if (insertError) {
      throw insertError
    }

    const { error: updateError } = await admin
      .from("invites")
      .update({ status: "completed", completed_at: completedAt })
      .eq("id", invite.id)

    if (updateError) {
      throw updateError
    }

    await logEvent(invite.id, "completed", params.actorUserId)

    return {
      ok: true as const,
      notFound: false as const,
      alreadyCompleted: false as const,
      invite: {
        ...invite,
        status: "completed" as InviteStatus,
        completed_at: completedAt,
      },
    }
  } catch (error) {
    if (!shouldUseMock(error)) {
      throw error
    }

    mockState.completedByToken.add(invite.invite_token)
    const idx = mockState.invites.findIndex((item) => item.id === invite.id)
    if (idx >= 0) {
      mockState.invites[idx] = {
        ...mockState.invites[idx],
        status: "completed",
        completed_at: nowIso(),
      }
    }

    return {
      ok: true as const,
      notFound: false as const,
      alreadyCompleted: false as const,
      invite: mockState.invites[idx],
    }
  }
}
