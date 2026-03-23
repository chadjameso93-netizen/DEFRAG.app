import { NextRequest, NextResponse } from "next/server"
import { getOpenAIClient } from "@/lib/openai/server"

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json()

    const client = getOpenAIClient()

    const image = await client.images.generate({
      model: "gpt-image-1",
      prompt
    })

    return NextResponse.json({
      image: image.data[0].url
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
