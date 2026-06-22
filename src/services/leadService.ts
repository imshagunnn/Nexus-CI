import type { AnalysisReport, Lead } from "@/types";

export function rankLeads(leads: Lead[]): Lead[] {
  return [...leads].sort((a, b) => b.valueScore - a.valueScore);
}

export function getTopLeads(leads: Lead[], count = 5): Lead[] {
  return rankLeads(leads).slice(0, count);
}

export function getLeadMetrics(report: AnalysisReport) {
  const ranked = rankLeads(report.leads);
  return {
    total: report.leads.length,
    highValue: report.leads.filter((l) => l.valueScore >= 85).length,
    avgConfidence: Math.round(
      report.leads.reduce((sum, l) => sum + l.confidenceScore, 0) / report.leads.length
    ),
    topLeads: ranked.slice(0, 5),
  };
}
