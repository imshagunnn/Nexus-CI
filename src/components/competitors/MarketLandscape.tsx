import type { MarketLandscape } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Rocket, DollarSign, Building2 } from "lucide-react";

interface MarketLandscapeOverviewProps {
  landscape: MarketLandscape;
}

const segments = [
  { key: "marketLeaders" as const, label: "Market Leaders", icon: Crown, color: "border-amber-200 bg-amber-50" },
  { key: "emergingPlayers" as const, label: "Emerging Players", icon: Rocket, color: "border-blue-200 bg-blue-50" },
  { key: "budgetPlayers" as const, label: "Budget Players", icon: DollarSign, color: "border-emerald-200 bg-emerald-50" },
  { key: "enterprisePlayers" as const, label: "Enterprise Players", icon: Building2, color: "border-purple-200 bg-purple-50" },
];

export function MarketLandscapeOverview({ landscape }: MarketLandscapeOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Landscape Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {segments.map(({ key, label, icon: Icon, color }) => (
            <div key={key} className={`rounded-lg border p-4 ${color}`}>
              <div className="mb-3 flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <h4 className="font-medium text-slate-900">{label}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {landscape[key].length > 0 ? (
                  landscape[key].map((name) => (
                    <span key={name} className="rounded-full bg-white px-3 py-1 text-sm text-slate-700 shadow-sm">
                      {name}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-500">None identified</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
