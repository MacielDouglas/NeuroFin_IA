import { ForbiddenError, NotFoundError } from "@/lib/errors/app-error";
import { projectRepository } from "@/server/repositories/project.repository";
import { taskRepository } from "@/server/repositories/task.repository";
import type { CreateSubtaskInput, CreateTaskInput, UpdateTaskInput } from "@/types/task";
import type { TaskStatus } from "@/generated/prisma/client";

export const taskService = {
  async listByProject(
    projectId: string,
    userId: string,
    filters?: { status?: TaskStatus },
  ) {
    const member = await projectRepository.isMember(projectId, userId);
    if (!member) throw new ForbiddenError();

    return taskRepository.findByProjectId(projectId, filters);
  },

  async create(data: CreateTaskInput, userId: string) {
    const member = await projectRepository.isMember(data.projectId, userId);
    if (!member) throw new ForbiddenError();
    if (member.role === "VIEWER") throw new ForbiddenError();

    return taskRepository.create(data, userId);
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

  async toggleSubtask(subtaskId: string, userId: string) {
    return taskRepository.toggleSubtask(subtaskId);
  },
};