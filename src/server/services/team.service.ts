import prisma from "@/lib/prisma/client";

export type MemberWithLoad = {
  userId: string;
  name: string | null;
  image: string | null;
  email: string;
  projects: Array<{ id: string; name: string; role: string }>;
  taskCounts: {
    total: number;
    todo: number;
    inProgress: number;
    done: number;
    overdue: number;
  };
};

export const teamService = {
  async listByUser(userId: string): Promise<MemberWithLoad[]> {
    // Projetos do usuário
    const userProjects = await prisma.project.findMany({
      where: { members: { some: { userId } } },
      select: { id: true },
    });

    const projectIds = userProjects.map((p) => p.id);

    // Membros desses projetos
    const members = await prisma.projectMember.findMany({
      where: { projectId: { in: projectIds } },
      include: {
        user: { select: { id: true, name: true, image: true, email: true } },
        project: { select: { id: true, name: true } },
      },
    });

    // Agrupa por usuário
    const userMap = new Map<string, MemberWithLoad>();

    for (const member of members) {
      const existing = userMap.get(member.userId);
      if (existing) {
        if (!existing.projects.find((p) => p.id === member.projectId)) {
          existing.projects.push({
            id: member.project.id,
            name: member.project.name,
            role: member.role,
          });
        }
      } else {
        userMap.set(member.userId, {
          userId: member.userId,
          name: member.user.name,
          image: member.user.image,
          email: member.user.email,
          projects: [
            {
              id: member.project.id,
              name: member.project.name,
              role: member.role,
            },
          ],
          taskCounts: { total: 0, todo: 0, inProgress: 0, done: 0, overdue: 0 },
        });
      }
    }

    // Carga de tarefas por membro
    const now = new Date();
    const tasks = await prisma.task.findMany({
      where: {
        projectId: { in: projectIds },
        assigneeId: { in: Array.from(userMap.keys()) },
        status: { not: "CANCELLED" },
      },
      select: {
        assigneeId: true,
        status: true,
        dueDate: true,
      },
    });

    for (const task of tasks) {
      if (!task.assigneeId) continue;
      const member = userMap.get(task.assigneeId);
      if (!member) continue;

      member.taskCounts.total++;
      if (task.status === "TODO" || task.status === "BACKLOG")
        member.taskCounts.todo++;
      if (task.status === "IN_PROGRESS" || task.status === "IN_REVIEW")
        member.taskCounts.inProgress++;
      if (task.status === "DONE") member.taskCounts.done++;
      if (task.dueDate && new Date(task.dueDate) < now && task.status !== "DONE")
        member.taskCounts.overdue++;
    }

    return Array.from(userMap.values()).sort(
      (a, b) => b.taskCounts.inProgress - a.taskCounts.inProgress,
    );
  },
};