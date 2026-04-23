import { z } from "zod";

export const estimateDeadlineInputSchema = z.object({
  taskTitle: z.string().min(2).max(200),
  subtasksCount: z.number().int().min(0),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  assigneeName: z.string().optional(),
  teamSize: z.number().int().min(1),
  projectContext: z.string().max(300).optional(),
});

export const estimateDeadlineOutputSchema = z.object({
  estimatedDays: z.number().min(0.5),
  confidence: z.enum(["LOW", "MEDIUM", "HIGH"]),
  reasoning: z.string(),
  risks: z.array(z.string()).max(5),
  suggestedDate: z.string(), // ISO date
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