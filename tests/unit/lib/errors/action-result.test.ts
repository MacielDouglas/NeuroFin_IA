import { describe, expect, it } from "vitest";
import { fail, ok } from "@/lib/errors/action-result";

describe("ok", () => {
  it("deve retornar success true com dados", () => {
    const result = ok({ id: "1", name: "Projeto" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.name).toBe("Projeto");
  });
});

describe("fail", () => {
  it("deve retornar success false com mensagem", () => {
    const result = fail("Erro inesperado");
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error).toBe("Erro inesperado");
  });

  it("deve incluir code quando fornecido", () => {
    const result = fail("Não autorizado", "UNAUTHORIZED");
    expect(result.success).toBe(false);
    if (!result.success) expect(result.code).toBe("UNAUTHORIZED");
  });
});