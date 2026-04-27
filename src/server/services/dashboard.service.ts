import prisma from "@/lib/prisma/client";

export async function getDashboardStats(userId: string) {
  const [activeProjects, pendingTasks, overdueTasks] = await Promise.all([
    // Projetos onde o usuário é dono e não estão concluídos/arquivados
    prisma.project.count({
      where: {
        ownerId: userId,
        status: "ACTIVE",
      },
    }),

    // Tarefas pendentes nos projetos do usuário
    prisma.task.count({
      where: {
        project: { ownerId: userId },
        status: { in: ["BACKLOG", "TODO", "IN_PROGRESS", "IN_REVIEW"] },
      },
    }),

    // "Gargalos" — tarefas atrasadas (dueDate no passado e não concluídas)
    prisma.task.count({
      where: {
        project: { ownerId: userId },
        status: { notIn: ["DONE", "CANCELLED"] },
        dueDate: { lt: new Date() },
      },
    }),
  ]);

  return { activeProjects, pendingTasks, overdueTasks };
}