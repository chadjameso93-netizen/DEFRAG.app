import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient as createServiceClient } from "@supabase/supabase-js"

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!)
}

// Use service role client for webhook (no user context)
function getServiceSupabase() {
  return createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 })
  }

  const stripe = getStripe()
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature"
    return NextResponse.json({ error: message }, { status: 400 })
  }

  const supabase = getServiceSupabase()

  // Idempotency: skip if already processed
  const { data: existing } = await supabase
    .from("stripe_events")
    .select("id")
    .eq("id", event.id)
    .single()

  if (existing) {
    return NextResponse.json({ received: true, duplicate: true })
  }

  // Store the event
  await supabase.from("stripe_events").insert({
    id: event.id,
    type: event.type,
    payload: event.data.object as unknown as Record<string, unknown>,
  })

  // Handle relevant events
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.supabase_user_id
      if (userId && session.subscription) {
        const sub = await stripe.subscriptions.retrieve(session.subscription as string)
        const item = sub.items.data[0]
        const priceId = item?.price.id
        const plan = determinePlan(priceId)
        const periodEnd = item?.current_period_end
          ? new Date(item.current_period_end * 1000).toISOString()
          : new Date().toISOString()

        await supabase.from("entitlements").upsert({
          user_id: userId,
          plan,
          status: "active",
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
          current_period_end: periodEnd,
          insights_used_this_month: 0,
          insights_reset_at: new Date().toISOString(),
        })
      }
      break
    }

    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription
      const userId = await findUserByCustomer(supabase, sub.customer as string)
      if (userId) {
        const item = sub.items.data[0]
        const priceId = item?.price.id
        const periodEnd = item?.current_period_end
          ? new Date(item.current_period_end * 1000).toISOString()
          : undefined
        await supabase
          .from("entitlements")
          .update({
            plan: determinePlan(priceId),
            status: mapStatus(sub.status),
            ...(periodEnd && { current_period_end: periodEnd }),
          })
          .eq("user_id", userId)
      }
      break
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription
      const userId = await findUserByCustomer(supabase, sub.customer as string)
      if (userId) {
        await supabase
          .from("entitlements")
          .update({ plan: "free", status: "canceled" })
          .eq("user_id", userId)
      }
      break
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice
      const userId = await findUserByCustomer(supabase, invoice.customer as string)
      if (userId) {
        await supabase
          .from("entitlements")
          .update({ status: "past_due" })
          .eq("user_id", userId)
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}

function determinePlan(priceId: string | undefined): "free" | "solo" | "team" {
  if (!priceId) return "free"
  if (priceId === process.env.STRIPE_PRICE_SOLO) return "solo"
  if (priceId === process.env.STRIPE_PRICE_TEAM) return "team"
  // Default to solo for any paid plan
  return "solo"
}

function mapStatus(stripeStatus: string): "active" | "trialing" | "past_due" | "canceled" {
  switch (stripeStatus) {
    case "active": return "active"
    case "trialing": return "trialing"
    case "past_due": return "past_due"
    default: return "canceled"
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function findUserByCustomer(
  supabase: ReturnType<typeof getServiceSupabase>,
  customerId: string,
): Promise<string | null> {
  const { data } = await supabase
    .from("entitlements")
    .select("user_id")
    .eq("stripe_customer_id", customerId)
    .single()
  return data?.user_id || null
}
