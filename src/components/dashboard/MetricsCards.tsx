import type { DashboardMetrics } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Lightbulb, Sparkles, Users } from "lucide-react";

interface MetricsCardsProps {
  metrics: DashboardMetrics;
}

const cards = [
  { key: "competitorsFound" as const, label: "Competitors Found", icon: Target, color: "text-indigo-600 bg-indigo-50" },
  { key: "opportunitiesFound" as const, label: "Opportunities Found", icon: Lightbulb, color: "text-amber-600 bg-amber-50" },
  { key: "recommendedFeatures" as const, label: "Recommended Features", icon: Sparkles, color: "text-purple-600 bg-purple-50" },
  { key: "highValueLeads" as const, label: "High Value Leads", icon: Users, color: "text-emerald-600 bg-emerald-50" },
];

export function MetricsCards({ metrics }: MetricsCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ key, label, icon: Icon, color }) => (
        <Card key={key} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">{label}</CardTitle>
            <div className={`rounded-lg p-2 ${color}`}>
              <Icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-900">{metrics[key]}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
