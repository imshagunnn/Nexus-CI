"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardSkeleton } from "@/components/ui/skeleton";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { ExportButtons } from "@/components/common/ExportButtons";
import { SourcesSection } from "@/components/common/SourcesSection";
import { MetricsCards } from "@/components/dashboard/MetricsCards";
import { FounderDashboard } from "@/components/dashboard/FounderDashboard";
import { CompetitorTable } from "@/components/competitors/CompetitorTable";
import { FeatureMatrix } from "@/components/competitors/FeatureMatrix";
import { MarketLandscapeOverview } from "@/components/competitors/MarketLandscape";
import { FeatureGapAnalysis } from "@/components/competitors/FeatureGapAnalysis";
import { PricingComparisonChart, PositioningChart } from "@/components/charts/CompetitorCharts";
import { LeadTable } from "@/components/leads/LeadTable";
import { LeadRanking } from "@/components/leads/LeadRanking";
import { RecommendationsPanel } from "@/components/recommendations/RecommendationsPanel";
import { useAnalysis } from "@/hooks/useAnalysis";

type DashboardTab = "overview" | "competitors" | "leads" | "recommendations";

const dashboardTabs: Array<{ id: DashboardTab; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "competitors", label: "Competitors" },
  { id: "leads", label: "Leads" },
  { id: "recommendations", label: "Recommendations" },
];

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { analyze, data, isLoading, error, reset } = useAnalysis();
  const hasAnalyzed = useRef(false);
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");

  const idea = searchParams.get("idea") ?? "";
  const website = searchParams.get("website") ?? undefined;
  const company = searchParams.get("company") ?? undefined;

  useEffect(() => {
    if (!idea || hasAnalyzed.current) return;
    hasAnalyzed.current = true;

    analyze({
      productIdea: idea,
      websiteUrl: website,
      companyName: company,
    }).catch(() => {
      // Error handled by hook
    });
  }, [idea, website, company, analyze]);

  if (!idea) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <ErrorMessage
          title="No analysis input"
          message="Please go back and describe your startup idea to begin analysis."
          onRetry={() => router.push("/")}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600">
                <Sparkles className="h-3.5 w-3.5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">
                  {data?.productName ?? "Analyzing..."}
                </h1>
                <p className="text-xs text-slate-500 truncate max-w-xs sm:max-w-md">{idea}</p>
              </div>
            </div>
          </div>
          {data && (
            <div className="flex items-center gap-3">
              {data.usedMockData && (
                <Badge variant="warning">Demo Data</Badge>
              )}
              <ExportButtons report={data} />
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6">
        {isLoading && <DashboardSkeleton />}

        {error && !isLoading && (
          <ErrorMessage
            message={error}
            onRetry={() => {
              hasAnalyzed.current = false;
              reset();
              analyze({ productIdea: idea, websiteUrl: website, companyName: company });
            }}
          />
        )}

        {data && !isLoading && (
          <>
            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
              <div className="flex min-w-max gap-1" role="tablist" aria-label="Dashboard sections">
                {dashboardTabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === "overview" && (
              <div className="space-y-8" role="tabpanel">
                <MetricsCards metrics={data.metrics} />
                <FounderDashboard decisions={data.founderDecisions} />
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <PricingComparisonChart
                    competitors={data.competitors}
                    productName={data.productName}
                  />
                  <PositioningChart
                    competitors={data.competitors}
                    productName={data.productName}
                  />
                </div>
                <MarketLandscapeOverview landscape={data.marketLandscape} />
              </div>
            )}

            {activeTab === "competitors" && (
              <div className="space-y-8" role="tabpanel">
                <CompetitorTable competitors={data.competitors} />
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <PricingComparisonChart
                    competitors={data.competitors}
                    productName={data.productName}
                  />
                  <PositioningChart
                    competitors={data.competitors}
                    productName={data.productName}
                  />
                </div>
                <FeatureMatrix
                  competitors={data.competitors}
                  productName={data.productName}
                  productFeatures={data.productFeatures}
                />
                <FeatureGapAnalysis gaps={data.featureGaps} />
                <MarketLandscapeOverview landscape={data.marketLandscape} />
              </div>
            )}

            {activeTab === "leads" && (
              <div className="space-y-8" role="tabpanel">
                <LeadTable leads={data.leads} />
                <LeadRanking leads={data.leads} />
              </div>
            )}

            {activeTab === "recommendations" && (
              <div className="space-y-8" role="tabpanel">
                <RecommendationsPanel
                  features={data.featureRecommendations}
                  advantages={data.competitiveAdvantages}
                  opportunities={data.marketOpportunities}
                  risks={data.marketRisks}
                  salesTargets={data.salesRecommendations}
                  decisionMakers={data.decisionMakers}
                />
                <SourcesSection sources={data.sources} />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
