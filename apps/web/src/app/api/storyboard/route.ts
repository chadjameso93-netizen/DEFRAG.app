import { NextRequest, NextResponse } from "next/server"
import { getOpenAIClient } from "@/lib/openai/server"

export async function POST(req: NextRequest) {
  try {
    const { input } = await req.json()

    const client = getOpenAIClient()

    const response = await client.responses.create({
      model: "gpt-4.1",
      input: `Create a short relational dynamics storyboard for this scenario:\n\n${input}\n\nOutput as 3 scenes with emotional tone and movement.`
    })

    return NextResponse.json({
      storyboard: response.output_text
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
