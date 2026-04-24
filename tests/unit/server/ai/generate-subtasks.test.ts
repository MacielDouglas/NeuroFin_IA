import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/server/ai/provider/groq.provider", () => ({
  groqProvider: {
    complete: vi.fn(),
  },
}));

vi.mock("@/server/ai/ai.logger", () => ({
  logAiCall: vi.fn().mockResolvedValue(undefined),
}));

import { groqProvider } from "@/server/ai/provider/groq.provider";
import { generateSubtasks } from "@/server/ai/services/generate-subtasks";

const mockResponse = {
  content: JSON.stringify({
    subtasks: [
      { title: "Criar componente de formulário", description: "Implementar form com validação", estimatedHours: 3, priority: "HIGH" },
      { title: "Adicionar validação Zod", description: "Schema de validação", estimatedHours: 1, priority: "MEDIUM" },
      { title: "Criar server action", description: "Action para submit do form", estimatedHours: 2, priority: "HIGH" },
    ],
    reasoning: "A tarefa envolve frontend, validação e backend.",
  }),
  model: "llama-3.3-70b-versatile",
  latencyMs: 420,
  usage: { promptTokens: 150, completionTokens: 300 },
};

describe("generateSubtasks", () => {
  const userId = "user_test_123";

  beforeEach(() => {
    vi.clearAllMocks(); // ← reseta contadores e chamadas entre testes
    vi.mocked(groqProvider.complete).mockResolvedValue(mockResponse);
  });

  it("deve retornar subtarefas estruturadas", async () => {
    const result = await generateSubtasks(
      { taskTitle: "Criar tela de login" },
      userId,
    );

    expect(result.subtasks).toHaveLength(3);
    expect(result.subtasks[0].title).toBe("Criar componente de formulário");
    expect(result.reasoning).toBeTypeOf("string");
  });

  it("deve chamar o provider com messages corretas", async () => {
    await generateSubtasks({ taskTitle: "Criar tela de login" }, userId);

    expect(groqProvider.complete).toHaveBeenCalledOnce();
    const [messages] = vi.mocked(groqProvider.complete).mock.calls[0];
    expect(messages[0].role).toBe("system");
    expect(messages[1].content).toContain("Criar tela de login");
  });

  it("deve lançar erro se resposta fora do schema", async () => {
    vi.mocked(groqProvider.complete).mockResolvedValue({
      ...mockResponse,
      content: JSON.stringify({ invalid: true }),
    });

    await expect(
      generateSubtasks({ taskTitle: "Tarefa" }, userId),
    ).rejects.toThrow("Resposta da IA inválida para subtarefas");
  });

  it("deve rejeitar título muito curto", async () => {
    await expect(
      generateSubtasks({ taskTitle: "A" }, userId),
    ).rejects.toThrow();
  });
});