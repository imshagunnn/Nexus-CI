import type {
  FeatureRecommendation,
  CompetitiveAdvantage,
  MarketOpportunity,
  MarketRisk,
  SalesRecommendation,
} from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ConfidenceBadge } from "@/components/common/ConfidenceBadge";
import { AlertTriangle, Shield, Target, TrendingUp, Users } from "lucide-react";

interface RecommendationsPanelProps {
  features: FeatureRecommendation[];
  advantages: CompetitiveAdvantage[];
  opportunities: MarketOpportunity[];
  risks: MarketRisk[];
  salesTargets: SalesRecommendation[];
  decisionMakers: SalesRecommendation[];
}

const impactColors = { High: "success", Medium: "warning", Low: "secondary" } as const;
const priorityColors = { Critical: "destructive", High: "warning", Medium: "default", Low: "secondary" } as const;
const severityColors = { High: "destructive", Medium: "warning", Low: "secondary" } as const;

export function RecommendationsPanel({
  features,
  advantages,
  opportunities,
  risks,
  salesTargets,
  decisionMakers,
}: RecommendationsPanelProps) {
  return (
    <div className="space-y-8">
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-indigo-600" />
          <h2 className="text-xl font-semibold text-slate-900">Product Recommendations</h2>
        </div>
        <p className="mb-4 text-sm text-slate-500">Top 5 features to build next</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {features.map((rec, i) => (
            <Card key={rec.id}>
              <CardContent className="p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                    {i + 1}
                  </span>
                  <h4 className="font-medium text-slate-900">{rec.feature}</h4>
                </div>
                <p className="mb-3 text-sm text-slate-600">{rec.reason}</p>
                <div className="mb-3 flex gap-2">
                  <Badge variant={impactColors[rec.impact]}>Impact: {rec.impact}</Badge>
                  <Badge variant={priorityColors[rec.priority]}>Priority: {rec.priority}</Badge>
                </div>
                <ConfidenceBadge score={rec.confidenceScore} type={rec.type} />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-emerald-600" />
          <h2 className="text-xl font-semibold text-slate-900">Competitive Advantages</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((adv) => (
            <Card key={adv.id}>
              <CardContent className="p-4">
                <h4 className="font-medium text-slate-900">{adv.advantage}</h4>
                <p className="mt-2 text-sm text-slate-600">{adv.description}</p>
                <div className="mt-3">
                  <ConfidenceBadge score={adv.confidenceScore} type={adv.type} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-amber-600" />
          <h2 className="text-xl font-semibold text-slate-900">Market Opportunities</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((opp) => (
            <Card key={opp.id}>
              <CardContent className="p-4">
                <h4 className="font-medium text-slate-900">{opp.opportunity}</h4>
                <p className="mt-2 text-sm text-slate-600">{opp.description}</p>
                <div className="mt-3">
                  <ConfidenceBadge score={opp.confidenceScore} type={opp.type} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <h2 className="text-xl font-semibold text-slate-900">Market Risks</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {risks.map((risk) => (
            <Card key={risk.id} className="border-red-100">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-slate-900">{risk.risk}</h4>
                  <Badge variant={severityColors[risk.severity]}>{risk.severity}</Badge>
                </div>
                <p className="mt-2 text-sm text-slate-600">{risk.description}</p>
                <div className="mt-3">
                  <ConfidenceBadge score={risk.confidenceScore} type={risk.type} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-indigo-600" />
          <h2 className="text-xl font-semibold text-slate-900">Sales Recommendations</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Top 5 Companies to Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {salesTargets.slice(0, 5).map((sale, i) => (
                <div key={sale.id} className="rounded-lg border border-slate-100 p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-indigo-600">#{i + 1}</span>
                    <span className="font-medium text-slate-900">{sale.companyName}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{sale.reason}</p>
                  <div className="mt-2">
                    <ConfidenceBadge score={sale.confidenceScore} type={sale.type} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Top 5 Decision Makers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {decisionMakers.slice(0, 5).map((dm, i) => (
                <div key={dm.id} className="rounded-lg border border-slate-100 p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-indigo-600">#{i + 1}</span>
                    <span className="font-medium text-slate-900">{dm.contactPerson}</span>
                  </div>
                  <p className="text-sm text-slate-500">{dm.jobTitle} at {dm.companyName}</p>
                  <p className="mt-1 text-sm text-slate-600">{dm.reason}</p>
                  <div className="mt-2">
                    <ConfidenceBadge score={dm.confidenceScore} type={dm.type} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
