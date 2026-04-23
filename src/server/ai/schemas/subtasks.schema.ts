import { z } from "zod";

export const generateSubtasksInputSchema = z.object({
  taskTitle: z.string().min(2).max(200),
  taskDescription: z.string().max(1000).optional(),
  projectContext: z.string().max(300).optional(),
});

export const subtaskItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  estimatedHours: z.number().min(0.5).max(40),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

export const generateSubtasksOutputSchema = z.object({
  subtasks: z.array(subtaskItemSchema).min(3).max(8),
  reasoning: z.string(),
});

export type GenerateSubtasksInput = z.infer<typeof generateSubtasksInputSchema>;
export type GenerateSubtasksOutput = z.infer<typeof generateSubtasksOutputSchema>;

// JSON Schema para Groq Structured Output
export const subtasksJsonSchema = {
  type: "object",
  properties: {
    subtasks: {
      type: "array",
      minItems: 3,
      maxItems: 8,
      items: {
        type: "object",
        properties: {
          title:          { type: "string" },
          description:    { type: "string" },
          estimatedHours: { type: "number" },
          priority:       { type: "string", enum: ["LOW", "MEDIUM", "HIGH"] },
        },
        required: ["title", "description", "estimatedHours", "priority"],
        additionalProperties: false,
      },
    },
    reasoning: { type: "string" },
  },
  required: ["subtasks", "reasoning"],
  additionalProperties: false,
} as const;