"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { TaskCard } from "./task-card";
import { CreateTaskInline } from "./create-task-inline";
import { cn } from "@/lib/utils/cn";
import type { TaskWithRelations } from "@/types/task";
import type { TaskStatus } from "@/generated/prisma/client";

type TaskColumnProps = {
  status: TaskStatus;
  label: string;
  tasks: TaskWithRelations[];
  projectId: string;
};

export function TaskColumn({ status, label, tasks, projectId }: TaskColumnProps) {
  const [creating, setCreating] = useState(false);
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div className="flex flex-col gap-2">
      {/* Header da coluna */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold">{label}</span>
          <span className="text-[11px] font-medium text-muted-foreground bg-secondary px-1.5 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
        {status === "TODO" || status === "BACKLOG" ? (
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="size-6 flex items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            aria-label="Criar tarefa"
          >
            <Plus size={14} />
          </button>
        ) : null}
      </div>

      {/* Drop zone */}
      <div
        ref={setNodeRef}
        className={cn(
          "flex flex-col gap-2 min-h-30 rounded-xl p-2 transition-colors",
          isOver
            ? "bg-primary/5 ring-2 ring-primary/20"
            : "bg-secondary/40",
        )}
      >
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.length === 0 && !creating ? (
            <div className="flex flex-1 items-center justify-center py-8">
              <p className="text-[12px] text-muted-foreground">Nenhuma tarefa</p>
            </div>
          ) : (
            tasks.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </SortableContext>

        {creating && (
          <CreateTaskInline
            projectId={projectId}
            status={status}
            onClose={() => setCreating(false)}
          />
        )}
      </div>
    </div>
  );
}