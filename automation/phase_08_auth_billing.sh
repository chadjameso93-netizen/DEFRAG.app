#!/usr/bin/env bash
set -e

cd apps/web

echo "Installing auth + billing deps..."
npm install @supabase/auth-helpers-nextjs stripe

mkdir -p src/lib/auth
mkdir -p src/app/api/auth/login
mkdir -p src/app/api/auth/signup
mkdir -p src/app/api/billing/create-checkout
mkdir -p src/middleware

cat > src/lib/auth/session.ts <<'TS'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export function getSupabaseServer() {
  return createServerComponentClient({ cookies })
}
TS

cat > src/app/api/auth/signup/route.ts <<'TS'
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  })

  if (error) return NextResponse.json({ error: error.message })

  return NextResponse.json({ user: data.user })
}
TS

cat > src/app/api/auth/login/route.ts <<'TS'
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) return NextResponse.json({ error: error.message })

  return NextResponse.json(data)
}
TS

cat > src/app/api/billing/create-checkout/route.ts <<'TS'
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST() {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1
      }
    ],
    success_url: process.env.NEXT_PUBLIC_APP_URL + "/dashboard",
    cancel_url: process.env.NEXT_PUBLIC_APP_URL + "/pricing"
  })

  return NextResponse.json({ url: session.url })
}
TS

cat > src/middleware.ts <<'TS'
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const protectedPaths = ["/dashboard", "/relationships", "/timeline", "/simulations"]

  const path = req.nextUrl.pathname

  const isProtected = protectedPaths.some(p => path.startsWith(p))

  if (!isProtected) return NextResponse.next()

  const auth = req.cookies.get("sb-access-token")

  if (!auth) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next()
}
TS

echo "Auth + Billing installed."
echo "Restarting dev server..."

pkill -f "next dev" || true
rm -rf .next

npm run dev

echo "Phase 08 complete."
