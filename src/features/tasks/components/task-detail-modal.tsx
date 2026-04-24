"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Calendar,   Loader2,  } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { SubtaskList } from "./subtask-list";
import { updateTaskAction } from "@/server/actions/task.actions";
import {
  TASK_STATUS_LABELS,
  TASK_PRIORITY_LABELS,
  TASK_PRIORITY_COLORS,
} from "@/lib/utils/task";
import { cn } from "@/lib/utils/cn";
import type { TaskWithRelations } from "@/types/task";
import type { TaskStatus, TaskPriority } from "@/generated/prisma/client";
import { AiSubtaskGenerator } from "./ai-substask-generator";
import { AiDeadlineEstimator } from "./ai-deadline-estimator";
import { notify } from "@/lib/utils/toast";

type TaskDetailModalProps = {
  task: TaskWithRelations;
  open: boolean;
  onClose: () => void;
};

export function TaskDetailModal({ task, open, onClose }: TaskDetailModalProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [description, setDescription] = useState(task.description ?? "");
  const [editingDesc, setEditingDesc] = useState(false);

 function handleStatusChange(status: TaskStatus) {
  startTransition(async () => {
    const result = await updateTaskAction(task.id, { status });
    if (!result.success) {
      notify.error("Erro ao atualizar status");
      return;
    }
    notify.success("Status atualizado");
    router.refresh();
  });
}

function handlePriorityChange(priority: TaskPriority) {
  startTransition(async () => {
    const result = await updateTaskAction(task.id, { priority });
    if (!result.success) {
      notify.error("Erro ao atualizar prioridade");
      return;
    }
    notify.success("Prioridade atualizada");
    router.refresh();
  });
}

async function handleDescriptionSave() {
  const result = await updateTaskAction(task.id, { description });
  if (!result.success) {
    notify.error("Erro ao salvar descrição");
    return;
  }
  notify.success("Descrição salva");
  setEditingDesc(false);
  startTransition(() => router.refresh());
}

  const statusColors: Record<TaskStatus, string> = {
    BACKLOG:     "bg-secondary text-secondary-foreground",
    TODO:        "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    IN_PROGRESS: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    IN_REVIEW:   "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
    DONE:        "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
    CANCELLED:   "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
<DialogContent
  className="max-w-2xl w-full max-h-[90vh] min-h-125 overflow-y-auto"
  aria-describedby={undefined}
>
        <DialogHeader>
          <div className="flex items-start gap-3 pr-8">
            <div className="flex-1">
              <DialogTitle className="text-lg font-semibold leading-snug">
                {task.title}
              </DialogTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Criado por {task.createdBy.name}
              </p>
            </div>
            {isPending && (
              <Loader2 size={16} className="animate-spin text-muted-foreground mt-1 shrink-0" />
            )}
          </div>
        </DialogHeader>

      <div className="grid grid-cols-[1fr_200px] gap-6 mt-2 min-w-0">
          {/* Coluna principal */}
         <div className="space-y-4 min-w-0 overflow-hidden">
            {/* Descrição */}
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                Descrição
              </p>
              {editingDesc ? (
                <div className="space-y-4">
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descreva a tarefa..."
                    className="min-h-25 text-sm resize-none"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <Button size="sm" className="h-7 text-xs" onClick={handleDescriptionSave}>
                      Salvar
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 text-xs"
                      onClick={() => {
                        setDescription(task.description ?? "");
                        setEditingDesc(false);
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setEditingDesc(true)}
                  className={cn(
                    "w-full text-left text-sm rounded-lg px-3 py-2.5 transition-colors",
                    "hover:bg-secondary min-h-15",
                    description ? "text-foreground" : "text-muted-foreground italic",
                  )}
                >
                  {description || "Clique para adicionar uma descrição..."}
                </button>
              )}
            </div>

            <Separator />

            {/* Subtarefas */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Subtarefas ({task.subtasks.filter((s) => s.completed).length}/{task.subtasks.length})
                </p>
              </div>
              {/* <SubtaskList subtasks={task.subtasks} taskId={task.id} /> */}

              <div>
  <div className="flex items-center justify-between mb-2">
    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
      Subtarefas ({task.subtasks.filter((s) => s.completed).length}/
      {task.subtasks.length})
    </p>
  </div>

  {/* Gerador de IA — aparece sempre acima da lista */}
  <div className="mb-3">
    <AiSubtaskGenerator
      taskId={task.id}
      taskTitle={task.title}
      taskDescription={task.description ?? undefined}
      hasExistingSubtasks={task.subtasks.length > 0}
    />
  </div>

  <SubtaskList subtasks={task.subtasks} taskId={task.id} />
</div>
            </div>
          </div>

          {/* Coluna lateral */}
          <div className="space-y-4">
            {/* Status */}
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
                Status
              </p>
              <Select
                value={task.status}
                onValueChange={(v) => handleStatusChange(v as TaskStatus)}
                disabled={isPending}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(TASK_STATUS_LABELS) as TaskStatus[]).map((s) => (
                    <SelectItem key={s} value={s} className="text-xs">
                      <span className={cn("px-1.5 py-0.5 rounded-md text-xs", statusColors[s])}>
                        {TASK_STATUS_LABELS[s]}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Prioridade */}
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
                Prioridade
              </p>
              <Select
                value={task.priority}
                onValueChange={(v) => handlePriorityChange(v as TaskPriority)}
                disabled={isPending}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(TASK_PRIORITY_LABELS) as TaskPriority[]).map((p) => (
                    <SelectItem key={p} value={p} className="text-xs">
                      <span className={cn("font-medium", TASK_PRIORITY_COLORS[p])}>
                        {TASK_PRIORITY_LABELS[p]}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Responsável */}
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
                Responsável
              </p>
              {task.assignee ? (
                <div className="flex items-center gap-2 text-sm">
                  <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-semibold text-primary">
                    {task.assignee.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs">{task.assignee.name}</span>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground italic">Não atribuído</p>
              )}
            </div>

            {/* Prazo */}
            {task.dueDate && (
          <div>
  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
    Prazo
  </p>
  {task.dueDate && (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
      <Calendar size={12} />
      {new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(task.dueDate))}
    </div>
  )}
  <AiDeadlineEstimator
    taskId={task.id}
    taskTitle={task.title}
    taskDescription={task.description ?? undefined}
    subtasksCount={task.subtasks.length}
    priority={task.priority}
    assigneeName={task.assignee?.name ?? undefined}
    currentDueDate={task.dueDate}
  />
</div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}