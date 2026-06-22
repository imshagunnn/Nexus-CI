"use client";

import type { Lead } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface LeadRankingProps {
  leads: Lead[];
}

export function LeadRanking({ leads }: LeadRankingProps) {
  const ranked = [...leads].sort((a, b) => b.valueScore - a.valueScore);
  const top5 = ranked.slice(0, 5);
  const chartData = top5.map((l) => ({
    name: l.companyName,
    value: l.valueScore,
    confidence: l.confidenceScore,
  }));

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Lead Ranking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart data={chartData} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} name="Value Score" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top 5 Highest Value Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-4">
            {top5.map((lead, index) => (
              <li key={lead.id} className="flex items-start gap-4 rounded-lg border border-slate-100 p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{lead.companyName}</p>
                  <p className="text-sm text-slate-500">
                    {lead.contactPerson} · {lead.jobTitle}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {lead.industry} · {lead.location} · Score: {lead.valueScore}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
