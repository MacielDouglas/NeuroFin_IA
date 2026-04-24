import { z } from "zod";

export const estimateDeadlineInputSchema = z.object({
  taskTitle: z.string().min(3),
  taskDescription: z.string().optional(),
  subtasksCount: z.number().int().min(0).default(0),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).default("MEDIUM"),
  teamSize: z.number().int().min(1).default(1),
  assigneeName: z.string().optional(),
  projectContext: z.string().optional(),
});

export const estimateDeadlineOutputSchema = z.object({
  estimatedDays: z.number().int().min(1),
  confidence: z.enum(["LOW", "MEDIUM", "HIGH"]),
  reasoning: z.string(),
  risks: z.array(z.string()),
  suggestedDate: z.string(), // YYYY-MM-DD
});

export type EstimateDeadlineInput = z.infer<typeof estimateDeadlineInputSchema>;
export type EstimateDeadlineOutput = z.infer<typeof estimateDeadlineOutputSchema>;

export const deadlineJsonSchema = {
  type: "object",
  properties: {
    estimatedDays: { type: "number" },
    confidence:    { type: "string", enum: ["LOW", "MEDIUM", "HIGH"] },
    reasoning:     { type: "string" },
    risks:         { type: "array", items: { type: "string" }, maxItems: 5 },
    suggestedDate: { type: "string" },
  },
  required: ["estimatedDays", "confidence", "reasoning", "risks", "suggestedDate"],
  additionalProperties: false,
} as const;