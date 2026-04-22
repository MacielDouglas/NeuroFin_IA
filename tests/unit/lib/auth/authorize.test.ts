import { describe, expect, it, vi } from "vitest";

vi.mock("next/headers", () => ({
  headers: vi.fn().mockResolvedValue(new Headers()),
}));

vi.mock("@/lib/auth/auth", () => ({
  auth: {
    api: {
      getSession: vi.fn().mockResolvedValue(null),
    },
  },
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

describe("authorize", () => {
  it("deve exportar a função requireSession", async () => {
    const { requireSession } = await import("@/lib/auth/authorize");
    expect(requireSession).toBeTypeOf("function");
  });

  it("deve redirecionar para sign-in quando não há sessão", async () => {
    const { redirect } = await import("next/navigation");
    const { requireSession } = await import("@/lib/auth/authorize");

    await requireSession().catch(() => {});

    expect(redirect).toHaveBeenCalledWith("/sign-in");
  });
});