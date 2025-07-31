import OpenAI from "openai";

interface RawInsight {
  type?: string;
  title?: string;
  message?: string;
  action?: string;
  confidence?: number;
}

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    "X-Title": "ExpenseTracker AI",
  },
});

export interface ExpenseRecord {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface AIInsight {
  id: string;
  type: "warning" | "info" | "success" | "tip";
  title: string;
  message: string;
  action?: string;
  confidence: number;
}

export async function generateExpenseInsights(
  expenses: ExpenseRecord[]
): Promise<AIInsight[]> {
  try {
    // Prepare expense data for AI analysis
    const expensesSummary = expenses.map((expense) => ({
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: expense.date,
    }));

    const prompt = `Analise os seguintes dados de despesas e forneça de 3 a 4 insights financeiros acionáveis.
Retorne um array JSON de insights com esta estrutura.:
    {
      "type": "warning|info|success|tip",
      "title": "Título breve",
      "message": "Mensagem de insight detalhada com números específicos quando possívele",
      "action": "Sugestão acionável",
      "confidence": 0.8
    }

   Dados de despesas:
    ${JSON.stringify(expensesSummary, null, 2)}

 Foco em:
1. Padrões de gastos (dia da semana, categorias)
2. Alertas de orçamento (áreas com altos gastos)
3. Oportunidades de economia
4. Reforço positivo para bons hábitos

Retorna apenas um array JSON válido, sem texto adicionalt.`;

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat-v3-0324:free",
      messages: [
        {
          role: "system",
          content:
            "Você é um consultor financeiro de IA que analisa padrões de gastos e fornece insights práticos. Responda sempre apenas com JSON válido.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const response = completion.choices[0].message.content;
    if (!response) {
      throw new Error("No response from AI");
    }

    // Clean the response by removing markdown code blocks if present
    let cleanedResponse = response.trim();
    if (cleanedResponse.startsWith("```json")) {
      cleanedResponse = cleanedResponse
        .replace(/^```json\s*/, "")
        .replace(/\s*```$/, "");
    } else if (cleanedResponse.startsWith("```")) {
      cleanedResponse = cleanedResponse
        .replace(/^```\s*/, "")
        .replace(/\s*```$/, "");
    }

    // Parse AI response
    const insights = JSON.parse(cleanedResponse);

    // Add IDs and ensure proper format
    const formattedInsights = insights.map(
      (insight: RawInsight, index: number) => ({
        id: `ai-${Date.now()}-${index}`,
        type: insight.type || "info",
        title: insight.title || "Insight de IA",
        message: insight.message || "Análise completae",
        action: insight.action,
        confidence: insight.confidence || 0.8,
      })
    );

    return formattedInsights;
  } catch (error) {
    console.error("❌ Error generating AI insights:", error);

    // Fallback to mock insights if AI fails
    return [
      {
        id: "fallback-1",
        type: "info",
        title: "AI Analysis Unavailable",
        message:
          "Não foi possível gerar insights personalizados neste momento. Tente novamente mais tarde.",
        action: "Atualizar insights",
        confidence: 0.5,
      },
    ];
  }
}

export async function categorizeExpense(description: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat-v3-0324:free",
      messages: [
        {
          role: "system",
          content:
            "Você é uma IA de categorização de despesas. Categorize as despesas em uma destas categorias: Alimentação, Transporte, Entretenimento, Compras, Contas, Saúde, Outros. Responda apenas com o nome da categoria.",
        },
        {
          role: "user",
          content: `Categorize esta despesa: "${description}"`,
        },
      ],
      temperature: 0.1,
      max_tokens: 20,
    });

    const category = completion.choices[0].message.content?.trim();

    const validCategories = [
      "Food",
      "Transportation",
      "Entertainment",
      "Shopping",
      "Bills",
      "Healthcare",
      "Other",
    ];

    const finalCategory = validCategories.includes(category || "")
      ? category!
      : "Other";
    return finalCategory;
  } catch (error) {
    console.error("❌ Error categorizing expense:", error);
    return "Other";
  }
}

export async function generateAIAnswer(
  question: string,
  context: ExpenseRecord[]
): Promise<string> {
  try {
    const expensesSummary = context.map((expense) => ({
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: expense.date,
    }));

    const prompt = `Com base nos seguintes dados de despesas, forneça uma resposta detalhada e prática para esta pergunta: "${question}"

    Expense Data:
    ${JSON.stringify(expensesSummary, null, 2)}

  Forneça uma resposta abrangente que:
1. Aborde a questão específica diretamente
2. Utilize dados concretos das despesas sempre que possível
3. Ofereça conselhos práticos
4. Mantenha a resposta concisa, mas informativa (2 a 3 frases)

Retorne apenas o texto da resposta, sem formatação adicional`;

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat-v3-0324:free",
      messages: [
        {
          role: "system",
          content:
            "Você é um consultor financeiro de IA útil que fornece respostas específicas e práticas com base em dados de despesas. Seja conciso, mas completo.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const response = completion.choices[0].message.content;
    if (!response) {
      throw new Error("No response from AI");
    }

    return response.trim();
  } catch (error) {
    console.error("❌ Error generating AI answer:", error);
    return "Não posso fornecer uma resposta detalhada no momento. Tente atualizar os insights ou verifique sua conexão.";
  }
}
// import OpenAI from "openai";

// interface RawInsight {
//   type?: string;
//   title?: string;
//   message?: string;
//   action?: string;
//   confidence?: number;
// }

// const openai = new OpenAI({
//   baseURL: "https://openrouter.ai/api/v1",
//   apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY,
//   defaultHeaders: {
//     "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
//     "X-Title": "ExpenseTracker AI",
//   },
// });

// export interface ExpenseRecord {
//   id: string;
//   amount: number;
//   category: string;
//   description: string;
//   date: string;
// }

// export interface AIInsight {
//   id: string;
//   type: "warning" | "info" | "success" | "tip";
//   title: string;
//   message: string;
//   action?: string;
//   confidence: number;
// }

// export async function generateExpenseInsights(
//   expenses: ExpenseRecord[]
// ): Promise<AIInsight[]> {
//   try {
//     // Prepare expense data for AI analysis
//     const expensesSummary = expenses.map((expense) => ({
//       amount: expense.amount,
//       category: expense.category,
//       description: expense.description,
//       date: expense.date,
//     }));

//     const prompt = `Analyze the following expense data and provide 3-4 actionable financial insights.
//     Return a JSON array of insights with this structure:
//     {
//       "type": "warning|info|success|tip",
//       "title": "Brief title",
//       "message": "Detailed insight message with specific numbers when possible",
//       "action": "Actionable suggestion",
//       "confidence": 0.8
//     }

//     Expense Data:
//     ${JSON.stringify(expensesSummary, null, 2)}

//     Focus on:
//     1. Spending patterns (day of week, categories)
//     2. Budget alerts (high spending areas)
//     3. Money-saving opportunities
//     4. Positive reinforcement for good habits

//     Return only valid JSON array, no additional text.`;

//     const completion = await openai.chat.completions.create({
//       model: "deepseek/deepseek-chat-v3-0324:free",
//       messages: [
//         {
//           role: "system",
//           content:
//             "You are a financial advisor AI that analyzes spending patterns and provides actionable insights. Always respond with valid JSON only.",
//         },
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//       temperature: 0.7,
//       max_tokens: 1000,
//     });

//     const response = completion.choices[0].message.content;
//     if (!response) {
//       throw new Error("No response from AI");
//     }

//     // Clean the response by removing markdown code blocks if present
//     let cleanedResponse = response.trim();
//     if (cleanedResponse.startsWith("```json")) {
//       cleanedResponse = cleanedResponse
//         .replace(/^```json\s*/, "")
//         .replace(/\s*```$/, "");
//     } else if (cleanedResponse.startsWith("```")) {
//       cleanedResponse = cleanedResponse
//         .replace(/^```\s*/, "")
//         .replace(/\s*```$/, "");
//     }

//     // Parse AI response
//     const insights = JSON.parse(cleanedResponse);

//     // Add IDs and ensure proper format
//     const formattedInsights = insights.map(
//       (insight: RawInsight, index: number) => ({
//         id: `ai-${Date.now()}-${index}`,
//         type: insight.type || "info",
//         title: insight.title || "AI Insight",
//         message: insight.message || "Analysis complete",
//         action: insight.action,
//         confidence: insight.confidence || 0.8,
//       })
//     );

//     return formattedInsights;
//   } catch (error) {
//     console.error("❌ Error generating AI insights:", error);

//     // Fallback to mock insights if AI fails
//     return [
//       {
//         id: "fallback-1",
//         type: "info",
//         title: "AI Analysis Unavailable",
//         message:
//           "Unable to generate personalized insights at this time. Please try again later.",
//         action: "Refresh insights",
//         confidence: 0.5,
//       },
//     ];
//   }
// }

// export async function categorizeExpense(description: string): Promise<string> {
//   try {
//     const completion = await openai.chat.completions.create({
//       model: "deepseek/deepseek-chat-v3-0324:free",
//       messages: [
//         {
//           role: "system",
//           content:
//             "You are an expense categorization AI. Categorize expenses into one of these categories: Food, Transportation, Entertainment, Shopping, Bills, Healthcare, Other. Respond with only the category name.",
//         },
//         {
//           role: "user",
//           content: `Categorize this expense: "${description}"`,
//         },
//       ],
//       temperature: 0.1,
//       max_tokens: 20,
//     });

//     const category = completion.choices[0].message.content?.trim();

//     const validCategories = [
//       "Food",
//       "Transportation",
//       "Entertainment",
//       "Shopping",
//       "Bills",
//       "Healthcare",
//       "Other",
//     ];

//     const finalCategory = validCategories.includes(category || "")
//       ? category!
//       : "Other";
//     return finalCategory;
//   } catch (error) {
//     console.error("❌ Error categorizing expense:", error);
//     return "Other";
//   }
// }

// export async function generateAIAnswer(
//   question: string,
//   context: ExpenseRecord[]
// ): Promise<string> {
//   try {
//     const expensesSummary = context.map((expense) => ({
//       amount: expense.amount,
//       category: expense.category,
//       description: expense.description,
//       date: expense.date,
//     }));

//     const prompt = `Based on the following expense data, provide a detailed and actionable answer to this question: "${question}"

//     Expense Data:
//     ${JSON.stringify(expensesSummary, null, 2)}

//     Provide a comprehensive answer that:
//     1. Addresses the specific question directly
//     2. Uses concrete data from the expenses when possible
//     3. Offers actionable advice
//     4. Keeps the response concise but informative (2-3 sentences)

//     Return only the answer text, no additional formatting.`;

//     const completion = await openai.chat.completions.create({
//       model: "deepseek/deepseek-chat-v3-0324:free",
//       messages: [
//         {
//           role: "system",
//           content:
//             "You are a helpful financial advisor AI that provides specific, actionable answers based on expense data. Be concise but thorough.",
//         },
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//       temperature: 0.7,
//       max_tokens: 200,
//     });

//     const response = completion.choices[0].message.content;
//     if (!response) {
//       throw new Error("No response from AI");
//     }

//     return response.trim();
//   } catch (error) {
//     console.error("❌ Error generating AI answer:", error);
//     return "I'm unable to provide a detailed answer at the moment. Please try refreshing the insights or check your connection.";
//   }
// }
