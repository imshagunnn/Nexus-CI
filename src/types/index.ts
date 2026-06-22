export type InsightType = "Verified Information" | "AI Inference" | "Assumption";

export interface SourceReference {
  id: string;
  title: string;
  url: string;
  accessedAt: string;
}

export interface InsightMeta {
  confidenceScore: number;
  type: InsightType;
  sourceIds?: string[];
}

export interface Competitor extends InsightMeta {
  id: string;
  name: string;
  website: string;
  description: string;
  pricing: string;
  targetAudience: string;
  features: string[];
  strengths: string[];
  weaknesses: string[];
  valueProposition: string;
  positioning: {
    easeOfUse: number;
    featureRichness: number;
  };
  marketCategory: "market_leader" | "emerging" | "budget" | "enterprise";
}

export interface Lead extends InsightMeta {
  id: string;
  companyName: string;
  website: string;
  industry: string;
  employeeSize: string;
  location: string;
  contactPerson: string;
  jobTitle: string;
  linkedIn: string;
  valueScore: number;
}

export interface FeatureRecommendation extends InsightMeta {
  id: string;
  feature: string;
  reason: string;
  impact: "High" | "Medium" | "Low";
  priority: "Critical" | "High" | "Medium" | "Low";
}

export interface CompetitiveAdvantage extends InsightMeta {
  id: string;
  advantage: string;
  description: string;
}

export interface MarketOpportunity extends InsightMeta {
  id: string;
  opportunity: string;
  description: string;
}

export interface MarketRisk extends InsightMeta {
  id: string;
  risk: string;
  description: string;
  severity: "High" | "Medium" | "Low";
}

export interface SalesRecommendation extends InsightMeta {
  id: string;
  companyName: string;
  contactPerson?: string;
  jobTitle?: string;
  reason: string;
}

export interface FeatureGap extends InsightMeta {
  id: string;
  feature: string;
  competitorsWithFeature: string[];
  adoptionRate: number;
}

export interface MarketLandscape {
  marketLeaders: string[];
  emergingPlayers: string[];
  budgetPlayers: string[];
  enterprisePlayers: string[];
}

export interface FounderDecision {
  id: string;
  question: string;
  answer: string;
  actionItems: string[];
  confidenceScore: number;
  type: InsightType;
}

export interface DashboardMetrics {
  competitorsFound: number;
  opportunitiesFound: number;
  recommendedFeatures: number;
  highValueLeads: number;
}

export interface AnalysisInput {
  productIdea: string;
  websiteUrl?: string;
  companyName?: string;
}

export interface AnalysisReport {
  id: string;
  generatedAt: string;
  input: AnalysisInput;
  productName: string;
  productFeatures: string[];
  metrics: DashboardMetrics;
  competitors: Competitor[];
  leads: Lead[];
  featureRecommendations: FeatureRecommendation[];
  competitiveAdvantages: CompetitiveAdvantage[];
  marketOpportunities: MarketOpportunity[];
  marketRisks: MarketRisk[];
  salesRecommendations: SalesRecommendation[];
  decisionMakers: SalesRecommendation[];
  featureGaps: FeatureGap[];
  marketLandscape: MarketLandscape;
  founderDecisions: FounderDecision[];
  sources: SourceReference[];
  usedMockData: boolean;
}

export interface ApiError {
  code: string;
  message: string;
}

export interface AnalyzeResponse {
  success: boolean;
  data?: AnalysisReport;
  error?: ApiError;
}
