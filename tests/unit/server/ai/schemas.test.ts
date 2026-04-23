import { describe, expect, it } from "vitest";
import { generateSubtasksInputSchema } from "@/server/ai/schemas/subtasks.schema";
import { estimateDeadlineInputSchema } from "@/server/ai/schemas/deadline.schema";
import { summarizeProjectInputSchema } from "@/server/ai/schemas/summary.schema";
import { detectBottlenecksInputSchema } from "@/server/ai/schemas/bottleneck.schema";

describe("generateSubtasksInputSchema", () => {
  it("deve aceitar entrada válida", () => {
    const result = generateSubtasksInputSchema.safeParse({
      taskTitle: "Criar tela de login",
    });
    expect(result.success).toBe(true);
  });

  it("deve rejeitar título vazio", () => {
    const result = generateSubtasksInputSchema.safeParse({ taskTitle: "" });
    expect(result.success).toBe(false);
  });
});

describe("estimateDeadlineInputSchema", () => {
  it("deve validar dados completos", () => {
    const result = estimateDeadlineInputSchema.safeParse({
      taskTitle: "Migrar banco de dados",
      subtasksCount: 5,
      priority: "HIGH",
      teamSize: 3,
    });
    expect(result.success).toBe(true);
  });
});

describe("summarizeProjectInputSchema", () => {
  it("deve validar dados de projeto", () => {
    const result = summarizeProjectInputSchema.safeParse({
      projectName: "OrquestraAI",
      totalTasks: 20,
      completedTasks: 12,
      inProgressTasks: 5,
      blockedTasks: 1,
      overdueCount: 2,
      teamSize: 4,
      daysActive: 30,
    });
    expect(result.success).toBe(true);
  });
});

describe("detectBottlenecksInputSchema", () => {
  it("deve validar dados de gargalos", () => {
    const result = detectBottlenecksInputSchema.safeParse({
      projectName: "OrquestraAI",
      members: [
        { name: "Douglas", assignedTasks: 8, completedThisWeek: 2, overdueCount: 3 },
      ],
      staleTasks: [
        { title: "Revisar API", daysWithoutUpdate: 7, status: "IN_PROGRESS" },
      ],
    });
    expect(result.success).toBe(true);
  });
});