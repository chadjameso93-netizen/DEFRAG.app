import { NextResponse } from "next/server"
import Stripe from "stripe"

function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY")
  }

  return new Stripe(secretKey)
}

export async function POST() {
  try {
    const stripe = getStripeClient()
    const priceId = process.env.STRIPE_PRICE_ID
    if (!priceId) {
      throw new Error("Missing STRIPE_PRICE_ID")
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to start checkout"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
