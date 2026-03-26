export function createMockWorkbench() {
  const now = new Date().toISOString();

  return {
    schemaVersion: "1.0.0",
    workspaceId: "demo",
    userId: "user_1",
    bowenField: {
      nodes: [
        { id: "user", displayName: "You" },
        { id: "other", displayName: "Other" },
      ],
      groups: [],
      edges: [
        {
          id: "e1",
          fromId: "user",
          toId: "other",
          relationshipType: "family_member",
          valence: "strained",
          intensity: 70,
          emotionalDistance: 40,
          alignment: -20,
          pressure: 65,
          activeLoops: ["pursue_withdraw"],
          activeBowenPatterns: ["conflict_loop"],
          summaries: ["Repeated escalation pattern"],
          repairSignals: ["slower openings"],
          riskSignals: ["direct challenge"],
          lastUpdatedAt: now,
          confidence: "medium",
        },
      ],
      triangles: [],
      systemPressure: "moderate",
      dominantPatterns: ["conflict_loop"],
      alignmentSummary: "Low alignment",
      tensionSummary: "Recurring friction",
      repairOpportunities: ["soft start"],
      instabilityFlags: [],
      updatedAt: now,
    },
    currentSynthesis: {
      id: "s1",
      situation: {
        primaryRelationshipIds: ["e1"],
        userGoal: "Have a calm conversation",
        emotionalTone: ["tense"],
        outputNeed: ["guidance"],
        parsedAt: now,
      },
      forUser: {
        personId: "user",
        whatMayBeHappening: ["You are pushing for clarity"],
        likelyInterpretation: ["It may be received as pressure"],
        pressureSummary: "Moderate internal pressure",
      },
      forOthers: [
        {
          personId: "other",
          whatMayBeHappening: ["They may feel challenged"],
          likelyReception: ["They may defend or withdraw"],
          pressureSummary: "Moderate defensive pressure",
        },
      ],
      betweenPeople: {
        dominantDynamic: "pursue-withdraw",
      },
      timing: {
        recommendation: "better_for_soft_opening",
        summary: "Direct approach may escalate",
        caution: ["avoid confrontation"],
        openings: ["start gently"],
      },
      usefulResponseKinds: ["phrasing"],
      confidence: "medium",
      createdAt: now,
    },
    updatedAt: now,
  };
}
