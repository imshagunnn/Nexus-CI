import type { AnalysisInput, AnalysisReport } from "@/types";
import { generateMockAnalysis } from "./mockData";
import { enhanceWithOpenAI } from "./openaiService";

export async function analyzeCompetitors(input: AnalysisInput): Promise<AnalysisReport> {
  const baseReport = generateMockAnalysis(input);
  const enhanced = await enhanceWithOpenAI(input, baseReport);
  if (enhanced) return enhanced;
  return baseReport;
}
