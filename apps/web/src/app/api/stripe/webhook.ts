import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req:Request){

  const body=await req.text()

  return new Response("ok")
}
