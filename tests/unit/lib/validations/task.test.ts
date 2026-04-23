import { describe, expect, it } from "vitest";
import { createSubtaskSchema, createTaskSchema, updateTaskSchema } from "@/lib/validations/task";

describe("createTaskSchema", () => {

  it("deve validar dados mínimos", () => {
    const result = createTaskSchema.safeParse({
      title: "Tarefa válida",
      projectId: "clxxxxxxxxxxxxxxxx",
    });
    expect(result.success).toBe(true);
  });

  it("deve aplicar priority MEDIUM por padrão", () => {
    const result = createTaskSchema.safeParse({
      title: "Tarefa",
      projectId: "clxxxxxxxxxxxxxxxx",
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.priority).toBe("MEDIUM");
  });

  it("deve rejeitar título vazio", () => {
    const result = createTaskSchema.safeParse({
      title: "",
      projectId: "clxxxxxxxxxxxxxxxx",
    });
    expect(result.success).toBe(false);
  });

  it("deve aceitar dueDate como string ISO", () => {
    const result = createTaskSchema.safeParse({
      title: "Tarefa com prazo",
      projectId: "clxxxxxxxxxxxxxxxx",
      dueDate: "2026-12-31",
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.dueDate).toBeInstanceOf(Date);
  });
});

describe("updateTaskSchema", () => {
  it("deve aceitar apenas status", () => {
    const result = updateTaskSchema.safeParse({ status: "IN_PROGRESS" });
    expect(result.success).toBe(true);
  });

  it("deve aceitar assigneeId null para desatribuir", () => {
    const result = updateTaskSchema.safeParse({ assigneeId: null });
    expect(result.success).toBe(true);
  });

  it("deve rejeitar status inválido", () => {
    const result = updateTaskSchema.safeParse({ status: "INEXISTENTE" });
    expect(result.success).toBe(false);
  });
});

describe("createSubtaskSchema", () => {
  it("deve validar subtarefa válida", () => {
    const result = createSubtaskSchema.safeParse({
      title: "Subtarefa",
      taskId: "clxxxxxxxxxxxxxxxx",
    });
    expect(result.success).toBe(true);
  });

  it("deve rejeitar título vazio", () => {
    const result = createSubtaskSchema.safeParse({
      title: "",
      taskId: "clxxxxxxxxxxxxxxxx",
    });
    expect(result.success).toBe(false);
  });
});