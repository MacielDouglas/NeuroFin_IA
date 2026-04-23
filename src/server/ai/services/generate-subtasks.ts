import { AppError } from "@/lib/errors/app-error";
import { checkRateLimit } from "@/server/ai/ai.limiter";
import { logAiCall } from "@/server/ai/ai.logger";
import { groqProvider } from "@/server/ai/provider/groq.provider";
import {
  generateSubtasksInputSchema,
  generateSubtasksOutputSchema,
    type GenerateSubtasksInput,
  type GenerateSubtasksOutput,
} from "@/server/ai/schemas/subtasks.schema";

export async function generateSubtasks(
  rawInput: GenerateSubtasksInput,
  userId: string,
  context?: { taskId?: string; projectId?: string },
): Promise<GenerateSubtasksOutput> {
  const input = generateSubtasksInputSchema.parse(rawInput);

  const rateLimit = checkRateLimit(userId, "GENERATE_SUBTASKS");
  if (!rateLimit.allowed) {
    throw new AppError(
      `Limite de chamadas atingido. Tente novamente em ${Math.ceil((rateLimit.retryAfterMs ?? 60000) / 1000)}s`,
      "RATE_LIMIT_EXCEEDED",
      429,
    );
  }

const response = await groqProvider.complete(
  [
    {
      role: "system",
      content: [
        "Você é um engenheiro de software sênior especializado em gestão de projetos ágeis.",
        "Sua tarefa é quebrar tarefas de desenvolvimento em subtarefas técnicas menores e acionáveis.",
        "Cada subtarefa deve ser específica, estimável e completável em até 2 dias.",
        'Responda APENAS com um objeto JSON válido no formato: {"subtasks":[{"title":"...","description":"...","estimatedHours":2,"priority":"HIGH"}],"reasoning":"..."}',
        "Priority deve ser: LOW, MEDIUM ou HIGH. estimatedHours entre 0.5 e 40.",
      ].join(" "),
    },
    {
      role: "user",
      content: [
        `Tarefa: "${input.taskTitle}"`,
        input.taskDescription ? `Descrição: ${input.taskDescription}` : "",
        input.projectContext ? `Contexto do projeto: ${input.projectContext}` : "",
        "Gere entre 3 e 8 subtarefas técnicas para completar esta tarefa.",
      ]
        .filter(Boolean)
        .join("\n"),
    },
  ],
  {
    temperature: 0.4,
    maxTokens: 1500,
  },
);

  const parsed = generateSubtasksOutputSchema.safeParse(
    JSON.parse(response.content),
  );

  if (!parsed.success) {
    throw new AppError("Resposta da IA fora do formato esperado", "AI_PARSE_ERROR");
  }

  await logAiCall({
    feature: "GENERATE_SUBTASKS",
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