import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireSession } from "@/lib/auth/authorize";
import { projectService } from "@/server/services/project.service";
import { taskService } from "@/server/services/task.service";
import { ForbiddenError, NotFoundError } from "@/lib/errors/app-error";
import { ProjectHeader } from "@/features/projects/components/project-header";
import { TaskBoard } from "@/features/tasks/components/task-board";

type ProjectPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  return { title: `Projeto ${id}` };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const session = await requireSession();

  try {
    const [project, tasks] = await Promise.all([
      projectService.getById(id, session.user.id),
      taskService.listByProject(id, session.user.id),
    ]);

    return (
      <div className="flex h-full flex-col gap-6">
        <ProjectHeader project={project} />
        <TaskBoard tasks={tasks} projectId={id} />
      </div>
    );
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof ForbiddenError) {
      notFound();
    }
    throw error;
  }
}