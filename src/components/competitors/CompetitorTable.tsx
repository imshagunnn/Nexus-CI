import type { Competitor } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConfidenceBadge } from "@/components/common/ConfidenceBadge";
import { ExternalLink } from "lucide-react";

interface CompetitorTableProps {
  competitors: Competitor[];
}

export function CompetitorTable({ competitors }: CompetitorTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Competitor Analysis</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left">
              <th className="pb-3 pr-4 font-medium text-slate-500">Competitor</th>
              <th className="pb-3 pr-4 font-medium text-slate-500">Pricing</th>
              <th className="pb-3 pr-4 font-medium text-slate-500">Audience</th>
              <th className="pb-3 pr-4 font-medium text-slate-500">Strengths</th>
              <th className="pb-3 font-medium text-slate-500">Weaknesses</th>
            </tr>
          </thead>
          <tbody>
            {competitors.map((competitor) => (
              <tr key={competitor.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-4 pr-4">
                  <div className="font-medium text-slate-900">{competitor.name}</div>
                  <a
                    href={competitor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 flex items-center gap-1 text-xs text-indigo-600 hover:underline"
                  >
                    {competitor.website.replace(/^https?:\/\//, "")}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <div className="mt-2">
                    <ConfidenceBadge score={competitor.confidenceScore} type={competitor.type} />
                  </div>
                </td>
                <td className="py-4 pr-4 text-slate-700">{competitor.pricing}</td>
                <td className="py-4 pr-4 text-slate-700">{competitor.targetAudience}</td>
                <td className="py-4 pr-4">
                  <ul className="space-y-1">
                    {competitor.strengths.map((s, i) => (
                      <li key={i} className="text-emerald-700">• {s}</li>
                    ))}
                  </ul>
                </td>
                <td className="py-4">
                  <ul className="space-y-1">
                    {competitor.weaknesses.map((w, i) => (
                      <li key={i} className="text-red-600">• {w}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
