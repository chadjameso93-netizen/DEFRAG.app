import { z } from "zod";
import { BowenFieldStateSchema } from "./bowen-field";
import { RelationalSynthesisSchema } from "./relational-synthesis";

export const RelationalWorkbenchStateSchema = z.object({
  schemaVersion: z.literal("1.0.0"),
  workspaceId: z.string(),
  userId: z.string(),
  bowenField: BowenFieldStateSchema,
  currentSynthesis: RelationalSynthesisSchema.optional(),
  updatedAt: z.string(),
});

export type RelationalWorkbenchState = z.infer<typeof RelationalWorkbenchStateSchema>;
