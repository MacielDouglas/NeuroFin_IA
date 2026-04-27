"use client";

import { useState } from "react";
import { Calendar,  } from "lucide-react";
import { TaskDetailModal } from "./task-detail-modal";
import {  TASK_PRIORITY_LABELS, isOverdue, formatDueDate } from "@/lib/utils/task";
import { cn } from "@/lib/utils/cn";
import type { TaskWithRelations } from "@/types/task";

type TaskCardProps = {
  task: TaskWithRelations;
};

export function TaskCard({ task }: TaskCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const overdue = isOverdue(task.dueDate);
  const completedSubtasks = task.subtasks.filter((s) => s.completed).length;
  const totalSubtasks = task.subtasks.length;

  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="group w-full text-left rounded-xl border border-border bg-card p-3.5 shadow-sm transition-all hover:shadow-md hover:border-border/80 active:scale-[0.99]"
      >
        {/* Prioridade */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <p className="text-[13px] font-medium leading-snug">{task.title}</p>
          <span className="text-[11px] font-semibold uppercase tracking-wide shrink-0 mt-0.5 dark:text-blue-400 text-blue-700">

            {TASK_PRIORITY_LABELS[task.priority]}
          </span>
        </div>

        {/* Descrição */}
        {task.description && (
          <p className="text-[12px] text-muted-foreground line-clamp-2 mb-2">
            {task.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 mt-2">
          <div className="flex items-center gap-2">
            {/* Subtarefas */}
            {totalSubtasks > 0 && (
              <span className="text-[11px] text-muted-foreground">
                {completedSubtasks}/{totalSubtasks} subtarefas
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Prazo */}
            {task.dueDate && (
              <span
                className={cn(
                  "flex items-center gap-1 text-[11px]",
                  overdue ? "text-destructive" : "text-muted-foreground",
                )}
              >
                <Calendar size={10} />
                {formatDueDate(task.dueDate)}
              </span>
            )}

            {/* Responsável */}
            {task.assignee && (
              <div
                className="size-5 rounded-full bg-primary/10 flex items-center justify-center text-[9px] font-bold text-primary"
                title={task.assignee.name ?? ""}
              >
                {task.assignee.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </button>

      <TaskDetailModal
        task={task}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}