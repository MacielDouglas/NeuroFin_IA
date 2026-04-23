"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SubtaskList } from "./subtask-list";
import { AiSubtaskPanel } from "@/features/ai/components/ai-subtask-panel";
import {
  TASK_PRIORITY_COLORS,
  TASK_PRIORITY_LABELS,
  TASK_STATUS_LABELS,
  formatDueDate,
} from "@/lib/utils/task";
import { cn } from "@/lib/utils/cn";
import type { TaskWithRelations } from "@/types/task";


type TaskDetailProps = {
  task: TaskWithRelations;
  onClose: () => void;
};

export function TaskDetail({ task, onClose }: TaskDetailProps) {
  const [showAi, setShowAi] = useState(false);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={task.title}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-16 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-2xl rounded-2xl bg-card shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-6 pb-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">
                {TASK_STATUS_LABELS[task.status]}
              </Badge>
              <span
                className={cn(
                  "text-[12px] font-medium uppercase tracking-wide",
                  TASK_PRIORITY_COLORS[task.priority],
                )}
              >
                {TASK_PRIORITY_LABELS[task.priority]}
              </span>
              {task.dueDate && (
                <span className="text-[12px] text-muted-foreground">
                  Prazo: {formatDueDate(task.dueDate)}
                </span>
              )}
            </div>
            <h2 className="text-lg font-semibold leading-snug">{task.title}</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 shrink-0"
            onClick={onClose}
            aria-label="Fechar"
          >
            <X size={16} aria-hidden="true" />
          </Button>
        </div>

        <div className="space-y-5 px-6 pb-6">
          {/* Descrição */}
          {task.description ? (
            <p className="text-sm text-muted-foreground">{task.description}</p>
          ) : null}

          <Separator />

          {/* Subtarefas */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[13px] font-semibold">
                Subtarefas{" "}
                {task.subtasks.length > 0 && (
                  <span className="text-muted-foreground">
                    ({task.subtasks.filter((s) => s.completed).length}/{task.subtasks.length})
                  </span>
                )}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 gap-1.5 text-[12px]"
                onClick={() => setShowAi((v) => !v)}
              >
                ✦ Gerar com IA
              </Button>
            </div>

            <SubtaskList subtasks={task.subtasks} taskId={task.id} />

            {showAi && (
              <AiSubtaskPanel
                taskId={task.id}
                taskTitle={task.title}
                taskDescription={task.description ?? undefined}
                onClose={() => setShowAi(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}