import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.text()
  return NextResponse.json({ received: true, size: body.length })
}
