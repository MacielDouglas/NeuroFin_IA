import { z } from "zod";

export const detectBottlenecksInputSchema = z.object({
  projectName: z.string(),
  members: z.array(z.object({
    name: z.string(),
    assignedTasks: z.number().int(),
    completedThisWeek: z.number().int(),
    overdueCount: z.number().int(),
  })),
  staleTasks: z.array(z.object({
    title: z.string(),
    daysWithoutUpdate: z.number().int(),
    status: z.string(),
    assignee: z.string().optional(),
  })),
});

export const bottleneckItemSchema = z.object({
  type: z.enum(["OVERLOADED_MEMBER", "STALE_TASK", "UNASSIGNED_CRITICAL", "DEADLINE_RISK"]),
  severity: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  title: z.string(),
  description: z.string(),
  recommendation: z.string(),
  affectedEntity: z.string(),
});

export const detectBottlenecksOutputSchema = z.object({
  bottlenecks: z.array(bottleneckItemSchema).max(10),
  summary: z.string().max(400),
  urgentActionRequired: z.boolean(),
});

export type DetectBottlenecksInput = z.infer<typeof detectBottlenecksInputSchema>;
export type DetectBottlenecksOutput = z.infer<typeof detectBottlenecksOutputSchema>;

export const bottleneckJsonSchema = {
  type: "object",
  properties: {
    bottlenecks: {
      type: "array",
      maxItems: 10,
      items: {
        type: "object",
        properties: {
          type:          { type: "string", enum: ["OVERLOADED_MEMBER", "STALE_TASK", "UNASSIGNED_CRITICAL", "DEADLINE_RISK"] },
          severity:      { type: "string", enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"] },
          title:         { type: "string" },
          description:   { type: "string" },
          recommendation:{ type: "string" },
          affectedEntity:{ type: "string" },
        },
        required: ["type", "severity", "title", "description", "recommendation", "affectedEntity"],
        additionalProperties: false,
      },
    },
    summary:              { type: "string" },
    urgentActionRequired: { type: "boolean" },
  },
  required: ["bottlenecks", "summary", "urgentActionRequired"],
  additionalProperties: false,
} as const;