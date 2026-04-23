// import type { TaskStatus } from "@/generated/prisma/client";

export function getProgressPercent(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    ACTIVE: "Ativo",
    ARCHIVED: "Arquivado",
    COMPLETED: "Concluído",
  };
  return labels[status] ?? status;
}