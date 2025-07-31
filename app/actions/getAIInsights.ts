"use server";

import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/db";
import { generateExpenseInsights, AIInsight, ExpenseRecord } from "@/lib/ai";

export async function getAIInsights(): Promise<AIInsight[]> {
  try {
    const user = await checkUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    // Get user's recent expenses (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const expenses = await db.record.findMany({
      where: {
        userId: user.clerkUserId,
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50, // Limit to recent 50 expenses for analysis
    });

    if (expenses.length === 0) {
      // Return default insights for new users
      return [
        {
          id: "welcome-1",
          type: "info",
          title: "Bem-vindo ao NeuroFin IA!",
          message:
            "Comece a adicionar suas despesas para obter insights personalizados de IA sobre seus padrões de gastos.",
          action: "Adicione sua primeira despesa",
          confidence: 1.0,
        },
        {
          id: "welcome-2",
          type: "tip",
          title: "Acompanhe regularmente",
          message:
            "Para melhores resultados, tente registrar as despesas diariamente. Isso ajuda nossa IA a fornecer insights mais precisos.",
          action: "Definir lembretes diários",
          confidence: 1.0,
        },
      ];
    }

    // Convert to format expected by AI
    const expenseData: ExpenseRecord[] = expenses.map((expense) => ({
      id: expense.id,
      amount: expense.amount,
      category: expense.category || "Other",
      description: expense.text,
      date: expense.createdAt.toISOString(),
    }));

    // Generate AI insights
    const insights = await generateExpenseInsights(expenseData);
    return insights;
  } catch (error) {
    console.error("Error getting AI insights:", error);

    // Return fallback insights
    return [
      {
        id: "error-1",
        type: "warning",
        title: "Insights temporariamente indisponíveis",
        message:
          "Estamos com problemas para analisar suas despesas. Tente novamente em alguns minutos.",
        action: "RRepetir análise",
        confidence: 0.5,
      },
    ];
  }
}
