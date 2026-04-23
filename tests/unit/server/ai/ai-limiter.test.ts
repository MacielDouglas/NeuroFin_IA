import { describe, expect, it, beforeEach, vi } from "vitest";

describe("checkRateLimit", () => {
  // Reimporta o módulo fresh a cada teste para limpar o Map
  beforeEach(() => {
    vi.resetModules();
  });

  it("deve permitir chamadas dentro do limite", async () => {
    const { checkRateLimit } = await import("@/server/ai/ai.limiter");
    const result = checkRateLimit("user_1", "GENERATE_SUBTASKS");
    expect(result.allowed).toBe(true);
  });

  it("deve bloquear após atingir o limite", async () => {
    const { checkRateLimit } = await import("@/server/ai/ai.limiter");

    // Consome todas as 10 chamadas permitidas
    for (let i = 0; i < 10; i++) {
      checkRateLimit("user_limit_test", "GENERATE_SUBTASKS");
    }

    const blocked = checkRateLimit("user_limit_test", "GENERATE_SUBTASKS");
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterMs).toBeGreaterThan(0);
  });

  it("deve isolar limites por usuário", async () => {
    const { checkRateLimit } = await import("@/server/ai/ai.limiter");

    for (let i = 0; i < 10; i++) {
      checkRateLimit("user_a", "GENERATE_SUBTASKS");
    }

    const result = checkRateLimit("user_b", "GENERATE_SUBTASKS");
    expect(result.allowed).toBe(true);
  });
});