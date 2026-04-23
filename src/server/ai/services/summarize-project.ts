import { AppError } from "@/lib/errors/app-error";
import { checkRateLimit } from "@/server/ai/ai.limiter";
import { logAiCall } from "@/server/ai/ai.logger";
import { groqProvider } from "@/server/ai/provider/groq.provider";
import {
  summarizeProjectInputSchema,
  summarizeProjectOutputSchema,
  type SummarizeProjectInput,
  type SummarizeProjectOutput,
} from "@/server/ai/schemas/summary.schema";

export async function summarizeProject(
  rawInput: SummarizeProjectInput,
  userId: string,
  projectId?: string,
): Promise<SummarizeProjectOutput> {
  const input = summarizeProjectInputSchema.parse(rawInput);

  const rateLimit = checkRateLimit(userId, "SUMMARIZE_PROJECT");
  if (!rateLimit.allowed) {
    throw new AppError(
      `Limite atingido. Tente em ${Math.ceil((rateLimit.retryAfterMs ?? 60000) / 1000)}s`,
      "RATE_LIMIT_EXCEEDED",
      429,
    );
  }

  const completionRate =
    input.totalTasks > 0
      ? Math.round((input.completedTasks / input.totalTasks) * 100)
      : 0;

 const response = await groqProvider.complete(
  [
    {
      role: "system",
      content: [
        "Você é um PM técnico que gera status reports concisos e objetivos.",
        "Use linguagem clara e direta. Evite jargões. Seja honesto sobre riscos.",
        'Responda APENAS com JSON: {"headline":"...","statusReport":"...","highlights":["..."],"concerns":["..."],"overallHealth":"ON_TRACK"}',
        "overallHealth: CRITICAL, AT_RISK, ON_TRACK ou AHEAD.",
      ].join(" "),
    },
    {
      role: "user",
      content: [
        `Projeto: ${input.projectName}`,
        input.projectDescription ? `Descrição: ${input.projectDescription}` : "",
        `Total de tarefas: ${input.totalTasks}`,
        `Concluídas: ${input.completedTasks} (${completionRate}%)`,
        `Em andamento: ${input.inProgressTasks}`,
        `Bloqueadas: ${input.blockedTasks}`,
        `Atrasadas: ${input.overdueCount}`,
        `Membros do time: ${input.teamSize}`,
        `Dias ativos: ${input.daysActive}`,
      ]
        .filter(Boolean)
        .join("\n"),
    },
  ],
  {
    temperature: 0.3,
    maxTokens: 1000,
  },
);

  const parsed = summarizeProjectOutputSchema.safeParse(
    JSON.parse(response.content),
  );

  if (!parsed.success) {
    throw new AppError("Resposta da IA fora do formato esperado", "AI_PARSE_ERROR");
  }

  await logAiCall({
    feature: "SUMMARIZE_PROJECT",
    input,
    output: parsed.data,
    model: response.model,
    provider: "groq",
    latencyMs: response.latencyMs,
    userId,
    projectId,
  });

  return parsed.data;
}