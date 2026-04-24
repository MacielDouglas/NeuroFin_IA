"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Loader2,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils/cn";
import { generateSubtasksAction } from "@/server/actions/ai.actions";
import { createSubtasksBatchAction } from "@/server/actions/task.actions";

type GeneratedSubtask = {
  title: string;
  description?: string;
  estimatedHours?: number;
  priority?: string;
};

type AiSubtaskGeneratorProps = {
  taskId: string;
  taskTitle: string;
  taskDescription?: string;
  projectContext?: string;
  hasExistingSubtasks: boolean;
};

export function AiSubtaskGenerator({
  taskId,
  taskTitle,
  taskDescription,
  projectContext,
  hasExistingSubtasks,
}: AiSubtaskGeneratorProps) {
  const router = useRouter();
  const [isGenerating, startGenerate] = useTransition();
  const [isSaving, startSave] = useTransition();
  const [suggestions, setSuggestions] = useState<GeneratedSubtask[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [reasoning, setReasoning] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(true);

  const hasResult = suggestions.length > 0;

  function handleGenerate() {
    setError(null);
    setSuggestions([]);
    setSelected(new Set());

    startGenerate(async () => {
      const result = await generateSubtasksAction(
        taskId,
        taskTitle,
        taskDescription,
        projectContext,
      );

      if (!result.success) {
        setError(result.error);
        return;
      }

      const subtasks: GeneratedSubtask[] = result.data.subtasks;
      setSuggestions(subtasks);
      setReasoning(result.data.reasoning ?? "");
      // Selecionar todas por padrão
      setSelected(new Set(subtasks.map((_, i) => i)));
      setExpanded(true);
    });
  }

  function toggleSelect(index: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  function handleSelectAll() {
    if (selected.size === suggestions.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(suggestions.map((_, i) => i)));
    }
  }

  function handleSave() {
    const toSave = suggestions.filter((_, i) => selected.has(i));
    if (toSave.length === 0) return;

    startSave(async () => {
      const result = await createSubtasksBatchAction(taskId, toSave);
      if (!result.success) {
        setError(result.error);
        return;
      }
      setSuggestions([]);
      setSelected(new Set());
      setReasoning("");
      router.refresh();
    });
  }

  function handleDiscard() {
    setSuggestions([]);
    setSelected(new Set());
    setReasoning("");
    setError(null);
  }

  const priorityColors: Record<string, string> = {
    LOW:    "text-muted-foreground",
    MEDIUM: "text-blue-500",
    HIGH:   "text-orange-500",
    URGENT: "text-destructive",
  };

  const priorityLabels: Record<string, string> = {
    LOW:    "Baixa",
    MEDIUM: "Média",
    HIGH:   "Alta",
    URGENT: "Urgente",
  };

  return (
    <div className="rounded-xl border border-dashed border-primary/30 bg-primary/5 overflow-hidden">
{/* Header */}
<div className="flex items-center justify-between px-3 py-2.5 gap-2">
  <div className="flex flex-col gap-0.5 min-w-0">
    <div className="flex items-center gap-1.5">
      <Sparkles size={14} className="text-primary shrink-0" />
      <span className="text-[12px] font-semibold text-primary truncate">
        Gerar subtarefas com IA
      </span>
    </div>
    {/* Badge movido para linha própria */}
    {hasExistingSubtasks && (
      <span className="text-[10px] text-muted-foreground ml-5">
        Vai adicionar às subtarefas existentes
      </span>
    )}
  </div>

  {!hasResult && (
    <Button
      size="sm"
      variant="default"
      className="h-7 text-[11px] gap-1.5 shrink-0"
      onClick={handleGenerate}
      disabled={isGenerating}
    >
      {isGenerating ? (
        <>
          <Loader2 size={11} className="animate-spin" />
          Gerando...
        </>
      ) : (
        <>
          <Sparkles size={11} />
          Gerar
        </>
      )}
    </Button>
  )}

  {hasResult && (
    <Button
      type="button"
      onClick={() => setExpanded((v) => !v)}
      className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
      aria-label={expanded ? "Recolher" : "Expandir"}
    >
      {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
    </Button>
  )}
</div>

      {/* Erro */}
      {error && (
        <div className="mx-3 mb-3 flex items-start gap-2 rounded-lg bg-destructive/10 px-3 py-2">
          <AlertCircle size={13} className="text-destructive mt-0.5 shrink-0" />
          <p className="text-[12px] text-destructive">{error}</p>
        </div>
      )}

      {/* Resultados */}
      {hasResult && expanded && (
        <>
          <Separator />
          <div className="p-3 space-y-2">
            {/* Raciocínio da IA */}
            {reasoning && (
              <p className="text-[11px] text-muted-foreground italic px-1 mb-3">
                💡 {reasoning}
              </p>
            )}

            {/* Controles de seleção */}
            <div className="flex items-center justify-between mb-2">
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-[11px] text-primary hover:underline"
              >
                {selected.size === suggestions.length
                  ? "Desmarcar todas"
                  : "Selecionar todas"}
              </button>
              <span className="text-[11px] text-muted-foreground">
                {selected.size} de {suggestions.length} selecionadas
              </span>
            </div>

            {/* Lista de sugestões */}
            <div className="space-y-1.5">
              {suggestions.map((subtask, index) => {
                const isSelected = selected.has(index);
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => toggleSelect(index)}
                    className={cn(
                      "w-full text-left rounded-lg border px-3 py-2 transition-all",
                      isSelected
                        ? "border-primary/30 bg-primary/5"
                        : "border-border bg-card opacity-50",
                    )}
                  >
                    <div className="flex items-start gap-2.5">
                      {/* Checkbox visual */}
                      <span
                        className={cn(
                          "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded border transition-colors",
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border",
                        )}
                        aria-hidden="true"
                      >
                        {isSelected && <Check size={10} strokeWidth={3} />}
                      </span>

                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-medium leading-snug">
                          {subtask.title}
                        </p>
                        {subtask.description && (
                          <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">
                            {subtask.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          {subtask.priority && (
                            <span
                              className={cn(
                                "text-[10px] font-medium",
                                priorityColors[subtask.priority] ?? "text-muted-foreground",
                              )}
                            >
                              {priorityLabels[subtask.priority] ?? subtask.priority}
                            </span>
                          )}
                          {subtask.estimatedHours && (
                            <span className="text-[10px] text-muted-foreground">
                              ~{subtask.estimatedHours}h
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Ações finais */}
            <div className="flex items-center gap-2 pt-2">
              <Button
                size="sm"
                className="h-7 text-[11px] gap-1.5 flex-1"
                onClick={handleSave}
                disabled={selected.size === 0 || isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 size={11} className="animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Check size={11} />
                    Adicionar {selected.size} subtarefa
                    {selected.size !== 1 ? "s" : ""}
                  </>
                )}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 text-[11px]"
                onClick={handleDiscard}
                disabled={isSaving}
              >
                <X size={11} className="mr-1" />
                Descartar
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 text-[11px] text-primary"
                onClick={handleGenerate}
                disabled={isGenerating || isSaving}
              >
                {isGenerating ? (
                  <Loader2 size={11} className="animate-spin" />
                ) : (
                  <Sparkles size={11} className="mr-1" />
                )}
                Regerar
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}