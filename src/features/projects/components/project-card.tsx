import Link from "next/link";
import { Users, CheckSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getProgressPercent, getStatusLabel } from "@/lib/utils/project";
import type { ProjectWithOwner } from "@/types/project";

type ProjectCardProps = {
  project: ProjectWithOwner;
};

export function ProjectCard({ project }: ProjectCardProps) {
const progress = getProgressPercent(
  project._count.completedTasks ?? 0,
  project._count.tasks,
);

  return (
    <Link href={`/projects/${project.id}`} className="group block">
      <Card className="h-full transition-shadow duration-150 group-hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="line-clamp-1 text-[15px]">
              {project.name}
            </CardTitle>
            <Badge
              variant={project.status === "ACTIVE" ? "default" : "outline"}
              className="shrink-0"
            >
              {getStatusLabel(project.status)}
            </Badge>
          </div>
          {project.description ? (
            <p className="line-clamp-2 text-[13px] text-muted-foreground">
              {project.description}
            </p>
          ) : null}
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Barra de progresso */}
          <div className="space-y-1">
            <div className="flex justify-between text-[12px] text-muted-foreground">
              <span>Progresso</span>
              <span>{progress}%</span>
            </div>
<div
  role="progressbar"
  aria-valuenow={progress}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label={`Progresso do projeto: ${progress}%`}
  className="h-1.5 bg-secondary w-full rounded-full overflow-hidden"
>
  <div
    className="h-full rounded-full bg-primary transition-all duration-300"
    style={{ width: `${progress}%` }}
  />
</div>
          </div>

          {/* Métricas */}
          <div className="flex items-center gap-4 text-[12px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <CheckSquare size={12} aria-hidden="true" />
              {project._count.tasks} tarefas
            </span>
            <span className="flex items-center gap-1">
              <Users size={12} aria-hidden="true" />
              {project._count.members} membro{project._count.members !== 1 ? "s" : ""}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}