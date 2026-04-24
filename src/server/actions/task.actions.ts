"use server";

import { AppError } from "@/lib/errors/app-error";
import { fail, ok } from "@/lib/errors/action-result";
import { createSubtaskSchema, createTaskSchema, updateTaskSchema } from "@/lib/validations/task";
import { getServerSession } from "@/lib/auth/session";
import { taskService } from "@/server/services/task.service";
import { revalidatePath } from "next/cache";



export async function createTaskAction(formData: FormData) {
  const session = await getServerSession();
  if (!session) return fail("Não autenticado", "UNAUTHORIZED");

  const raw = {
    title:     formData.get("title"),
    projectId: formData.get("projectId"),
  };

  // formData.get() retorna null se o campo não existe — converter para undefined
  const parsed = createTaskSchema.safeParse({
    title:     raw.title ?? undefined,
    projectId: raw.projectId ?? undefined,
  });

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Dados inválidos";
    return fail(message, "VALIDATION_ERROR");
  }

  try {
    const task = await taskService.create(parsed.data, session.user.id);
    return ok(task);
  } catch (error) {
    if (error instanceof AppError) return fail(error.message, error.code);
    return fail("Erro ao criar tarefa");
  }
}

export async function updateTaskAction(id: string, data: Record<string, unknown>) {
  const session = await getServerSession();
  if (!session) return fail("Não autenticado", "UNAUTHORIZED");

  const parsed = updateTaskSchema.safeParse(data);
  if (!parsed.success) {
    return fail(parsed.error.issues[0].message, "VALIDATION_ERROR");
  }

  try {
    const task = await taskService.update(id, parsed.data, session.user.id);
    revalidatePath(`/projects/${task.projectId}`);
    return ok(task);
  } catch (error) {
    if (error instanceof AppError) return fail(error.message, error.code);
    return fail("Erro ao atualizar tarefa");
  }
}

export async function createSubtaskAction(data: {
  title: string;
  taskId: string;
}) {
  const session = await getServerSession();
  if (!session) return fail("Não autenticado", "UNAUTHORIZED");

  const parsed = createSubtaskSchema.safeParse(data);
  if (!parsed.success) {
    return fail(parsed.error.issues[0].message, "VALIDATION_ERROR");
  }

  try {
    const subtask = await taskService.createSubtask(parsed.data, session.user.id);
    return ok(subtask);
  } catch (error) {
    if (error instanceof AppError) return fail(error.message, error.code);
    return fail("Erro ao criar subtarefa");
  }
}

export async function toggleSubtaskAction(subtaskId: string) {
  const session = await getServerSession();
  if (!session) return fail("Não autenticado", "UNAUTHORIZED");

  try {
    const subtask = await taskService.toggleSubtask(subtaskId, session.user.id);
    return ok(subtask);
  } catch (error) {
    if (error instanceof AppError) return fail(error.message, error.code);
    return fail("Erro ao atualizar subtarefa");
  }
}

export async function createSubtasksBatchAction(
  taskId: string,
  subtasks: Array<{ title: string; description?: string }>,
) {
  const session = await getServerSession();
  if (!session) return fail("Não autenticado", "UNAUTHORIZED");

  try {
    const created = await Promise.all(
      subtasks.map((s) =>
        taskService.createSubtask(
          { title: s.title, taskId },
          session.user.id,
        ),
      ),
    );
    return ok(created);
  } catch (error) {
    if (error instanceof AppError) return fail(error.message, error.code);
    return fail("Erro ao salvar subtarefas");
  }
}