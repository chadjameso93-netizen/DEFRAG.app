import type { ProofJson } from "@/lib/types";

export function buildWorkbenchFromPipeline(params: {
  message: string;
  proof: ProofJson;
}) {
  const now = new Date().toISOString();

  return {
    schemaVersion: "1.0.0",
    workspaceId: "live",
    userId: "unknown",
    bowenField: {
      nodes: [],
      groups: [],
      edges: [],
      triangles: [],
      systemPressure: params.proof.timing_assessment.pressure_level,
      dominantPatterns: params.proof.patterns_detected.map(p => p.name),
      alignmentSummary: params.proof.context_summary.relationship_state,
      tensionSummary: params.proof.patterns_detected.map(p => p.name).join(", "),
      repairOpportunities: [],
      instabilityFlags: [],
      updatedAt: now,
    },
    currentSynthesis: {
      id: `syn_${Date.now()}`,
      situation: {
        primaryRelationshipIds: [],
        userGoal: params.proof.intent.goal,
        emotionalTone: [],
        outputNeed: ["guidance"],
        parsedAt: now,
      },
      forUser: {
        personId: "user",
        whatMayBeHappening: [params.proof.relational_hypothesis.user_experience],
        likelyInterpretation: [params.proof.relational_hypothesis.dynamic_summary],
        pressureSummary: params.proof.timing_assessment.notes,
      },
      forOthers: [
        {
          personId: "other",
          whatMayBeHappening: [params.proof.relational_hypothesis.other_experience],
          likelyReception: [params.proof.relational_hypothesis.dynamic_summary],
          pressureSummary: params.proof.timing_assessment.notes,
        },
      ],
      betweenPeople: {
        dominantDynamic: params.proof.relational_hypothesis.dynamic_summary,
      },
      timing: {
        recommendation: params.proof.timing_assessment.pressure_level === "high"
          ? "better_delayed"
          : "supportive_for_direct_conversation",
        summary: params.proof.timing_assessment.notes,
        caution: [],
        openings: [],
      },
      usefulResponseKinds: ["perspective", "phrasing"],
      confidence: "medium",
      createdAt: now,
    },
    updatedAt: now,
  };
}
