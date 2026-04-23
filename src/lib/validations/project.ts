import { z } from "zod";

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(80, "Nome deve ter no máximo 80 caracteres")
    .trim(),
  description: z
    .string()
    .max(500, "Descrição deve ter no máximo 500 caracteres")
    .trim()
    .optional(),
});

export const updateProjectSchema = createProjectSchema
  .partial()
  .extend({
    status: z.enum(["ACTIVE", "ARCHIVED", "COMPLETED"]).optional(),
  });

export type CreateProjectSchema = z.infer<typeof createProjectSchema>;
export type UpdateProjectSchema = z.infer<typeof updateProjectSchema>;