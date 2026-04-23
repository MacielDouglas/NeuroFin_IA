import Groq from "groq-sdk";
import type { AiProvider,  AiResponse } from "./ai.provider";


// llama-3.3-70b-versatile suporta json_object mas não json_schema
const GROQ_DEFAULT_MODEL = "llama-3.3-70b-versatile";

const groqClient = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const groqProvider: AiProvider = {
  async complete(messages, options = {}): Promise<AiResponse> {
    const startedAt = Date.now();

    // Sempre usa json_object — compatível com todos os modelos Groq
    // A conformidade com o schema é garantida via Zod após o parse
    const response = await groqClient.chat.completions.create({
      model: options.model ?? GROQ_DEFAULT_MODEL,
      temperature: options.temperature ?? 0.3,
      max_tokens: options.maxTokens ?? 2048,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
      response_format: { type: "json_object" },
    });

    const latencyMs = Date.now() - startedAt;
    const choice = response.choices[0];

    if (!choice?.message.content) {
      throw new Error("Groq retornou resposta vazia");
    }

    return {
      content: choice.message.content,
      model: response.model,
      latencyMs,
      usage: {
        promptTokens: response.usage?.prompt_tokens ?? 0,
        completionTokens: response.usage?.completion_tokens ?? 0,
      },
    };
  },
};