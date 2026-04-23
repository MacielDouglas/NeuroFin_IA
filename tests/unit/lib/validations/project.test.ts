import { describe, expect, it } from "vitest";
import { createProjectSchema, updateProjectSchema } from "@/lib/validations/project";

describe("createProjectSchema", () => {
  it("deve validar dados corretos", () => {
    const result = createProjectSchema.safeParse({
      name: "Meu Projeto",
      description: "Descrição opcional",
    });
    expect(result.success).toBe(true);
  });

  it("deve rejeitar nome muito curto", () => {
    const result = createProjectSchema.safeParse({ name: "A" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toMatch(/2 caracteres/);
  });

  it("deve rejeitar nome ausente", () => {
    const result = createProjectSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("deve aceitar sem descrição", () => {
    const result = createProjectSchema.safeParse({ name: "Projeto válido" });
    expect(result.success).toBe(true);
  });
});

describe("updateProjectSchema", () => {
  it("deve aceitar parcial vazio", () => {
    const result = updateProjectSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  it("deve aceitar status ARCHIVED", () => {
    const result = updateProjectSchema.safeParse({ status: "ARCHIVED" });
    expect(result.success).toBe(true);
  });

  it("deve rejeitar status inválido", () => {
    const result = updateProjectSchema.safeParse({ status: "INVALID" });
    expect(result.success).toBe(false);
  });
});