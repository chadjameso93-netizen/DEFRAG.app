import OpenAI from "openai"
import type { ProofJson } from "@/lib/types"

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
}

interface PipelineInput {
  message: string
  relationship_name?: string
  relationship_type?: string
  user_profile?: Record<string, unknown>
  relationship_data?: Record<string, unknown>
  recent_events?: Array<{ event_type: string; notes: string; created_at: string }>
  model?: string
}

interface PipelineOutput {
  output_text: string
  proof_json: ProofJson
  model: string
  tokens_in: number
  tokens_out: number
  cost_usd: number
}

const SYSTEM_PROMPT = `You are DEFRAG, a relational intelligence system.
Your job: produce specific, actionable clarity about interpersonal dynamics.
You are not therapy and not medical advice.
Do not provide instructions for harassment, stalking, manipulation, or harm.
Use plain language. Avoid fortune-cookie statements.
Never mention internal calculation frameworks unless the user asks explicitly.

You MUST respond with valid JSON matching this exact structure:
{
  "response": {
    "what_is_happening": "2-4 sentences about what is happening in this dynamic",
    "what_it_causes": "2-4 sentences about what this pattern causes",
    "what_to_do": "2-3 concrete options with specific phrasing/timing suggestions. End by returning agency to the user."
  },
  "proof": {
    "intent": {
      "type": "conflict_preparation | emotional_processing | timing_question | pattern_question",
      "goal": "short description of the user's goal"
    },
    "context_summary": {
      "user_blueprint": "plain-language summary of user context",
      "other_blueprint": "plain-language summary of the other person",
      "relationship_state": "short status descriptor",
      "recent_events": ["short bullet-style summaries of relevant events"]
    },
    "patterns_detected": [
      {
        "name": "pattern name from: pursue_withdraw_cycle, criticism_defensiveness_loop, triangulation_pattern, repair_attempt_cycle, attachment_activation, boundary_pressure, emotional_flooding, repair_blockage, trust_recovery_pattern",
        "evidence": ["evidence strings"],
        "confidence": "low | medium | high"
      }
    ],
    "timing_assessment": {
      "pressure_level": "low | moderate | high",
      "support_for_direct_conversation": "low | medium | high",
      "notes": "plain explanation of timing"
    },
    "relational_hypothesis": {
      "user_experience": "how the user may be experiencing this",
      "other_experience": "how the other may be experiencing this",
      "dynamic_summary": "what may be happening between them"
    }
  }
}

Be specific to the people and situation described. Offer 2-3 concrete options, not vague encouragement.
End by returning agency to the user with "You might try..." or "You can decide..." style language.`

function buildUserPrompt(input: PipelineInput): string {
  let prompt = `The user describes this situation:\n"${input.message}"\n`

  if (input.relationship_name) {
    prompt += `\nThis is about their relationship with: ${input.relationship_name}`
    if (input.relationship_type) prompt += ` (${input.relationship_type})`
  }

  if (input.recent_events && input.recent_events.length > 0) {
    prompt += `\n\nRecent events in this relationship:\n`
    for (const event of input.recent_events.slice(0, 5)) {
      prompt += `- [${event.event_type}] ${event.notes}\n`
    }
  }

  prompt += `\n\nRespond with valid JSON only. No markdown, no code fences.`
  return prompt
}

function estimateCost(model: string, tokensIn: number, tokensOut: number): number {
  if (model === "gpt-4o") return (tokensIn * 2.5 + tokensOut * 10) / 1_000_000
  // gpt-4o-mini
  return (tokensIn * 0.15 + tokensOut * 0.6) / 1_000_000
}

export async function runInsightPipeline(input: PipelineInput): Promise<PipelineOutput> {
  const model = input.model || "gpt-4o-mini"

  // If no OpenAI key, return a structured fallback
  if (!process.env.OPENAI_API_KEY) {
    return buildFallbackOutput(input, model)
  }

  const userPrompt = buildUserPrompt(input)

  const openai = getOpenAI()
  const completion = await openai.chat.completions.create({
    model,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.7,
    max_tokens: 1500,
  })

  const rawContent = completion.choices[0]?.message?.content || ""
  const tokensIn = completion.usage?.prompt_tokens || 0
  const tokensOut = completion.usage?.completion_tokens || 0

  let parsed: { response: { what_is_happening: string; what_it_causes: string; what_to_do: string }; proof: ProofJson }

  try {
    parsed = JSON.parse(rawContent)
  } catch {
    // If the model doesn't return valid JSON, wrap it
    return buildFallbackOutput(input, model, rawContent, tokensIn, tokensOut)
  }

  const outputText = [
    `What is happening:\n${parsed.response.what_is_happening}`,
    `What it causes:\n${parsed.response.what_it_causes}`,
    `What you might try:\n${parsed.response.what_to_do}`,
  ].join("\n\n")

  return {
    output_text: outputText,
    proof_json: parsed.proof,
    model,
    tokens_in: tokensIn,
    tokens_out: tokensOut,
    cost_usd: estimateCost(model, tokensIn, tokensOut),
  }
}

function buildFallbackOutput(
  input: PipelineInput,
  model: string,
  rawText?: string,
  tokensIn = 0,
  tokensOut = 0,
): PipelineOutput {
  const name = input.relationship_name || "this person"
  const outputText = rawText || [
    `What is happening:\nThere appears to be active tension in your relationship with ${name}. The situation you described suggests unresolved dynamics that may be creating distance or pressure.`,
    `What it causes:\nWhen these patterns go unaddressed, they can lead to increased reactivity, withdrawal, or misunderstandings that compound over time.`,
    `What you might try:\n1. You could try a brief, low-pressure check-in: "I've been thinking about us and wanted to see how you're doing."\n2. You might pause before responding to the next tense moment — even 10 minutes can change the outcome.\n3. You can decide whether now is the right time to address this directly, or whether waiting for a calmer window would serve you both better.`,
  ].join("\n\n")

  return {
    output_text: outputText,
    proof_json: {
      intent: {
        type: "emotional_processing",
        goal: "Understanding a relational dynamic",
      },
      context_summary: {
        user_blueprint: "User seeking clarity on a relational pattern",
        other_blueprint: `${name} — details limited`,
        relationship_state: "Active tension",
        recent_events: [input.message.slice(0, 100)],
      },
      patterns_detected: [
        {
          name: "pursue_withdraw_cycle",
          evidence: ["Situation described by user"],
          confidence: "low",
        },
      ],
      timing_assessment: {
        pressure_level: "moderate",
        support_for_direct_conversation: "medium",
        notes: "A calm, measured approach is likely to be more effective than urgency.",
      },
      relational_hypothesis: {
        user_experience: "Feeling uncertain about how to proceed",
        other_experience: `${name} may be experiencing the situation differently than expected`,
        dynamic_summary: "There may be a gap between how each person is interpreting recent interactions.",
      },
    },
    model,
    tokens_in: tokensIn,
    tokens_out: tokensOut,
    cost_usd: estimateCost(model, tokensIn, tokensOut),
  }
}
