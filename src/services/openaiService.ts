import "server-only";
import { v4 as uuidv4 } from "uuid";
import type { AnalysisInput, AnalysisReport } from "@/types";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
const OPENAI_TIMEOUT_MS = 12000;

export async function enhanceWithOpenAI(
  input: AnalysisInput,
  baseReport: AnalysisReport
): Promise<AnalysisReport | null> {
  if (!OPENAI_API_KEY) return null;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), OPENAI_TIMEOUT_MS);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: OPENAI_MODEL,
          messages: [
            {
              role: "system",
              content: `You are a startup competitive intelligence analyst. Return JSON only with this shape:
{
  "productName": "string",
  "founderDecisions": [
    { "question": "string", "answer": "string", "actionItems": ["string","string","string"] }
  ],
  "competitorUpdates": [
    { "name": "string", "description": "string", "pricing": "string", "targetAudience": "string", "strengths": ["string"], "weaknesses": ["string"], "valueProposition": "string" }
  ],
  "topFeature": { "feature": "string", "reason": "string" }
}
Provide 5 founderDecisions matching: "What should I build next?", "Biggest competitor threat?", "Best opportunity?", "Best leads?", "What should I do today?"
Provide 5 competitorUpdates with real company names relevant to the product niche.`,
            },
            {
              role: "user",
              content: `Analyze this startup:
Product idea: ${input.productIdea}
Website: ${input.websiteUrl ?? "not provided"}
Company: ${input.companyName ?? "not provided"}`,
            },
          ],
          response_format: { type: "json_object" },
          temperature: 0.7,
        }),
        signal: controller.signal,
        cache: "no-store",
      });

      if (!response.ok) {
        console.warn("OpenAI API error:", response.status);
        return null;
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (!content) return null;

      const ai = JSON.parse(content) as {
      productName?: string;
      founderDecisions?: Array<{
        question: string;
        answer: string;
        actionItems: string[];
      }>;
      competitorUpdates?: Array<{
        name: string;
        description: string;
        pricing: string;
        targetAudience: string;
        strengths: string[];
        weaknesses: string[];
        valueProposition: string;
      }>;
      topFeature?: { feature: string; reason: string };
    };

      const report = { ...baseReport, usedMockData: false };

      if (ai.productName) {
        report.productName = ai.productName;
      }

      if (ai.founderDecisions?.length) {
        report.founderDecisions = ai.founderDecisions.map((d) => ({
          id: uuidv4(),
          question: d.question,
          answer: d.answer,
          actionItems: d.actionItems ?? [],
          confidenceScore: 85,
          type: "AI Inference" as const,
        }));
      }

      if (ai.competitorUpdates?.length) {
        ai.competitorUpdates.forEach((update, i) => {
          if (report.competitors[i]) {
            report.competitors[i] = {
              ...report.competitors[i],
              name: update.name,
              description: update.description,
              pricing: update.pricing,
              targetAudience: update.targetAudience,
              strengths: update.strengths,
              weaknesses: update.weaknesses,
              valueProposition: update.valueProposition,
              type: "AI Inference",
              confidenceScore: 82,
            };
          }
        });
      }

      if (ai.topFeature && report.featureRecommendations[0]) {
        report.featureRecommendations[0] = {
          ...report.featureRecommendations[0],
          feature: ai.topFeature.feature,
          reason: ai.topFeature.reason,
          type: "AI Inference",
        };
      }

      return report;
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    console.warn("OpenAI enhancement failed:", error);
    return null;
  }
}

export function hasOpenAIKey(): boolean {
  return Boolean(OPENAI_API_KEY && OPENAI_API_KEY.length > 10);
}
