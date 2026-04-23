import { ForbiddenError, NotFoundError } from "@/lib/errors/app-error";
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
    return projectRepository.findByUserId(userId);
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