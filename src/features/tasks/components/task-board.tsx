"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import { TaskColumn } from "./task-column";
import { TaskCard } from "./task-card";
import { BOARD_COLUMNS, TASK_STATUS_LABELS } from "@/lib/utils/task";
import { updateTaskAction } from "@/server/actions/task.actions";
import type { TaskWithRelations } from "@/types/task";
import type { TaskStatus } from "@/generated/prisma/client";
import { notify } from "@/lib/utils/toast";

type TaskBoardProps = {
  tasks: TaskWithRelations[];
  projectId: string;
};

export function TaskBoard({ tasks, projectId }: TaskBoardProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeTask, setActiveTask] = useState<TaskWithRelations | null>(null);
  // optimistic local state
  const [localTasks, setLocalTasks] = useState(tasks);

  // Sincroniza quando o servidor revalida
  if (tasks !== localTasks && !isPending) {
    setLocalTasks(tasks);
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

function handleDragStart(event: DragStartEvent) {
  const task = localTasks.find((t) => t.id === String(event.active.id));
  if (task) setActiveTask(task);
}

function handleDragEnd(event: DragEndEvent) {
  const { active, over } = event;
  setActiveTask(null);
  if (!over) return;

  const taskId = String(active.id);
  const newStatus = String(over.id) as TaskStatus;
  const task = localTasks.find((t) => t.id === taskId);
  if (!task || task.status === newStatus) return;

  const previousStatus = task.status;
  setLocalTasks((prev) =>
    prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
  );

  startTransition(async () => {
    const result = await updateTaskAction(taskId, { status: newStatus });
    if (!result.success) {
      // Reverter otimista em caso de erro
      setLocalTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: previousStatus } : t)),
      );
      notify.error("Erro ao mover tarefa");
      return;
    }
    notify.success(`Movido para ${TASK_STATUS_LABELS[newStatus]}`);
    router.refresh();
  });
}
  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {BOARD_COLUMNS.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            label={TASK_STATUS_LABELS[status]}
            tasks={localTasks.filter((t) => t.status === status)}
            projectId={projectId}
          />
        ))}
      </div>

      {/* Card fantasma durante o drag */}
      <DragOverlay>
        {activeTask ? (
          <div className="opacity-90 rotate-1 scale-105">
            <TaskCard task={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}