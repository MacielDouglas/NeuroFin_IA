"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createTaskAction } from "@/server/actions/task.actions";

type CreateTaskInlineProps = {
  projectId: string;
  status: string;
  onClose: () => void;
};

export function CreateTaskInline({ projectId, onClose }: CreateTaskInlineProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const title = inputRef.current?.value.trim();
    if (!title) return;

    setError(null);

    const formData = new FormData();
    formData.set("title", title);
    formData.set("projectId", projectId);

    const result = await createTaskAction(formData);

    if (!result.success) {
      setError(result.error);
      return;
    }

    // startTransition garante que o refresh complete antes de fechar
    startTransition(() => {
      router.refresh();
      onClose();
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-2 rounded-xl border border-border bg-card p-3"
    >
      <input
        ref={inputRef}
        autoFocus
        placeholder="Título da tarefa..."
        className="w-full bg-transparent text-[13px] font-medium placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
        disabled={isPending}
      />
      {error ? (
        <p className="text-[11px] text-destructive">{error}</p>
      ) : null}
      <div className="flex gap-2">
        <Button
          type="submit"
          size="sm"
          loading={isPending}
          className="h-7 text-[12px]"
        >
          Salvar
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 text-[12px]"
          onClick={onClose}
          disabled={isPending}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}