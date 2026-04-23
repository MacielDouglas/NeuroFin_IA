export type AiMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type AiRequestOptions = {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  // responseFormat removido — cada provider gerencia internamente
};

export type AiResponse = {
  content: string;
  model: string;
  latencyMs: number;
  usage: {
    promptTokens: number;
    completionTokens: number;
  };
};

export interface AiProvider {
  complete(messages: AiMessage[], options?: AiRequestOptions): Promise<AiResponse>;
}