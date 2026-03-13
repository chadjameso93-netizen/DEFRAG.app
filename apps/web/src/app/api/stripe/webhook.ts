import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const signature = req.headers.get("stripe-signature")
  if (!signature) {
    return new Response("Missing signature", { status: 400 })
  }

  const body = await req.text()

  try {
    stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    return new Response(`Webhook error: ${err.message}`, { status: 400 })
  }

  return new Response("ok")
}
