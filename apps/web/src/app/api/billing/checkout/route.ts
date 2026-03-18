import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@/lib/supabase/server"
import { getOptionalAuthenticatedUserId } from "@/lib/auth/routeUser"

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!)
}

export async function POST(req: Request) {
  const userId = await getOptionalAuthenticatedUserId()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const priceId = body.price_id || process.env.STRIPE_PRICE_ID

  if (!priceId) {
    return NextResponse.json({ error: "No price ID configured" }, { status: 400 })
  }

  const stripe = getStripe()

  // Look up or create Stripe customer
  const supabase = await createClient()
  const { data: entitlement } = await supabase
    .from("entitlements")
    .select("stripe_customer_id")
    .eq("user_id", userId)
    .single()

  let customerId = entitlement?.stripe_customer_id

  if (!customerId) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("user_id", userId)
      .single()

    const { data: authUser } = await supabase.auth.getUser()
    const customer = await stripe.customers.create({
      email: authUser.user?.email,
      name: profile?.full_name || undefined,
      metadata: { supabase_user_id: userId },
    })
    customerId = customer.id

    // Upsert entitlement with customer ID
    await supabase.from("entitlements").upsert({
      user_id: userId,
      stripe_customer_id: customerId,
      plan: "free",
      status: "trialing",
      insights_used_this_month: 0,
      insights_reset_at: new Date().toISOString(),
    })
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgraded=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL}/billing`,
    metadata: { supabase_user_id: userId },
  })

  return NextResponse.json({ url: session.url })
}
