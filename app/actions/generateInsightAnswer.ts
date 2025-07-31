"use server";

import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/db";
import { generateAIAnswer, ExpenseRecord } from "@/lib/ai";

export async function generateInsightAnswer(question: string): Promise<string> {
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

    // Convert to format expected by AI
    const expenseData: ExpenseRecord[] = expenses.map((expense) => ({
      id: expense.id,
      amount: expense.amount,
      category: expense.category || "Other",
      description: expense.text,
      date: expense.createdAt.toISOString(),
    }));

    // Generate AI answer
    const answer = await generateAIAnswer(question, expenseData);
    return answer;
  } catch (error) {
    console.error("Erro ao gerar resposta de insight", error);
    return "Não posso fornecer uma resposta detalhada no momento. Tente atualizar os insights ou verifique sua conexão.";
  }
}
