import prisma from "@/lib/prisma/client";
import type { CreateProjectInput, UpdateProjectInput } from "@/types/project";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .concat("-", Math.random().toString(36).slice(2, 7));
}

export const projectRepository = {
  async findById(id: string) {
    return prisma.project.findUnique({
      where: { id },
      include: {
        owner: { select: { id: true, name: true, image: true } },
        _count: { select: { tasks: true, members: true } },
      },
    });
  },

  async findByUserId(userId: string) {
    return prisma.project.findMany({
      where: {
        OR: [
          { ownerId: userId },
          { members: { some: { userId } } },
        ],
        status: { not: "ARCHIVED" },
      },
      include: {
        owner: { select: { id: true, name: true, image: true } },
        _count: { select: { tasks: true, members: true } },
      },
      orderBy: { updatedAt: "desc" },
    });
  },

  async create(data: CreateProjectInput, ownerId: string) {
    const slug = generateSlug(data.name);

    return prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        slug,
        ownerId,
        members: {
          create: { userId: ownerId, role: "OWNER" },
        },
      },
      include: {
        owner: { select: { id: true, name: true, image: true } },
        _count: { select: { tasks: true, members: true } },
      },
    });
  },

  async update(id: string, data: UpdateProjectInput) {
    return prisma.project.update({
      where: { id },
      data,
      include: {
        owner: { select: { id: true, name: true, image: true } },
        _count: { select: { tasks: true, members: true } },
      },
    });
  },

  async archive(id: string) {
    return prisma.project.update({
      where: { id },
      data: { status: "ARCHIVED" },
    });
  },

  async isMember(projectId: string, userId: string) {
    const member = await prisma.projectMember.findUnique({
      where: { projectId_userId: { projectId, userId } },
      select: { role: true },
    });
    return member ?? null;
  },
};