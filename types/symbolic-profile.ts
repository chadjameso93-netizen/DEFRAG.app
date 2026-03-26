import { z } from "zod";

export const FrameworkKeySchema = z.enum([
  "astrology",
  "human_design",
  "gene_keys",
  "numerology",
  "family_systems",
  "cbt_patterning",
  "trauma_informed",
]);
export type FrameworkKey = z.infer<typeof FrameworkKeySchema>;

export const ConfidenceBandSchema = z.enum(["low", "medium", "high"]);
export type ConfidenceBand = z.infer<typeof ConfidenceBandSchema>;

export const SourceKindSchema = z.enum([
  "user_input",
  "message",
  "memory",
  "symbolic_profile",
  "transit",
  "relationship_graph",
  "insight_object",
  "manual_override",
]);
export type SourceKind = z.infer<typeof SourceKindSchema>;

export const SourceRefSchema = z.object({
  id: z.string(),
  kind: SourceKindSchema,
  label: z.string().optional(),
  createdAt: z.string().optional(),
});
export type SourceRef = z.infer<typeof SourceRefSchema>;

export const NatalAccuracySchema = z.enum(["exact", "approximate", "unknown"]);
export type NatalAccuracy = z.infer<typeof NatalAccuracySchema>;

export const NatalDataSchema = z.object({
  birthDate: z.string().optional(),
  birthTime: z.string().optional(),
  birthLocation: z.string().optional(),
  timezone: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  accuracy: NatalAccuracySchema.optional(),
});
export type NatalData = z.infer<typeof NatalDataSchema>;

export const AstrologyProfileSchema = z.object({
  sun: z.string().optional(),
  moon: z.string().optional(),
  rising: z.string().optional(),
  houses: z.record(z.string(), z.string()).optional(),
  planets: z.record(z.string(), z.string()).optional(),
  aspects: z.array(z.string()).optional(),
  transits: z.array(z.string()).optional(),
  summary: z.string().optional(),
});
export type AstrologyProfile = z.infer<typeof AstrologyProfileSchema>;

export const HumanDesignProfileSchema = z.object({
  type: z.string().optional(),
  strategy: z.string().optional(),
  authority: z.string().optional(),
  profile: z.string().optional(),
  definition: z.string().optional(),
  signature: z.string().optional(),
  notSelfTheme: z.string().optional(),
  centers: z.record(z.string(), z.enum(["defined", "undefined"])).optional(),
  channels: z.array(z.string()).optional(),
  gates: z.array(z.string()).optional(),
  summary: z.string().optional(),
});
export type HumanDesignProfile = z.infer<typeof HumanDesignProfileSchema>;

export const GeneKeysProfileSchema = z.object({
  lifeWork: z.string().optional(),
  evolution: z.string().optional(),
  radiance: z.string().optional(),
  purpose: z.string().optional(),
  activationSequence: z.array(z.string()).optional(),
  venusSequence: z.array(z.string()).optional(),
  pearlSequence: z.array(z.string()).optional(),
  themes: z.array(z.string()).optional(),
  summary: z.string().optional(),
});
export type GeneKeysProfile = z.infer<typeof GeneKeysProfileSchema>;

export const NumerologyProfileSchema = z.object({
  lifePath: z.string().optional(),
  expression: z.string().optional(),
  soulUrge: z.string().optional(),
  birthdayNumber: z.string().optional(),
  maturityNumber: z.string().optional(),
  personalYear: z.string().optional(),
  themes: z.array(z.string()).optional(),
  summary: z.string().optional(),
});
export type NumerologyProfile = z.infer<typeof NumerologyProfileSchema>;

export const FrameworkSignalSchema = z.object({
  framework: FrameworkKeySchema,
  key: z.string(),
  label: z.string(),
  value: z.union([z.string(), z.number(), z.boolean(), z.array(z.string())]),
  confidence: ConfidenceBandSchema.optional(),
  weight: z.number().min(0).max(1).optional(),
  userFacingSummary: z.string().optional(),
  internalNotes: z.string().optional(),
  sources: z.array(SourceRefSchema).optional(),
});
export type FrameworkSignal = z.infer<typeof FrameworkSignalSchema>;

export const SymbolicProfileSynthesisSchema = z.object({
  personId: z.string(),
  natal: NatalDataSchema.optional(),
  astrology: AstrologyProfileSchema.optional(),
  humanDesign: HumanDesignProfileSchema.optional(),
  geneKeys: GeneKeysProfileSchema.optional(),
  numerology: NumerologyProfileSchema.optional(),
  crossFrameworkSignals: z.array(FrameworkSignalSchema),
  stableThemes: z.array(z.string()),
  sensitivities: z.array(z.string()),
  leveragePoints: z.array(z.string()),
  communicationStyle: z.string().optional(),
  conflictStyle: z.string().optional(),
  regulationStyle: z.string().optional(),
  synthesisSummary: z.string(),
  updatedAt: z.string(),
});
export type SymbolicProfileSynthesis = z.infer<
  typeof SymbolicProfileSynthesisSchema
>;
