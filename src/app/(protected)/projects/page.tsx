import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { requireSession } from "@/lib/auth/authorize";
import { projectService } from "@/server/services/project.service";
import { Button } from "@/components/ui/button";
import { EmptyProjects } from "@/features/components/empty-projects";
import { ProjectCard } from "@/features/projects/components/project-card";
import { Suspense } from "react";
import { ProjectCardSkeleton } from "@/features/projects/components/project-card-skeleton";


export const metadata: Metadata = { title: "Projetos" };

export default async function ProjectsPage() {
  const session = await requireSession();
  const projects = await projectService.listByUser(session.user.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Projetos</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {projects.length} projeto{projects.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button asChild size="sm">
          <Link href="/projects/new">
            <Plus size={15} aria-hidden="true" />
            Novo projeto
          </Link>
        </Button>
      </div>

         <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        }
      >


      {projects.length === 0 ? (
        <EmptyProjects />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
      </Suspense>
    </div>
  );
}