import type { Project, Subtask, Task, TaskPriority, TaskStatus, User } from "@/generated/prisma/client";

export type { TaskStatus, TaskPriority };

export type TaskWithRelations = Task & {
  assignee: Pick<User, "id" | "name" | "image"> | null;
  createdBy: Pick<User, "id" | "name">;
  subtasks: Subtask[];
};

export type CreateTaskInput = {
  title: string;
  description?: string;
  priority?: TaskPriority;
  dueDate?: Date;
  assigneeId?: string;
  projectId: string;
};

export type UpdateTaskInput = {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: Date | null;
  assigneeId?: string | null;
};

export type CreateSubtaskInput = {
  title: string;
  taskId: string;
};

export type TaskWithProject = TaskWithRelations & {
  project: Pick<Project, "id" | "name">;
};