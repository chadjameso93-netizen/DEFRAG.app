#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."
cd apps/web

echo "Installing current auth + billing deps..."
npm remove @supabase/auth-helpers-nextjs || true
npm install @supabase/supabase-js @supabase/ssr stripe

mkdir -p src/lib/supabase
mkdir -p src/app/api/auth/login
mkdir -p src/app/api/auth/signup
mkdir -p src/app/api/billing/create-checkout

cat > src/lib/supabase/client.ts <<'TS'
import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
TS

cat > src/lib/supabase/server.ts <<'TS'
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch {}
        },
      },
    }
  )
}
TS

cat > src/lib/supabase/admin.ts <<'TS'
import { createClient } from "@supabase/supabase-js"

export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
TS

cat > src/app/api/auth/signup/route.ts <<'TS'
import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 })
  }

  const supabase = createAdminClient()

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ user: data.user })
}
TS

cat > src/app/api/auth/login/route.ts <<'TS'
import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 })
  }

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ session: data.session, user: data.user })
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
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
  })

  return NextResponse.json({ url: session.url })
}
TS

cat > src/proxy.ts <<'TS'
import { NextResponse, type NextRequest } from "next/server"

export function proxy(req: NextRequest) {
  const protectedPaths = ["/dashboard", "/relationships", "/timeline", "/simulations"]
  const path = req.nextUrl.pathname
  const isProtected = protectedPaths.some((p) => path.startsWith(p))

  if (!isProtected) return NextResponse.next()

  const hasAccessToken =
    req.cookies.has("sb-access-token") ||
    Array.from(req.cookies.getAll()).some((c) => c.name.includes("auth-token"))

  if (!hasAccessToken) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/relationships/:path*", "/timeline/:path*", "/simulations/:path*"],
}
TS

rm -f src/middleware.ts

echo "Auth + Billing v2 installed."
echo "Restarting dev server..."

pkill -f "next dev" || true
rm -rf .next

npm run dev
