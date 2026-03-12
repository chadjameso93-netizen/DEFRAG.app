#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."
cd apps/web

mkdir -p src/app/api/{profile,relationships,events,subscription}
mkdir -p src/lib/data

cat > src/lib/data/mockDb.ts <<'TS'
export type ProfileRecord = {
  fullName?: string
  birthDate?: string
  birthTime?: string
  birthPlace?: string
}

export type RelationshipRecord = {
  id: string
  source_name: string
  target_name: string
  relationship_type: string
  tension_score: number
  trust_score: number
}

export type EventRecord = {
  id: string
  event_type: string
  actor: string
  target: string
  severity: number
  notes: string
  created_at: string
}

let profile: ProfileRecord = {}

let relationships: RelationshipRecord[] = [
  {
    id: "rel_1",
    source_name: "You",
    target_name: "Partner",
    relationship_type: "personal",
    tension_score: 0.62,
    trust_score: 0.58,
  },
  {
    id: "rel_2",
    source_name: "You",
    target_name: "Parent",
    relationship_type: "family",
    tension_score: 0.48,
    trust_score: 0.66,
  },
  {
    id: "rel_3",
    source_name: "You",
    target_name: "Sibling",
    relationship_type: "family",
    tension_score: 0.71,
    trust_score: 0.44,
  },
]

let events: EventRecord[] = [
  {
    id: "evt_1",
    event_type: "conflict",
    actor: "You",
    target: "Sibling",
    severity: 0.7,
    notes: "Tension increased after a short exchange.",
    created_at: new Date().toISOString(),
  },
  {
    id: "evt_2",
    event_type: "repair",
    actor: "You",
    target: "Partner",
    severity: 0.3,
    notes: "Conversation became calmer after a pause.",
    created_at: new Date().toISOString(),
  },
]

export function getProfile() {
  return profile
}

export function saveProfile(nextProfile: ProfileRecord) {
  profile = { ...profile, ...nextProfile }
  return profile
}

export function getRelationships() {
  return relationships
}

export function addRelationship(item: Omit<RelationshipRecord, "id">) {
  const record = {
    id: `rel_${Date.now()}`,
    ...item,
  }
  relationships = [record, ...relationships]
  return record
}

export function getEvents() {
  return events
}

export function addEvent(item: Omit<EventRecord, "id" | "created_at">) {
  const record = {
    id: `evt_${Date.now()}`,
    created_at: new Date().toISOString(),
    ...item,
  }
  events = [record, ...events]
  return record
}

export function getSubscription() {
  return {
    status: "trial",
    plan: "core",
    trialEndsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
  }
}
TS

cat > src/app/api/profile/route.ts <<'TS'
import { NextResponse } from "next/server"
import { getProfile, saveProfile } from "@/lib/data/mockDb"

export async function GET() {
  return NextResponse.json({ profile: getProfile() })
}

export async function POST(req: Request) {
  const body = await req.json()
  const profile = saveProfile({
    fullName: body.fullName || "",
    birthDate: body.birthDate || "",
    birthTime: body.birthTime || "",
    birthPlace: body.birthPlace || "",
  })

  return NextResponse.json({ ok: true, profile })
}
TS

cat > src/app/api/relationships/route.ts <<'TS'
import { NextResponse } from "next/server"
import { addRelationship, getRelationships } from "@/lib/data/mockDb"

export async function GET() {
  return NextResponse.json({ relationships: getRelationships() })
}

export async function POST(req: Request) {
  const body = await req.json()

  const relationship = addRelationship({
    source_name: body.source_name || "You",
    target_name: body.target_name || "New Person",
    relationship_type: body.relationship_type || "personal",
    tension_score: body.tension_score ?? 0.35,
    trust_score: body.trust_score ?? 0.5,
  })

  return NextResponse.json({ ok: true, relationship })
}
TS

cat > src/app/api/events/route.ts <<'TS'
import { NextResponse } from "next/server"
import { addEvent, getEvents } from "@/lib/data/mockDb"

export async function GET() {
  return NextResponse.json({ events: getEvents() })
}

export async function POST(req: Request) {
  const body = await req.json()

  const event = addEvent({
    event_type: body.event_type || "observation",
    actor: body.actor || "You",
    target: body.target || "Other",
    severity: body.severity ?? 0.4,
    notes: body.notes || "No notes provided.",
  })

  return NextResponse.json({ ok: true, event })
}
TS

cat > src/app/api/subscription/route.ts <<'TS'
import { NextResponse } from "next/server"
import { getSubscription } from "@/lib/data/mockDb"

export async function GET() {
  return NextResponse.json(getSubscription())
}
TS

cat > src/app/api/status/route.ts <<'TS'
import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    ok: true,
    web: "running",
    auth: "ready",
    billing: "ready",
    data: "mock-db-ready",
  })
}
TS

pkill -f "next dev" || true
rm -rf .next
npm run dev
