"use client";

import { useState } from "react";
import { Calendar, CheckSquare,  } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  TASK_PRIORITY_COLORS,
  TASK_PRIORITY_LABELS,
  formatDueDate,
  isOverdue,
} from "@/lib/utils/task";
import { cn } from "@/lib/utils/cn";
import { TaskDetail } from "./task-detail";
import type { TaskWithRelations } from "@/types/task";

type TaskCardProps = {
  task: TaskWithRelations;
};

export function TaskCard({ task }: TaskCardProps) {
  const [open, setOpen] = useState(false);
  const overdueFlag = isOverdue(task.dueDate);
  const completedSubtasks = task.subtasks.filter((s) => s.completed).length;
  const hasSubtasks = task.subtasks.length > 0;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full text-left"
        aria-label={`Abrir tarefa: ${task.title}`}
      >
        <Card className="cursor-pointer transition-shadow duration-150 hover:shadow-md">
          <CardContent className="space-y-2.5 p-3">
            {/* Prioridade + título */}
            <div className="space-y-1">
              <span
                className={cn(
                  "text-[11px] font-medium uppercase tracking-wide",
                  TASK_PRIORITY_COLORS[task.priority],
                )}
              >
                {TASK_PRIORITY_LABELS[task.priority]}
              </span>
              <p className="line-clamp-2 text-[13px] font-medium leading-snug">
                {task.title}
              </p>
            </div>

            {/* Metadados */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {hasSubtasks && (
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <CheckSquare size={11} aria-hidden="true" />
                    {completedSubtasks}/{task.subtasks.length}
                  </span>
                )}
                {task.dueDate && (
                  <span
                    className={cn(
                      "flex items-center gap-1 text-[11px]",
                      overdueFlag ? "text-destructive" : "text-muted-foreground",
                    )}
                  >
                    <Calendar size={11} aria-hidden="true" />
                    {formatDueDate(task.dueDate)}
                  </span>
                )}
              </div>

              {task.assignee && (
                <span
                  className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground"
                  title={task.assignee.name ?? undefined}
                  aria-label={`Atribuído a ${task.assignee.name}`}
                >
                  {task.assignee.name?.[0]?.toUpperCase()}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </button>

      {open && (
        <TaskDetail task={task} onClose={() => setOpen(false)} />
      )}
    </>
  );
}