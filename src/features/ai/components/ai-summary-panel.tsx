"use client";

import { useState } from "react";
import { Sparkles, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { summarizeProjectAction } from "@/server/actions/ai.actions";
import type { SummarizeProjectInput } from "@/server/ai/schemas/summary.schema";
import type { SummarizeProjectOutput } from "@/server/ai/schemas/summary.schema";

const healthVariant = {
  AHEAD:    "success",
  ON_TRACK: "default",
  AT_RISK:  "warning",
  CRITICAL: "destructive",
} as const;

const healthLabel = {
  AHEAD:    "Adiantado",
  ON_TRACK: "No prazo",
  AT_RISK:  "Em risco",
  CRITICAL: "Crítico",
};

type AiSummaryPanelProps = {
  input: SummarizeProjectInput;
  projectId: string;
};

export function AiSummaryPanel({ input, projectId }: AiSummaryPanelProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SummarizeProjectOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    setLoading(true);
    setError(null);

    const response = await summarizeProjectAction(input, projectId);

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
            <Sparkles size={16} className="text-primary" aria-hidden="true" />
            Resumo do projeto
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 text-[12px]"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? <Spinner size="sm" /> : <RefreshCw size={13} aria-hidden="true" />}
            {result ? "Atualizar" : "Gerar resumo"}
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {!result && !loading && !error && (
          <p className="text-sm text-muted-foreground">
            Clique em "Gerar resumo" para obter um status report inteligente do projeto.
          </p>
        )}

        {loading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Spinner size="sm" />
            Analisando projeto...
          </div>
        )}

        {error && (
          <p role="alert" className="text-sm text-destructive">{error}</p>
        )}

        {result && (
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <p className="font-medium">{result.headline}</p>
              <Badge variant={healthVariant[result.overallHealth]}>
                {healthLabel[result.overallHealth]}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground">{result.statusReport}</p>

            {result.highlights.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-[12px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Destaques
                </p>
                <ul className="space-y-1">
                  {result.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="mt-0.5 text-success" aria-hidden="true">✓</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.concerns.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-[12px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Atenção
                </p>
                <ul className="space-y-1">
                  {result.concerns.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="mt-0.5 text-warning" aria-hidden="true">⚠</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}