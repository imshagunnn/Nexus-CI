import type { AnalysisReport, FeatureRecommendation } from "@/types";

export function getPrioritizedFeatures(
  recommendations: FeatureRecommendation[]
): FeatureRecommendation[] {
  const priorityOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 };
  return [...recommendations].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );
}

export function getRecommendationSummary(report: AnalysisReport) {
  return {
    features: getPrioritizedFeatures(report.featureRecommendations),
    advantages: report.competitiveAdvantages,
    opportunities: report.marketOpportunities,
    risks: report.marketRisks,
    salesTargets: report.salesRecommendations,
    decisionMakers: report.decisionMakers,
  };
}
