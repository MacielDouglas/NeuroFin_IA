import { AppError } from "@/lib/errors/app-error";
import { checkRateLimit } from "@/server/ai/ai.limiter";
import { logAiCall } from "@/server/ai/ai.logger";
import { groqProvider } from "@/server/ai/provider/groq.provider";
import {
  estimateDeadlineInputSchema,
  estimateDeadlineOutputSchema,
  type EstimateDeadlineInput,
  type EstimateDeadlineOutput,
} from "@/server/ai/schemas/deadline.schema";

export async function estimateDeadline(
  rawInput: EstimateDeadlineInput,
  userId: string,
  context?: { taskId?: string; projectId?: string },
): Promise<EstimateDeadlineOutput> {
  const input = estimateDeadlineInputSchema.parse(rawInput);

  const rateLimit = checkRateLimit(userId, "ESTIMATE_DEADLINE");
  if (!rateLimit.allowed) {
    throw new AppError(
      `Limite de chamadas atingido. Tente novamente em ${Math.ceil((rateLimit.retryAfterMs ?? 60000) / 1000)}s`,
      "RATE_LIMIT_EXCEEDED",
      429,
    );
  }

  const today = new Date().toISOString().split("T")[0];

  const response = await groqProvider.complete(
    [
      {
        role: "system",
        content: [
          "Você é um gerente de projetos de software experiente.",
          "Analise as informações da tarefa e estime um prazo realista considerando complexidade, prioridade e tamanho do time.",
          `A data de hoje é ${today}.`,
          'Responda APENAS com JSON válido: {"estimatedDays":5,"confidence":"MEDIUM","reasoning":"...","risks":["..."],"suggestedDate":"2026-05-01"}',
          "confidence deve ser: LOW, MEDIUM ou HIGH. suggestedDate no formato YYYY-MM-DD.",
          "estimatedDays deve ser um número inteiro positivo (dias úteis estimados).",
        ].join(" "),
      },
      {
        role: "user",
        content: [
          `Tarefa: "${input.taskTitle}"`,
          input.taskDescription ? `Descrição: ${input.taskDescription}` : "",
          `Subtarefas planejadas: ${input.subtasksCount}`,
          `Prioridade: ${input.priority}`,
          `Tamanho do time: ${input.teamSize} pessoa(s)`,
          input.assigneeName ? `Responsável: ${input.assigneeName}` : "",
          input.projectContext ? `Contexto do projeto: ${input.projectContext}` : "",
          "Estime um prazo realista e identifique os principais riscos.",
        ]
          .filter(Boolean)
          .join("\n"),
      },
    ],
    {
      temperature: 0.2,
      maxTokens: 800,
    },
  );

  const raw = JSON.parse(response.content) as unknown;

  const parsed = estimateDeadlineOutputSchema.safeParse(raw);
  if (!parsed.success) {
    throw new AppError(
      "Resposta da IA inválida para estimativa de prazo",
      "AI_PARSE_ERROR",
      500,
    );
  }

  await logAiCall({
    feature: "ESTIMATE_DEADLINE",
    input,
    output: parsed.data,
    model: response.model,
    provider: "groq",
    latencyMs: response.latencyMs,
    userId,
    ...context,
  });

  return parsed.data;
}