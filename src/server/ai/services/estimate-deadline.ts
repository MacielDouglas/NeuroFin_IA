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
      `Limite atingido. Tente em ${Math.ceil((rateLimit.retryAfterMs ?? 60000) / 1000)}s`,
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
        "Analise as informações da tarefa e estime um prazo realista.",
        `A data de hoje é ${today}.`,
        'Responda APENAS com JSON: {"estimatedDays":5,"confidence":"MEDIUM","reasoning":"...","risks":["..."],"suggestedDate":"2026-05-01"}',
        "confidence: LOW, MEDIUM ou HIGH. suggestedDate no formato YYYY-MM-DD.",
      ].join(" "),
    },
    {
      role: "user",
      content: [
        `Tarefa: "${input.taskTitle}"`,
        `Subtarefas: ${input.subtasksCount}`,
        `Prioridade: ${input.priority}`,
        `Tamanho do time: ${input.teamSize} pessoa(s)`,
        input.assigneeName ? `Responsável: ${input.assigneeName}` : "",
        input.projectContext ? `Contexto: ${input.projectContext}` : "",
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

  const parsed = estimateDeadlineOutputSchema.safeParse(
    JSON.parse(response.content),
  );

  if (!parsed.success) {
    throw new AppError("Resposta da IA fora do formato esperado", "AI_PARSE_ERROR");
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