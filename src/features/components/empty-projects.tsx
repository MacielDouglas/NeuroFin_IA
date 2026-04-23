import Link from "next/link";
import { FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyProjects() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-muted">
        <FolderPlus size={22} className="text-muted-foreground" aria-hidden="true" />
      </div>
      <h3 className="text-base font-semibold">Nenhum projeto ainda</h3>
      <p className="mt-1 max-w-xs text-sm text-muted-foreground">
        Crie seu primeiro projeto para começar a organizar tarefas com IA.
      </p>
      <Button asChild className="mt-6" size="sm">
        <Link href="/projects/new">Criar projeto</Link>
      </Button>
    </div>
  );
}