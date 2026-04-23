import { ForbiddenError, NotFoundError } from "@/lib/errors/app-error";
import prisma from "@/lib/prisma/client";
import { projectRepository } from "@/server/repositories/project.repository";
import type { CreateProjectInput, UpdateProjectInput } from "@/types/project";

export const projectService = {
  async getById(id: string, userId: string) {
    const project = await projectRepository.findById(id);

    if (!project) throw new NotFoundError("Projeto");

    const member = await projectRepository.isMember(id, userId);
    if (!member) throw new ForbiddenError();

    return project;
  },

async listByUser(userId: string) {
  const projects = await prisma.project.findMany({
    where: {
      members: { some: { userId } },
    },
    include: {
      owner: { select: { id: true, name: true, image: true } },
      _count: {
        select: { tasks: true, members: true },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  // Busca counts de tarefas concluídas para todos os projetos de uma vez
  const completedCounts = await prisma.task.groupBy({
    by: ["projectId"],
    where: {
      projectId: { in: projects.map((p) => p.id) },
      status: "DONE",
    },
    _count: { _all: true },
  });

  const completedMap = new Map(
    completedCounts.map((c) => [c.projectId, c._count._all]),
  );

  return projects.map((p) => ({
    ...p,
    _count: {
      ...p._count,
      completedTasks: completedMap.get(p.id) ?? 0,
    },
  }));
},

  async create(data: CreateProjectInput, userId: string) {
    return projectRepository.create(data, userId);
  },

  async update(id: string, data: UpdateProjectInput, userId: string) {
    const member = await projectRepository.isMember(id, userId);

    if (!member) throw new ForbiddenError();
    if (member.role === "VIEWER") throw new ForbiddenError();

    return projectRepository.update(id, data);
  },

  async archive(id: string, userId: string) {
    const project = await projectRepository.findById(id);
    if (!project) throw new NotFoundError("Projeto");
    if (project.ownerId !== userId) throw new ForbiddenError();

    return projectRepository.archive(id);
  },
};