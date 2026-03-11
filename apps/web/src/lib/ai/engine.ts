import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function generateInsight(context: any) {

  const prompt = `
  You are the Defrag relational insight engine.

  Analyze relationship dynamics and produce calm,
  practical relational insight.

  Context:
  ${JSON.stringify(context)}
  `

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Relational intelligence system." },
      { role: "user", content: prompt }
    ]
  })

  return completion.choices[0].message.content
}
