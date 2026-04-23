"use client"

import Link from "next/link";
import { BarChart2, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getStatusLabel } from "@/lib/utils/project";
import type { ProjectWithOwner } from "@/types/project";

type ProjectHeaderProps = {
  project: ProjectWithOwner;
};

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            {project.name}
          </h1>
          <Badge variant={project.status === "ACTIVE" ? "default" : "outline"}>
            {getStatusLabel(project.status)}
          </Badge>
        </div>
        {project.description ? (
          <p className="text-sm text-muted-foreground">{project.description}</p>
        ) : null}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button asChild variant="secondary" size="sm">
          <Link href={`/projects/${project.id}/ai`}>
            <BarChart2 size={14} aria-hidden="true" />
            Painel IA
          </Link>
        </Button>
        <Button asChild variant="ghost" size="sm">
          <Link href={`/projects/${project.id}/settings`}>
            <Settings size={14} aria-hidden="true" />
            <span className="sr-only">Configurações do projeto</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}