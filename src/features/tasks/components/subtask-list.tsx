"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";
import { createSubtaskAction, toggleSubtaskAction } from "@/server/actions/task.actions";
import type { Subtask } from "@/generated/prisma/client";

type SubtaskListProps = {
  subtasks: Subtask[];
  taskId: string;
};

export function SubtaskList({ subtasks, taskId }: SubtaskListProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [adding, setAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  function handleToggle(subtaskId: string) {
    startTransition(async () => {
      await toggleSubtaskAction(subtaskId);
      router.refresh();
    });
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const result = await createSubtaskAction({ title: newTitle, taskId });
    if (result.success) {
      setNewTitle("");
      setAdding(false);
      startTransition(() => router.refresh());
    }
  }

  return (
    <div className="space-y-1.5">
      {subtasks.map((subtask) => (
        <button
          key={subtask.id}
          type="button"
          onClick={() => handleToggle(subtask.id)}
          disabled={isPending}
          className="flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left text-[13px] transition-colors hover:bg-secondary disabled:opacity-60"
        >
          <span
            className={cn(
              "flex size-4 shrink-0 items-center justify-center rounded border transition-colors",
              subtask.completed
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border",
            )}
            aria-hidden="true"
          >
            {subtask.completed && <Check size={10} strokeWidth={3} />}
          </span>
          <span className={cn(subtask.completed && "text-muted-foreground line-through")}>
            {subtask.title}
          </span>
        </button>
      ))}

      {adding ? (
        <form onSubmit={handleAdd} className="flex gap-2 pt-1">
          <Input
            autoFocus
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Título da subtarefa..."
            className="h-8 text-[13px]"
            disabled={isPending}
          />
          <Button type="submit" size="sm" className="h-8" loading={isPending}>
            Salvar
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8"
            onClick={() => setAdding(false)}
          >
            Cancelar
          </Button>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[12px] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Plus size={13} aria-hidden="true" />
          Adicionar subtarefa
        </button>
      )}
    </div>
  );
}