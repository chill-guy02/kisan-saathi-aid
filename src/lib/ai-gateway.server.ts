import { createGoogleGenerativeAI } from "@ai-sdk/google";

/** Direct Google Gemini provider — server-only. */
export function createGeminiProvider(apiKey: string) {
  return createGoogleGenerativeAI({ apiKey });
}
