import { AppError } from "@/lib/errors/app-error";
import { checkRateLimit } from "@/server/ai/ai.limiter";
import { logAiCall } from "@/server/ai/ai.logger";
import { groqProvider } from "@/server/ai/provider/groq.provider";
import {
  detectBottlenecksInputSchema,
  detectBottlenecksOutputSchema,
  type DetectBottlenecksInput,
  type DetectBottlenecksOutput,
} from "@/server/ai/schemas/bottleneck.schema";

export async function detectBottlenecks(
  rawInput: DetectBottlenecksInput,
  userId: string,
  projectId?: string,
): Promise<DetectBottlenecksOutput> {
  const input = detectBottlenecksInputSchema.parse(rawInput);

  const rateLimit = checkRateLimit(userId, "DETECT_BOTTLENECKS");
  if (!rateLimit.allowed) {
    throw new AppError(
      `Limite atingido. Tente em ${Math.ceil((rateLimit.retryAfterMs ?? 60000) / 1000)}s`,
      "RATE_LIMIT_EXCEEDED",
      429,
    );
  }

 const response = await groqProvider.complete(
  [
    {
      role: "system",
      content: [
        "Você é um analista de produtividade de times de desenvolvimento.",
        "Identifique gargalos, sobrecargas e riscos operacionais com base nos dados.",
        'Responda APENAS com JSON: {"bottlenecks":[{"type":"STALE_TASK","severity":"HIGH","title":"...","description":"...","recommendation":"...","affectedEntity":"..."}],"summary":"...","urgentActionRequired":false}',
        "type: OVERLOADED_MEMBER, STALE_TASK, UNASSIGNED_CRITICAL ou DEADLINE_RISK.",
        "severity: LOW, MEDIUM, HIGH ou CRITICAL.",
      ].join(" "),
    },
    {
      role: "user",
      content: [
        `Projeto: ${input.projectName}`,
        "",
        `Membros do time (${input.members.length}):`,
        ...input.members.map(
          (m) =>
            `- ${m.name}: ${m.assignedTasks} tarefas, ${m.completedThisWeek} concluídas esta semana, ${m.overdueCount} atrasadas`,
        ),
        "",
        `Tarefas paradas (${input.staleTasks.length}):`,
        ...input.staleTasks.map(
          (t) =>
            `- "${t.title}" — ${t.daysWithoutUpdate} dias sem atualização, status: ${t.status}${t.assignee ? `, responsável: ${t.assignee}` : ""}`,
        ),
      ].join("\n"),
    },
  ],
  {
    temperature: 0.2,
    maxTokens: 1500,
  },
);

  const parsed = detectBottlenecksOutputSchema.safeParse(
    JSON.parse(response.content),
  );

  if (!parsed.success) {
    throw new AppError("Resposta da IA fora do formato esperado", "AI_PARSE_ERROR");
  }

  await logAiCall({
    feature: "DETECT_BOTTLENECKS",
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