import { z } from "zod";
import {
  ConfidenceBandSchema,
  SymbolicProfileSynthesisSchema,
} from "./symbolic-profile";

export const PressureLevelSchema = z.enum(["low", "moderate", "high", "acute"]);
export type PressureLevel = z.infer<typeof PressureLevelSchema>;

export const ActivationPatternSchema = z.enum([
  "escalate",
  "withdraw",
  "control",
  "absorb",
  "over_function",
  "under_function",
  "freeze",
  "pursue",
  "distance",
  "mixed",
]);
export type ActivationPattern = z.infer<typeof ActivationPatternSchema>;

export const ProtectionStrategySchema = z.enum([
  "connection",
  "autonomy",
  "control",
  "safety",
  "validation",
  "stability",
  "certainty",
  "self_protection",
  "mixed",
]);
export type ProtectionStrategy = z.infer<typeof ProtectionStrategySchema>;

export const RelationshipTypeSchema = z.enum([
  "self",
  "partner",
  "parent",
  "child",
  "sibling",
  "friend",
  "coworker",
  "manager",
  "team_member",
  "client",
  "family_member",
  "other",
]);
export type RelationshipType = z.infer<typeof RelationshipTypeSchema>;

export const EdgeValenceSchema = z.enum([
  "aligned",
  "strained",
  "volatile",
  "distant",
  "repairing",
  "ambivalent",
  "supportive",
]);
export type EdgeValence = z.infer<typeof EdgeValenceSchema>;

export const BowenPatternSchema = z.enum([
  "triangulation",
  "fusion",
  "cutoff",
  "conflict_loop",
  "over_under_functioning",
  "projection",
  "distancing_pursuit",
  "stable_differentiation",
]);
export type BowenPattern = z.infer<typeof BowenPatternSchema>;

export const TimingRecommendationSchema = z.enum([
  "supportive_for_direct_conversation",
  "better_for_soft_opening",
  "better_delayed",
  "emotionally_heightened",
  "observe_only",
]);
export type TimingRecommendation = z.infer<typeof TimingRecommendationSchema>;

export const BaselineStateSchema = z.object({
  personId: z.string(),
  activationPattern: ActivationPatternSchema,
  protectionStrategy: ProtectionStrategySchema,
  relationalPolarity: z.string().optional(),
  reinforcementLoops: z.array(z.string()),
  interruptionThresholds: z.array(z.string()),
  pacingNeeds: z.array(z.string()),
  sensitivityThemes: z.array(z.string()),
  autonomyNeeds: z.array(z.string()),
  reassuranceNeeds: z.array(z.string()),
  processingStyle: z.string().optional(),
  likelyStressExpressions: z.array(z.string()),
  likelyGiftExpressions: z.array(z.string()),
  frameworkConsensus: z.array(z.string()),
  frameworkTensions: z.array(z.string()),
  confidence: ConfidenceBandSchema,
});
export type BaselineState = z.infer<typeof BaselineStateSchema>;

export const ActivationSnapshotSchema = z.object({
  entityId: z.string(),
  intensity: z.number().min(0).max(100),
  pressureLevel: PressureLevelSchema,
  activePatterns: z.array(ActivationPatternSchema),
  protectionStrategies: z.array(ProtectionStrategySchema),
  emotionalTone: z.array(z.string()),
  needsLikelyOnline: z.array(z.string()),
  triggersLikelyOnline: z.array(z.string()),
  observedAt: z.string(),
  confidence: ConfidenceBandSchema,
});
export type ActivationSnapshot = z.infer<typeof ActivationSnapshotSchema>;

export const TimingAssessmentSchema = z.object({
  entityId: z.string(),
  pressureLevel: PressureLevelSchema,
  recommendation: TimingRecommendationSchema,
  timingSummary: z.string(),
  sensitivityThemes: z.array(z.string()),
  favorableWindows: z
    .array(
      z.object({
        start: z.string().optional(),
        end: z.string().optional(),
        label: z.string(),
        confidence: ConfidenceBandSchema.optional(),
      }),
    )
    .optional(),
  activeSignals: z.array(z.any()),
  cautionSignals: z.array(z.any()),
  sources: z.array(z.any()).optional(),
});
export type TimingAssessment = z.infer<typeof TimingAssessmentSchema>;

export const PersonNodeSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  role: RelationshipTypeSchema.optional(),
  isUser: z.boolean().optional(),
  avatarUrl: z.string().optional(),
  symbolicProfile: SymbolicProfileSynthesisSchema.optional(),
  baseline: BaselineStateSchema,
  currentActivation: ActivationSnapshotSchema.optional(),
  permissions: z
    .object({
      canViewRawNatal: z.boolean().optional(),
      canViewFrameworkDetails: z.boolean().optional(),
      canShareWithSystem: z.boolean().optional(),
    })
    .optional(),
});
export type PersonNode = z.infer<typeof PersonNodeSchema>;

export const GroupNodeSchema = z.object({
  id: z.string(),
  label: z.string(),
  memberIds: z.array(z.string()),
  groupType: z.enum(["family", "team", "household", "partnership", "custom"]),
});
export type GroupNode = z.infer<typeof GroupNodeSchema>;

export const RelationalEdgeSchema = z.object({
  id: z.string(),
  fromId: z.string(),
  toId: z.string(),
  relationshipType: RelationshipTypeSchema,
  valence: EdgeValenceSchema,
  intensity: z.number().min(0).max(100),
  emotionalDistance: z.number().min(0).max(100),
  alignment: z.number().min(-100).max(100),
  pressure: z.number().min(0).max(100),
  reciprocity: z.number().min(0).max(100).optional(),
  pacingMismatch: z.number().min(0).max(100).optional(),
  activeLoops: z.array(z.string()),
  activeBowenPatterns: z.array(BowenPatternSchema),
  summaries: z.array(z.string()),
  repairSignals: z.array(z.string()),
  riskSignals: z.array(z.string()),
  lastUpdatedAt: z.string(),
  confidence: ConfidenceBandSchema,
});
export type RelationalEdge = z.infer<typeof RelationalEdgeSchema>;

export const TrianglePatternSchema = z.object({
  id: z.string(),
  personIds: z.tuple([z.string(), z.string(), z.string()]),
  pattern: BowenPatternSchema,
  description: z.string(),
  stabilizingFunction: z.string().optional(),
  riskLevel: PressureLevelSchema,
  confidence: ConfidenceBandSchema,
});
export type TrianglePattern = z.infer<typeof TrianglePatternSchema>;

export const BowenFieldStateSchema = z.object({
  nodes: z.array(PersonNodeSchema),
  groups: z.array(GroupNodeSchema),
  edges: z.array(RelationalEdgeSchema),
  triangles: z.array(TrianglePatternSchema),
  systemPressure: PressureLevelSchema,
  dominantPatterns: z.array(BowenPatternSchema),
  alignmentSummary: z.string(),
  tensionSummary: z.string(),
  repairOpportunities: z.array(z.string()),
  instabilityFlags: z.array(z.string()),
  updatedAt: z.string(),
});
export type BowenFieldState = z.infer<typeof BowenFieldStateSchema>;
