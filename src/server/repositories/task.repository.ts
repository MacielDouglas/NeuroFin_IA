import prisma  from "@/lib/prisma/client";
import type { TaskStatus } from "@/generated/prisma/client";
import type { CreateTaskInput, CreateSubtaskInput, UpdateTaskInput } from "@/types/task";

const taskSelect = {
  id: true,
  title: true,
  description: true,
  status: true,
  priority: true,
  dueDate: true,
  position: true,
  createdAt: true,
  updatedAt: true,
  projectId: true,
  assigneeId: true,
  createdById: true,
  assignee: { select: { id: true, name: true, image: true } },
  createdBy: { select: { id: true, name: true } },
  subtasks: { orderBy: { position: "asc" as const } },
  _count: { select: { comments: true } },
} as const;

export const taskRepository = {
  async findById(id: string) {
    return prisma.task.findUnique({
      where: { id },
      select: taskSelect,
    });
  },

  async findByProjectId(
    projectId: string,
    filters?: { status?: TaskStatus; assigneeId?: string },
  ) {
    return prisma.task.findMany({
      where: { projectId, ...filters },
      select: taskSelect,
      orderBy: [{ status: "asc" }, { position: "asc" }, { createdAt: "desc" }],
    });
  },

  async create(data: CreateTaskInput, createdById: string) {
    const lastTask = await prisma.task.findFirst({
      where: { projectId: data.projectId },
      orderBy: { position: "desc" },
      select: { position: true },
    });

    return prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        priority: data.priority ?? "MEDIUM",
        dueDate: data.dueDate,
        assigneeId: data.assigneeId,
        projectId: data.projectId,
        createdById,
        position: (lastTask?.position ?? -1) + 1,
      },
      select: taskSelect,
    });
  },

  async update(id: string, data: UpdateTaskInput, updatedById: string) {
    const current = await prisma.task.findUnique({
      where: { id },
      select: { status: true, priority: true, assigneeId: true },
    });

    const [task] = await prisma.$transaction([
      prisma.task.update({
        where: { id },
        data,
        select: taskSelect,
      }),
      // Registra histórico apenas para campos que mudaram
      ...(data.status && data.status !== current?.status
        ? [
            prisma.taskHistory.create({
              data: {
                taskId: id,
                userId: updatedById,
                field: "status",
                oldValue: current?.status,
                newValue: data.status,
              },
            }),
          ]
        : []),
    ]);

    return task;
  },

  async createSubtask(data: CreateSubtaskInput) {
    const lastSubtask = await prisma.subtask.findFirst({
      where: { taskId: data.taskId },
      orderBy: { position: "desc" },
      select: { position: true },
    });

    return prisma.subtask.create({
      data: {
        title: data.title,
        taskId: data.taskId,
        position: (lastSubtask?.position ?? -1) + 1,
      },
    });
  },

  async toggleSubtask(id: string) {
    const subtask = await prisma.subtask.findUnique({
      where: { id },
      select: { completed: true },
    });

    return prisma.subtask.update({
      where: { id },
      data: { completed: !subtask?.completed },
    });
  },
};