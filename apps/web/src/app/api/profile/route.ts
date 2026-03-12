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
