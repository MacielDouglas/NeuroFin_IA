import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "@/components/ui/badge";

describe("Badge", () => {
  it("deve renderizar o conteúdo", () => {
    render(<Badge>Em andamento</Badge>);
    expect(screen.getByText("Em andamento")).toBeInTheDocument();
  });

  it("deve aceitar variante success", () => {
    render(<Badge variant="success">Concluído</Badge>);
    expect(screen.getByText("Concluído")).toBeInTheDocument();
  });

  it("deve aceitar variante destructive", () => {
    render(<Badge variant="destructive">Bloqueado</Badge>);
    expect(screen.getByText("Bloqueado")).toBeInTheDocument();
  });
});