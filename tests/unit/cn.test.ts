import { describe, expect, it } from "vitest";
import { cn } from "../../src/lib/utils/cn";

describe("cn", () => {
  it("deve mesclar classes do Tailwind corretamente", () => {
    expect(cn("px-2", "px-4", "text-sm")).toBe("px-4 text-sm");
  });
});