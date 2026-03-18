import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  const { email, password, fullName } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 })
  }

  const supabase = await createServerClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName || "",
      },
    },
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  if (data.session) {
    return NextResponse.json({ user: data.user, session: data.session })
  }

  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (signInError) {
    return NextResponse.json({ error: signInError.message }, { status: 400 })
  }

  return NextResponse.json({ user: signInData.user, session: signInData.session })
}
