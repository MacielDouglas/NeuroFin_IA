"use client";

import { useState } from "react";
import { AlertTriangle, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { detectBottlenecksAction } from "@/server/actions/ai.actions";
import type { DetectBottlenecksInput } from "@/server/ai/schemas/bottleneck.schema";
import type { DetectBottlenecksOutput } from "@/server/ai/schemas/bottleneck.schema";

const severityVariant = {
  LOW:      "outline",
  MEDIUM:   "default",
  HIGH:     "warning",
  CRITICAL: "destructive",
} as const;

type AiBottleneckPanelProps = {
  input: DetectBottlenecksInput;
  projectId: string;
};

export function AiBottleneckPanel({ input, projectId }: AiBottleneckPanelProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetectBottlenecksOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleDetect() {
    setLoading(true);
    setError(null);

    const response = await detectBottlenecksAction(input, projectId);

    if (!response.success) {
      setError(response.error);
    } else {
      setResult(response.data);
    }
    setLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertTriangle size={16} className="text-warning" aria-hidden="true" />
            Detecção de gargalos
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 text-[12px]"
            onClick={handleDetect}
            disabled={loading}
          >
            {loading ? <Spinner size="sm" /> : <Sparkles size={13} aria-hidden="true" />}
            {result ? "Reanalisar" : "Detectar gargalos"}
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {!result && !loading && !error && (
          <p className="text-sm text-muted-foreground">
            A IA identifica membros sobrecarregados e tarefas paradas há muito tempo.
          </p>
        )}

        {loading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Spinner size="sm" />
            Analisando gargalos...
          </div>
        )}

        {error && (
          <p role="alert" className="text-sm text-destructive">{error}</p>
        )}

        {result && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{result.summary}</p>
              {result.urgentActionRequired && (
                <Badge variant="destructive" className="shrink-0">
                  Ação urgente
                </Badge>
              )}
            </div>

            {result.bottlenecks.length === 0 ? (
              <p className="text-sm text-success">
                ✓ Nenhum gargalo identificado. Time está saudável!
              </p>
            ) : (
              <div className="space-y-3">
                {result.bottlenecks.map((b, i) => (
                  <div
                    key={i}
                    className="space-y-1.5 rounded-xl border border-border p-4"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[13px] font-semibold">{b.title}</p>
                      <Badge variant={severityVariant[b.severity]} className="shrink-0">
                        {b.severity}
                      </Badge>
                    </div>
                    <p className="text-[12px] text-muted-foreground">{b.description}</p>
                    <p className="text-[12px] font-medium text-primary">
                      → {b.recommendation}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}