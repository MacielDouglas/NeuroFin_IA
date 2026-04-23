import type { TaskPriority, TaskStatus } from "@/generated/prisma/client";

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  BACKLOG: "Backlog",
  TODO: "A fazer",
  IN_PROGRESS: "Em andamento",
  IN_REVIEW: "Em revisão",
  DONE: "Concluído",
  CANCELLED: "Cancelado",
};

export const TASK_PRIORITY_LABELS: Record<TaskPriority, string> = {
  LOW: "Baixa",
  MEDIUM: "Média",
  HIGH: "Alta",
  URGENT: "Urgente",
};

export const TASK_PRIORITY_COLORS: Record<TaskPriority, string> = {
  LOW: "text-muted-foreground",
  MEDIUM: "text-blue-500",
  HIGH: "text-orange-500",
  URGENT: "text-destructive",
};

export const BOARD_COLUMNS: TaskStatus[] = [
  "TODO",
  "IN_PROGRESS",
  "IN_REVIEW",
  "DONE",
];

export function isOverdue(dueDate: Date | null): boolean {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
}

export function formatDueDate(dueDate: Date | null): string {
  if (!dueDate) return "";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
  }).format(new Date(dueDate));
}