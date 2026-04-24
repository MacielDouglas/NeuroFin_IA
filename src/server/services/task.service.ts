import { ForbiddenError, NotFoundError } from "@/lib/errors/app-error";
import { projectRepository } from "@/server/repositories/project.repository";
import { taskRepository } from "@/server/repositories/task.repository";
import type { CreateSubtaskInput, TaskWithRelations, UpdateTaskInput } from "@/types/task";

import prisma from "@/lib/prisma/client";


export const taskService = {

async listByProject(projectId: string, userId: string): Promise<TaskWithRelations[]> {
  const member = await prisma.projectMember.findFirst({
    where: { projectId, userId },
  });

  if (!member) throw new ForbiddenError();

  return prisma.task.findMany({
    where: { projectId },
    include: {
      assignee: {
        select: { id: true, name: true, image: true },
      },
      createdBy: {
        select: { id: true, name: true, image: true },
      },
      subtasks: {
        orderBy: { createdAt: "asc" },
      },
      _count: {
        select: {
          subtasks: true,
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });
},

async create(
  data: { title: string; projectId: string; description?: string },
  userId: string,
) {
  const member = await prisma.projectMember.findFirst({
    where: { projectId: data.projectId, userId },
  });

  if (!member) throw new ForbiddenError();

  return prisma.task.create({
    data: {
      title:       data.title,
      description: data.description,
      projectId:   data.projectId,
      status:      "TODO",
      priority:    "MEDIUM",
      createdById: userId,
    },
  });
},

  async update(id: string, data: UpdateTaskInput, userId: string) {
    const task = await taskRepository.findById(id);
    if (!task) throw new NotFoundError("Tarefa");

    const member = await projectRepository.isMember(task.projectId, userId);
    if (!member) throw new ForbiddenError();
    if (member.role === "VIEWER") throw new ForbiddenError();

    return taskRepository.update(id, data, userId);
  },

  async createSubtask(data: CreateSubtaskInput, userId: string) {
    const task = await taskRepository.findById(data.taskId);
    if (!task) throw new NotFoundError("Tarefa");

    const member = await projectRepository.isMember(task.projectId, userId);
    if (!member) throw new ForbiddenError();

    return taskRepository.createSubtask(data);
  },

 async toggleSubtask(subtaskId: string, _userId: string) {
    return taskRepository.toggleSubtask(subtaskId);
  },
};