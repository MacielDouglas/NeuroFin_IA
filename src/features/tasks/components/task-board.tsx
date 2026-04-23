"use client"

import { BOARD_COLUMNS, TASK_STATUS_LABELS } from "@/lib/utils/task";
import type { TaskWithRelations } from "@/types/task";
import type { TaskStatus } from "@/generated/prisma/client";
import { TaskColumn } from "./task-column";

type TaskBoardProps = {
  tasks: TaskWithRelations[];
  projectId: string;
};

export function TaskBoard({ tasks, projectId }: TaskBoardProps) {
  const byStatus = (status: TaskStatus) =>
    tasks.filter((t) => t.status === status);

  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-x-auto sm:grid-cols-2 lg:grid-cols-4">
      {BOARD_COLUMNS.map((status) => (
        <TaskColumn
          key={status}
          status={status}
          label={TASK_STATUS_LABELS[status]}
          tasks={byStatus(status)}
          projectId={projectId}
        />
      ))}
    </div>
  );
}