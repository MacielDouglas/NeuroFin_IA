import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
// import { ProjectCard } from "@/features/projects/components/project-card";
import type { ProjectWithOwner } from "@/types/project";
import { ProjectCard } from "@/features/projects/components/project-card";

const mockProject: ProjectWithOwner = {
  id: "proj_1",
  name: "OrquestraAI",
  description: "Gestão de projetos com IA",
  slug: "orquestra-ai",
  status: "ACTIVE",
  ownerId: "user_1",
  createdAt: new Date(),
  updatedAt: new Date(),
  owner: { id: "user_1", name: "Douglas", image: null },
  _count: { tasks: 10, members: 3 },
};

describe("ProjectCard", () => {
  it("deve renderizar nome do projeto", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText("OrquestraAI")).toBeInTheDocument();
  });

  it("deve renderizar descrição", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText("Gestão de projetos com IA")).toBeInTheDocument();
  });

  it("deve exibir contagem de tarefas", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText(/10 tarefas/)).toBeInTheDocument();
  });

  it("deve exibir contagem de membros", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText(/3 membros/)).toBeInTheDocument();
  });

  it("deve exibir badge de status Ativo", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText("Ativo")).toBeInTheDocument();
  });
});