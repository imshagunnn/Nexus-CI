import type { FeatureGap } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConfidenceBadge } from "@/components/common/ConfidenceBadge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface FeatureGapAnalysisProps {
  gaps: FeatureGap[];
}

export function FeatureGapAnalysis({ gaps }: FeatureGapAnalysisProps) {
  const chartData = gaps.map((g) => ({
    name: g.feature.length > 15 ? g.feature.slice(0, 15) + "…" : g.feature,
    adoption: g.adoptionRate,
  }));

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Feature Gap Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-slate-500">
            Features competitors have that your product currently lacks
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="adoption" fill="#6366f1" radius={[0, 4, 4, 0]} name="Competitor Adoption %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gaps.map((gap) => (
          <Card key={gap.id}>
            <CardContent className="p-4">
              <h4 className="font-medium text-slate-900">{gap.feature}</h4>
              <p className="mt-1 text-sm text-slate-500">
                {gap.adoptionRate}% of competitors offer this
              </p>
              <p className="mt-2 text-xs text-slate-600">
                Found in: {gap.competitorsWithFeature.join(", ")}
              </p>
              <div className="mt-3">
                <ConfidenceBadge score={gap.confidenceScore} type={gap.type} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
