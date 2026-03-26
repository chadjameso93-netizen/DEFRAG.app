import { z } from "zod";
import { ConfidenceBandSchema } from "./symbolic-profile";
import { TimingRecommendationSchema } from "./bowen-field";

export const ConversationModeSchema = z.enum([
  "guidance",
  "simulation",
  "reflection",
  "timing",
  "conflict_support",
  "conversation_prep",
]);
export type ConversationMode = z.infer<typeof ConversationModeSchema>;

export const SituationParseSchema = z.object({
  primaryRelationshipIds: z.array(z.string()),
  userGoal: z.string(),
  emotionalTone: z.array(z.string()),
  outputNeed: z.array(ConversationModeSchema),
  inferredDynamic: z.string().optional(),
  parsedAt: z.string(),
});
export type SituationParse = z.infer<typeof SituationParseSchema>;

export const RelationalSynthesisSchema = z.object({
  id: z.string(),
  situation: SituationParseSchema,
  forUser: z.object({
    personId: z.string(),
    whatMayBeHappening: z.array(z.string()),
    likelyInterpretation: z.array(z.string()),
    pressureSummary: z.string(),
  }),
  forOthers: z.array(
    z.object({
      personId: z.string(),
      whatMayBeHappening: z.array(z.string()),
      likelyReception: z.array(z.string()),
      pressureSummary: z.string(),
    }),
  ),
  betweenPeople: z.object({
    dominantDynamic: z.string(),
  }),
  timing: z.object({
    recommendation: TimingRecommendationSchema,
    summary: z.string(),
    caution: z.array(z.string()),
    openings: z.array(z.string()),
  }),
  usefulResponseKinds: z.array(z.string()),
  confidence: ConfidenceBandSchema,
  createdAt: z.string(),
});
export type RelationalSynthesis = z.infer<typeof RelationalSynthesisSchema>;
