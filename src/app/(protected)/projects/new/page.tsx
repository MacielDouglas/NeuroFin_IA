import { ProjectForm } from "@/features/projects/components/project-form";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Novo projeto" };

export default function NewProjectPage() {
  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Novo projeto</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Preencha as informações para criar seu projeto.
        </p>
      </div>
      <ProjectForm />
    </div>
  );
}