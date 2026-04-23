import { describe, expect, it } from "vitest";
import { formatDueDate, isOverdue } from "@/lib/utils/task";

describe("isOverdue", () => {
  it("deve retornar false para null", () => {
    expect(isOverdue(null)).toBe(false);
  });

  it("deve retornar true para data passada", () => {
    const past = new Date(Date.now() - 86_400_000);
    expect(isOverdue(past)).toBe(true);
  });

  it("deve retornar false para data futura", () => {
    const future = new Date(Date.now() + 86_400_000);
    expect(isOverdue(future)).toBe(false);
  });
});

describe("formatDueDate", () => {
  it("deve retornar string vazia para null", () => {
    expect(formatDueDate(null)).toBe("");
  });

  it("deve formatar data corretamente", () => {
    const date = new Date("2026-12-25T12:00:00");
    const result = formatDueDate(date);
    expect(result).toMatch(/25/);
  });
});