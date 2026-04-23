"use client"

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TaskWithRelations } from "@/types/task";
import type { TaskStatus } from "@/generated/prisma/client";
import { useState } from "react";
import { TaskCard } from "./task-card";
import { CreateTaskInline } from "./create-task-inline";

type TaskColumnProps = {
  status: TaskStatus;
  label: string;
  tasks: TaskWithRelations[];
  projectId: string;
};

export function TaskColumn({ status, label, tasks, projectId }: TaskColumnProps) {
  const [creating, setCreating] = useState(false);

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-secondary/50 p-3">
      {/* Header da coluna */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold">{label}</span>
          <span className="flex size-5 items-center justify-center rounded-full bg-muted text-[11px] font-medium text-muted-foreground">
            {tasks.length}
          </span>
        </div>
        {status === "TODO" && (
          <Button
            variant="ghost"
            size="icon"
            className="size-7"
            aria-label="Adicionar tarefa"
            onClick={() => setCreating(true)}
          >
            <Plus size={14} aria-hidden="true" />
          </Button>
        )}
      </div>

      {/* Tarefas */}
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}

        {creating && (
          <CreateTaskInline
            projectId={projectId}
            status={status}
            onClose={() => setCreating(false)}
          />
        )}

        {tasks.length === 0 && !creating && (
          <div className="rounded-xl border border-dashed border-border py-8 text-center text-[12px] text-muted-foreground">
            Nenhuma tarefa
          </div>
        )}
      </div>
    </div>
  );
}