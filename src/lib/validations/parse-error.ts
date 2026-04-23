import type { ZodError } from "zod";

/**
 * Retorna a mensagem do primeiro erro de validação Zod.
 * Compatível com Zod v4 (.issues).
 */
export function firstIssue(error: ZodError): string {
  return error.issues[0]?.message ?? "Erro de validação";
}