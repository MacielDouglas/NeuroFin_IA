"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Clock,
  Sparkles,
  Loader2,
  Check,
  X,
  AlertTriangle,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils/cn";
import { estimateDeadlineAction } from "@/server/actions/ai.actions";
import { updateTaskAction } from "@/server/actions/task.actions";
import type { TaskPriority } from "@/generated/prisma/client";

type AiDeadlineEstimatorProps = {
  taskId: string;
  taskTitle: string;
  taskDescription?: string;
  subtasksCount: number;
  priority: TaskPriority;
  assigneeName?: string;
  currentDueDate?: Date | null;
};

type DeadlineResult = {
  estimatedDays: number;
  confidence: "LOW" | "MEDIUM" | "HIGH";
  reasoning: string;
  risks: string[];
  suggestedDate: string;
};

const confidenceConfig = {
  LOW: {
    label: "Baixa confiança",
    color: "text-destructive",
    bg: "bg-destructive/10",
    icon: AlertTriangle,
  },
  MEDIUM: {
    label: "Média confiança",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    icon: TrendingUp,
  },
  HIGH: {
    label: "Alta confiança",
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-950/30",
    icon: Check,
  },
};

function formatDateBR(dateStr: string) {
  const [year, month, day] = dateStr.split("-");
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(Number(year), Number(month) - 1, Number(day)));
}

export function AiDeadlineEstimator({
  taskId,
  taskTitle,
  taskDescription,
  subtasksCount,
  priority,
  assigneeName,
  currentDueDate,
}: AiDeadlineEstimatorProps) {
  const router = useRouter();
  const [isEstimating, startEstimate] = useTransition();
  const [isSaving, startSave] = useTransition();
  const [result, setResult] = useState<DeadlineResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function handleEstimate() {
    setError(null);
    setResult(null);
    setSaved(false);

    startEstimate(async () => {
      const res = await estimateDeadlineAction(taskId, {
        taskTitle,
        taskDescription,
        subtasksCount,
        priority,
        teamSize: 1,
        assigneeName,
      });

      if (!res.success) {
        setError(res.error);
        return;
      }

      setResult(res.data);
    });
  }

  function handleApply() {
    if (!result) return;

    startSave(async () => {
      const [year, month, day] = result.suggestedDate.split("-").map(Number);
      const dueDate = new Date(year, month - 1, day);

      const res = await updateTaskAction(taskId, { dueDate });
      if (!res.success) {
        setError(res.error);
        return;
      }

      setSaved(true);
      router.refresh();
    });
  }

  function handleDiscard() {
    setResult(null);
    setError(null);
    setSaved(false);
  }

  return (
    <div className="rounded-xl border border-dashed border-amber-400/40 bg-amber-50/50 dark:bg-amber-950/10 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-amber-600 dark:text-amber-400" />
          <span className="text-[12px] font-semibold text-amber-700 dark:text-amber-300">
            Estimar prazo com IA
          </span>
          {currentDueDate && (
            <span className="text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded-full">
              Prazo atual:{" "}
              {new Intl.DateTimeFormat("pt-BR", {
                day: "2-digit",
                month: "short",
              }).format(new Date(currentDueDate))}
            </span>
          )}
        </div>

        {!result && (
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-[11px] gap-1.5 border-amber-300 text-amber-700 hover:bg-amber-100 dark:text-amber-300 dark:border-amber-700 dark:hover:bg-amber-950"
            onClick={handleEstimate}
            disabled={isEstimating}
          >
            {isEstimating ? (
              <>
                <Loader2 size={11} className="animate-spin" />
                Estimando...
              </>
            ) : (
              <>
                <Sparkles size={11} />
                Estimar
              </>
            )}
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

      {/* Resultado */}
      {result && (
        <>
          <Separator />
          <div className="p-3 space-y-3">
            {/* Data sugerida — destaque principal */}
            <div className="rounded-lg bg-background border border-border p-3 text-center">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">
                Prazo sugerido
              </p>
              <p className="text-lg font-bold">
                {formatDateBR(result.suggestedDate)}
              </p>
              <p className="text-[12px] text-muted-foreground mt-0.5">
                ~{result.estimatedDays} dia{result.estimatedDays !== 1 ? "s" : ""} de trabalho
              </p>
            </div>

            {/* Confiança */}
            {(() => {
              const cfg = confidenceConfig[result.confidence];
              const Icon = cfg.icon;
              return (
                <div
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2",
                    cfg.bg,
                  )}
                >
                  <Icon size={13} className={cfg.color} />
                  <span className={cn("text-[12px] font-medium", cfg.color)}>
                    {cfg.label}
                  </span>
                </div>
              );
            })()}

            {/* Raciocínio */}
            <p className="text-[11px] text-muted-foreground leading-relaxed italic px-1">
              💡 {result.reasoning}
            </p>

            {/* Riscos */}
            {result.risks.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 px-1">
                  Riscos identificados
                </p>
                <div className="space-y-1">
                  {result.risks.map((risk, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-[11px] text-muted-foreground px-1"
                    >
                      <AlertTriangle
                        size={11}
                        className="text-amber-500 mt-0.5 shrink-0"
                      />
                      {risk}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ações */}
            {saved ? (
              <div className="flex items-center gap-2 rounded-lg bg-green-50 dark:bg-green-950/30 px-3 py-2">
                <Check size={13} className="text-green-600 dark:text-green-400" />
                <span className="text-[12px] text-green-700 dark:text-green-300 font-medium">
                  Prazo aplicado com sucesso!
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 pt-1">
                <Button
                  size="sm"
                  className="h-7 text-[11px] gap-1.5 flex-1"
                  onClick={handleApply}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 size={11} className="animate-spin" />
                      Aplicando...
                    </>
                  ) : (
                    <>
                      <Check size={11} />
                      Aplicar prazo
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
                  className="h-7 text-[11px] text-amber-600 dark:text-amber-400"
                  onClick={handleEstimate}
                  disabled={isEstimating || isSaving}
                >
                  {isEstimating ? (
                    <Loader2 size={11} className="animate-spin" />
                  ) : (
                    <Sparkles size={11} className="mr-1" />
                  )}
                  Reestimar
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}