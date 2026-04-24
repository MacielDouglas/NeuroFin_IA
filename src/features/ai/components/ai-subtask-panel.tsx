"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent } from "@/components/ui/card";
import { generateSubtasksAction } from "@/server/actions/ai.actions";
import { createSubtaskAction } from "@/server/actions/task.actions";
import type { GenerateSubtasksOutput } from "@/server/ai/schemas/subtasks.schema";

type AiSubtaskPanelProps = {
  taskId: string;
  taskTitle: string;
  taskDescription?: string;
  onClose: () => void;
};

export function AiSubtaskPanel({
  taskId,
  taskTitle,
  taskDescription,
  onClose,
}: AiSubtaskPanelProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateSubtasksOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    setError(null);

    const response = await generateSubtasksAction(taskId, taskTitle, taskDescription);

    if (!response.success) {
      setError(response.error);
    } else {
      setResult(response.data);
    }

    setLoading(false);
  }

  async function handleSaveAll() {
    if (!result) return;
    setSaving(true);

    await Promise.all(
      result.subtasks.map((s) =>
        createSubtaskAction({ title: s.title, taskId }),
      ),
    );

    router.refresh();
    onClose();
  }

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={15} className="text-primary" aria-hidden="true" />
            <span className="text-[13px] font-semibold">Sugestão de IA</span>
          </div>
          <Button variant="ghost" size="sm" className="h-7 text-[12px]" onClick={onClose}>
            Fechar
          </Button>
        </div>

        {!result && !loading && (
          <div className="space-y-2">
            <p className="text-[12px] text-muted-foreground">
              A IA vai analisar a tarefa e sugerir subtarefas técnicas.
            </p>
            <Button size="sm" onClick={handleGenerate} className="h-8 text-[13px]">
              <Sparkles size={13} aria-hidden="true" />
              Gerar subtarefas
            </Button>
          </div>
        )}

        {loading && (
          <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
            <Spinner size="sm" />
            Analisando tarefa...
          </div>
        )}

        {error && (
          <p role="alert" className="text-[12px] text-destructive">{error}</p>
        )}

        {result && (
          <div className="space-y-3">
            <p className="text-[12px] text-muted-foreground">{result.reasoning}</p>

            <div className="space-y-2">
              {result.subtasks.map((subtask, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between gap-2 rounded-lg bg-background p-2.5"
                >
                  <div className="space-y-0.5">
                    <p className="text-[13px] font-medium">{subtask.title}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {subtask.description}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <Badge variant="outline" className="text-[10px]">
                      {subtask.estimatedHours}h
                    </Badge>
                    <Badge
                      variant={
                        subtask.priority === "HIGH"
                          ? "destructive"
                          : subtask.priority === "MEDIUM"
                            ? "default"
                            : "outline"
                      }
                      className="text-[10px]"
                    >
                      {subtask.priority === "HIGH"
                        ? "Alta"
                        : subtask.priority === "MEDIUM"
                          ? "Média"
                          : "Baixa"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                className="h-8 text-[13px]"
                onClick={handleSaveAll}
                loading={saving}
              >
                Salvar todas
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-[13px]"
                onClick={handleGenerate}
                disabled={saving}
              >
                Gerar novamente
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}