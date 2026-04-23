import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireSession } from "@/lib/auth/authorize";
import { projectService } from "@/server/services/project.service";
import { taskService } from "@/server/services/task.service";
import { ForbiddenError, NotFoundError } from "@/lib/errors/app-error";
import { AiSummaryPanel } from "@/features/ai/components/ai-summary-panel";
import { AiBottleneckPanel } from "@/features/ai/components/ai-bottleneck-panel";

export const metadata: Metadata = { title: "Painel IA" };

type AiPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProjectAiPage({ params }: AiPageProps) {
  const { id } = await params;
  const session = await requireSession();

  try {
    const [project, tasks] = await Promise.all([
      projectService.getById(id, session.user.id),
      taskService.listByProject(id, session.user.id),
    ]);

    const completedTasks = tasks.filter((t) => t.status === "DONE").length;
    const inProgressTasks = tasks.filter((t) => t.status === "IN_PROGRESS").length;
    const blockedTasks = tasks.filter((t) => t.status === "CANCELLED").length;
    const overdueCount = tasks.filter(
      (t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "DONE",
    ).length;
    const daysActive = Math.ceil(
      (Date.now() - new Date(project.createdAt).getTime()) / 86_400_000,
    );

    const summaryInput = {
      projectName: project.name,
      projectDescription: project.description ?? undefined,
      totalTasks: tasks.length,
      completedTasks,
      inProgressTasks,
      blockedTasks,
      overdueCount,
      teamSize: project._count.members,
      daysActive,
    };

    // Montar dados para gargalos (simplificado — sem agrupamento por membro aqui)
    const staleTasks = tasks
      .filter((t) => {
        const daysSince = Math.ceil(
          (Date.now() - new Date(t.updatedAt).getTime()) / 86_400_000,
        );
        return daysSince >= 3 && t.status !== "DONE" && t.status !== "CANCELLED";
      })
      .slice(0, 10)
      .map((t) => ({
        title: t.title,
        daysWithoutUpdate: Math.ceil(
          (Date.now() - new Date(t.updatedAt).getTime()) / 86_400_000,
        ),
        status: t.status,
        assignee: t.assignee?.name ?? undefined,
      }));

    const bottleneckInput = {
      projectName: project.name,
      members: [],
      staleTasks,
    };

    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Painel IA</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Insights inteligentes sobre {project.name}
          </p>
        </div>

        <AiSummaryPanel
          input={summaryInput}
          projectId={id}
        />

        <AiBottleneckPanel
          input={bottleneckInput}
          projectId={id}
        />
      </div>
    );
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof ForbiddenError) {
      notFound();
    }
    throw error;
  }
}