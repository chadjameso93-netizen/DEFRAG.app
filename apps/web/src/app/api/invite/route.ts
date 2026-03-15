import { NextResponse } from "next/server"

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Missing Resend API Key" }, { status: 500 })
  }

  try {
    const { name, email, relationship, deliveryMethod } = await req.json()
    console.log(`Sending invite to ${name} (${email}) for [${relationship}] via ${deliveryMethod}`)
    
    // Stub for Resend
    // await resend.emails.send({
    //   from: 'hello@defrag.app',
    //   to: email,
    //   subject: 'Defrag Intake',
    //   html: '...'
    // })

    return NextResponse.json({ ok: true, sentTo: email, method: deliveryMethod })
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
