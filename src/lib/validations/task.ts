import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(2, "Título deve ter pelo menos 2 caracteres")
    .max(200, "Título deve ter no máximo 200 caracteres")
    .trim(),
  description: z
    .string()
    .max(2000, "Descrição deve ter no máximo 2000 caracteres")
    .trim()
    .optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).default("MEDIUM"),
  dueDate: z.coerce.date().optional(),
  assigneeId: z.string().cuid().optional(),
  projectId: z.string().cuid("ID de projeto inválido"),
});

export const updateTaskSchema = z.object({
  title: z.string().min(2).max(200).trim().optional(),
  description: z.string().max(2000).trim().optional(),
  status: z
    .enum(["BACKLOG", "TODO", "IN_PROGRESS", "IN_REVIEW", "DONE", "CANCELLED"])
    .optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
  dueDate: z.coerce.date().nullable().optional(),
  assigneeId: z.string().cuid().nullable().optional(),
});

export const createSubtaskSchema = z.object({
  title: z
    .string()
    .min(2, "Título deve ter pelo menos 2 caracteres")
    .max(200, "Título deve ter no máximo 200 caracteres")
    .trim(),
  taskId: z.string().cuid("ID de tarefa inválido"),
});

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;
export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;
export type CreateSubtaskSchema = z.infer<typeof createSubtaskSchema>;