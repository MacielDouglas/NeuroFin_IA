"use client";

import { useState, useEffect } from "react";
import { getAIInsights } from "@/app/actions/getAIInsights";
import { generateInsightAnswer } from "@/app/actions/generateInsightAnswer";

interface InsightData {
  id: string;
  type: "warning" | "info" | "success" | "tip";
  title: string;
  message: string;
  action?: string;
  confidence?: number;
}

interface AIAnswer {
  insightId: string;
  answer: string;
  isLoading: boolean;
}

const AIInsights = () => {
  const [insights, setInsights] = useState<InsightData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [aiAnswers, setAiAnswers] = useState<AIAnswer[]>([]);

  const loadInsights = async () => {
    setIsLoading(true);
    try {
      const newInsights = await getAIInsights();
      setInsights(newInsights);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("❌ AIInsights: Failed to load AI insights:", error);
      // Fallback to mock data if AI fails
      setInsights([
        {
          id: "fallback-1",
          type: "info",
          title: "AI Temporarily Unavailable",
          message:
            "We're working to restore AI insights. Please check back soon.",
          action: "Try again later",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = async (insight: InsightData) => {
    if (!insight.action) return;

    // Check if answer is already loading or exists
    const existingAnswer = aiAnswers.find((a) => a.insightId === insight.id);
    if (existingAnswer) {
      // Remove the answer if it already exists (toggle functionality)
      setAiAnswers((prev) => prev.filter((a) => a.insightId !== insight.id));
      return;
    }

    // Add loading state
    setAiAnswers((prev) => [
      ...prev,
      {
        insightId: insight.id,
        answer: "",
        isLoading: true,
      },
    ]);

    try {
      // Generate question based on insight title and action
      const question = `${insight.title}: ${insight.action}`;

      // Use server action to generate AI answer
      const answer = await generateInsightAnswer(question);

      setAiAnswers((prev) =>
        prev.map((a) =>
          a.insightId === insight.id ? { ...a, answer, isLoading: false } : a
        )
      );
    } catch (error) {
      console.error("❌ Falha ao gerar resposta de IA:", error);
      setAiAnswers((prev) =>
        prev.map((a) =>
          a.insightId === insight.id
            ? {
                ...a,
                answer:
                  "Desculpe, não consegui gerar uma resposta detalhada. Tente novamente.",
                isLoading: false,
              }
            : a
        )
      );
    }
  };

  useEffect(() => {
    loadInsights();
  }, []);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "warning":
        return "⚠️";
      case "success":
        return "✅";
      case "tip":
        return "💡";
      case "info":
        return "ℹ️";
      default:
        return "🤖";
    }
  };

  const getInsightColors = (type: string) => {
    switch (type) {
      case "warning":
        return "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20";
      case "success":
        return "border-l-stone-500 bg-stone-50 dark:bg-stone-900/20";
      case "tip":
        return "border-l-slate-500 bg-slate-50 dark:bg-slate-900/20";
      case "info":
        return "border-l-slate-500 bg-slate-50 dark:bg-slate-900/20";
      default:
        return "border-l-gray-500 bg-gray-50 dark:bg-gray-800/50";
    }
  };

  const getButtonColors = (type: string) => {
    switch (type) {
      case "warning":
        return "text-yellow-700 dark:text-yellow-300 hover:text-yellow-800 dark:hover:text-yellow-200";
      case "success":
        return "text-stone-700 dark:text-stone-300 hover:text-stone-800 dark:hover:text-stone-200";
      case "tip":
        return "text-slate-700 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200";
      case "info":
        return "text-slate-700 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200";
      default:
        return "text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200";
    }
  };

  const formatLastUpdated = () => {
    if (!lastUpdated) return "Loading...";

    const now = new Date();
    const diffMs = now.getTime() - lastUpdated.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Agora mesmo";
    if (diffMins < 60) return `${diffMins}m atrás`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h atrás`;

    return lastUpdated.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-slate-500 via-stone-500 to-neutral-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-sm sm:text-lg">🤖</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
              Insights de IA
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Analisando seus padrões de gastos
            </p>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-slate-500/30 border-t-slate-500 rounded-full animate-spin"></div>
            <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium hidden sm:block">
              Analisando...
            </span>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 p-3 sm:p-4 rounded-xl border border-gray-100 dark:border-gray-600"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 dark:bg-gray-600 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded-lg w-3/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded-lg w-full"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded-lg w-2/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-700 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <div className="w-1.5 h-1.5 bg-slate-500 dark:bg-slate-400 rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm">
              A IA está analisando seus padrões financeiros...
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 hover:shadow-2xl">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-slate-500 via-stone-500 to-neutral-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-sm sm:text-lg">🤖</span>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
              Insights de IA
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Análise financeira de IA
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="inline-flex items-center gap-2 bg-slate-50 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-full text-xs font-medium">
            <span className="w-1.5 h-1.5 bg-slate-500 dark:bg-slate-400 rounded-full"></span>
            <span className="hidden sm:inline">{formatLastUpdated()}</span>
            <span className="sm:hidden">
              {formatLastUpdated().includes("ago")
                ? formatLastUpdated().replace(" ago", "")
                : formatLastUpdated()}
            </span>
          </div>
          <button
            onClick={loadInsights}
            className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-slate-600 via-stone-500 to-neutral-500 hover:from-slate-700 hover:via-stone-600 hover:to-neutral-600 text-white rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200"
            disabled={isLoading}
          >
            <span className="text-sm">🔄</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        {insights.map((insight) => {
          const currentAnswer = aiAnswers.find(
            (a) => a.insightId === insight.id
          );

          return (
            <div
              key={insight.id}
              className={`relative overflow-hidden rounded-xl p-3 sm:p-4 border-l-4 hover:shadow-lg transition-all duration-200 ${getInsightColors(
                insight.type
              )}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <div
                      className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center ${
                        insight.type === "warning"
                          ? "bg-yellow-100 dark:bg-yellow-900/50"
                          : insight.type === "success"
                          ? "bg-stone-100 dark:bg-stone-900/50"
                          : insight.type === "tip"
                          ? "bg-slate-100 dark:bg-slate-900/50"
                          : "bg-slate-100 dark:bg-slate-900/50"
                      }`}
                    >
                      <span className="text-sm sm:text-lg">
                        {getInsightIcon(insight.type)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm mb-0.5">
                        {insight.title}
                      </h4>
                      {insight.confidence && insight.confidence < 0.8 && (
                        <span className="inline-block px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 rounded-full text-xs font-medium">
                          Preliminares
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed mb-3">
                    {insight.message}
                  </p>
                  {insight.action && (
                    <div className="text-left">
                      <span
                        onClick={() => handleActionClick(insight)}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-xs cursor-pointer transition-all duration-200 ${getButtonColors(
                          insight.type
                        )} hover:bg-white/50 dark:hover:bg-gray-700/50 ${
                          currentAnswer ? "bg-white/50 dark:bg-gray-700/50" : ""
                        }`}
                      >
                        <span>{insight.action}</span>
                        {currentAnswer?.isLoading ? (
                          <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <span className="text-xs">
                            {currentAnswer ? "↑" : "→"}
                          </span>
                        )}
                      </span>
                    </div>
                  )}

                  {/* AI Answer Display */}
                  {currentAnswer && (
                    <div className="mt-3 p-3 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-600">
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-slate-500 via-stone-500 to-neutral-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs">🤖</span>
                        </div>
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900 dark:text-gray-100 text-xs mb-1">
                            Resposta da IA:
                          </h5>
                          {currentAnswer.isLoading ? (
                            <div className="space-y-1">
                              <div className="animate-pulse bg-gray-200 dark:bg-gray-600 h-2 rounded-lg w-full"></div>
                              <div className="animate-pulse bg-gray-200 dark:bg-gray-600 h-2 rounded-lg w-3/4"></div>
                              <div className="animate-pulse bg-gray-200 dark:bg-gray-600 h-2 rounded-lg w-1/2"></div>
                            </div>
                          ) : (
                            <p className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed">
                              {currentAnswer.answer}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-slate-50 dark:bg-slate-900/30 rounded-lg flex items-center justify-center">
              <span className="text-sm">🧠</span>
            </div>
            <span className="font-medium text-xs">
              Alimentado por análise de IA
            </span>
          </div>
          <button
            onClick={loadInsights}
            className="px-3 py-1.5 bg-gradient-to-r from-slate-600 via-stone-500 to-neutral-500 hover:from-slate-700 hover:via-stone-600 hover:to-neutral-600 text-white rounded-lg font-medium text-xs shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <span className="sm:hidden">Atualizar</span>
            <span className="hidden sm:inline">Atualizar Insights →</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
