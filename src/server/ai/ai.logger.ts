import type { AiFeature } from "@/generated/prisma/client";
import prisma from "@/lib/prisma/client";

type LogAiCallInput = {
  feature: AiFeature;
  input: unknown;
  output: unknown;
  model: string;
  provider: string;
  latencyMs: number;
  userId: string;
  projectId?: string;
  taskId?: string;
};

export async function logAiCall(data: LogAiCallInput): Promise<void> {
  try {
    await prisma.aiSuggestion.create({
      data: {
        feature: data.feature,
        input: data.input as never,
        output: data.output as never,
        model: data.model,
        provider: data.provider,
        latencyMs: data.latencyMs,
        userId: data.userId,
        projectId: data.projectId,
        taskId: data.taskId,
      },
    });
  } catch (err) {
    // Log não deve quebrar o fluxo principal
    console.error("[AI Logger] Falha ao persistir log:", err);
  }
}