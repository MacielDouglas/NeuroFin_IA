"use server";

import { AppError } from "@/lib/errors/app-error";
import { fail, ok } from "@/lib/errors/action-result";
import { getServerSession } from "@/lib/auth/session";
import { generateSubtasks } from "@/server/ai/services/generate-subtasks";
import { estimateDeadline } from "@/server/ai/services/estimate-deadline";
import { summarizeProject } from "@/server/ai/services/summarize-project";
import { detectBottlenecks } from "@/server/ai/services/detect-bottlenecks";
// import type { GenerateSubtasksInput } from "@/server/ai/schemas/subtasks.schema";
import type { EstimateDeadlineInput } from "@/server/ai/schemas/deadline.schema";
import type { SummarizeProjectInput } from "@/server/ai/schemas/summary.schema";
import type { DetectBottlenecksInput } from "@/server/ai/schemas/bottleneck.schema";

export async function generateSubtasksAction(
  taskId: string,
  taskTitle: string,
  taskDescription?: string,
  projectContext?: string,
) {
  const session = await getServerSession();
  if (!session) return fail("Não autenticado", "UNAUTHORIZED");

  try {
    const result = await generateSubtasks(
      {
        taskTitle,
        taskDescription,
        projectContext,
      },
      session.user.id,
      {taskId},
    );
    return ok(result);
  } catch (error) {
    console.error("[AI] generateSubtasks error:", error);
    if (error instanceof AppError) return fail(error.message, error.code);
    return fail("Erro ao gerar subtarefas");
  }
}



export async function estimateDeadlineAction(
  input: EstimateDeadlineInput,
  context?: { taskId?: string; projectId?: string },
) {
  const session = await getServerSession();
  if (!session) return fail("Não autenticado", "UNAUTHORIZED");

  try {
    const result = await estimateDeadline(input, session.user.id, context);
    return ok(result);
  } catch (error) {
    if (error instanceof AppError) return fail(error.message, error.code);
    return fail("Erro ao estimar prazo");
  }
}

export async function summarizeProjectAction(
  input: SummarizeProjectInput,
  projectId?: string,
) {
  const session = await getServerSession();
  if (!session) return fail("Não autenticado", "UNAUTHORIZED");

  try {
    const result = await summarizeProject(input, session.user.id, projectId);
    return ok(result);
  } catch (error) {
    console.error("[AI] summarizeProject error:", error); // ← temporário
    if (error instanceof AppError) return fail(error.message, error.code);
    return fail("Erro ao gerar resumo");
  }
}

export async function detectBottlenecksAction(
  input: DetectBottlenecksInput,
  projectId?: string,
) {
  const session = await getServerSession();
  if (!session) return fail("Não autenticado", "UNAUTHORIZED");

  try {
    const result = await detectBottlenecks(input, session.user.id, projectId);
    return ok(result);
  } catch (error) {
    console.error("[AI] detectBottlenecks error:", error); // ← temporário
    if (error instanceof AppError) return fail(error.message, error.code);
    return fail("Erro ao detectar gargalos");
  }
}