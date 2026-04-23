import { z } from "zod";

export const summarizeProjectInputSchema = z.object({
  projectName: z.string(),
  projectDescription: z.string().optional(),
  totalTasks: z.number().int(),
  completedTasks: z.number().int(),
  inProgressTasks: z.number().int(),
  blockedTasks: z.number().int(),
  overdueCount: z.number().int(),
  teamSize: z.number().int(),
  daysActive: z.number().int(),
});

export const summarizeProjectOutputSchema = z.object({
  headline: z.string().max(120),
  statusReport: z.string().max(600),
  highlights: z.array(z.string()).min(1).max(4),
  concerns: z.array(z.string()).max(4),
  overallHealth: z.enum(["CRITICAL", "AT_RISK", "ON_TRACK", "AHEAD"]),
});

export type SummarizeProjectInput = z.infer<typeof summarizeProjectInputSchema>;
export type SummarizeProjectOutput = z.infer<typeof summarizeProjectOutputSchema>;

export const summaryJsonSchema = {
  type: "object",
  properties: {
    headline:     { type: "string" },
    statusReport: { type: "string" },
    highlights:   { type: "array", items: { type: "string" } },
    concerns:     { type: "array", items: { type: "string" } },
    overallHealth: {
      type: "string",
      enum: ["CRITICAL", "AT_RISK", "ON_TRACK", "AHEAD"],
    },
  },
  required: ["headline", "statusReport", "highlights", "concerns", "overallHealth"],
  additionalProperties: false,
} as const;