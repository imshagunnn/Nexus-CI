import type { Lead } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ConfidenceBadge } from "@/components/common/ConfidenceBadge";
import { ExternalLink } from "lucide-react";

interface LeadTableProps {
  leads: Lead[];
}

export function LeadTable({ leads }: LeadTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead Generation</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left">
              <th className="pb-3 pr-4 font-medium text-slate-500">Company</th>
              <th className="pb-3 pr-4 font-medium text-slate-500">Industry</th>
              <th className="pb-3 pr-4 font-medium text-slate-500">Size</th>
              <th className="pb-3 pr-4 font-medium text-slate-500">Location</th>
              <th className="pb-3 pr-4 font-medium text-slate-500">Contact</th>
              <th className="pb-3 pr-4 font-medium text-slate-500">Title</th>
              <th className="pb-3 font-medium text-slate-500">Score</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <tr key={lead.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-900">{lead.companyName}</span>
                    {index < 5 && <Badge variant="success">Top {index + 1}</Badge>}
                  </div>
                  <a
                    href={lead.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 flex items-center gap-1 text-xs text-indigo-600 hover:underline"
                  >
                    {lead.website.replace(/^https?:\/\//, "")}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </td>
                <td className="py-4 pr-4 text-slate-700">{lead.industry}</td>
                <td className="py-4 pr-4 text-slate-700">{lead.employeeSize}</td>
                <td className="py-4 pr-4 text-slate-700">{lead.location}</td>
                <td className="py-4 pr-4">
                  <a
                    href={lead.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    {lead.contactPerson}
                  </a>
                </td>
                <td className="py-4 pr-4 text-slate-700">{lead.jobTitle}</td>
                <td className="py-4">
                  <div className="space-y-2">
                    <Badge variant={lead.valueScore >= 85 ? "success" : "secondary"}>
                      Value: {lead.valueScore}
                    </Badge>
                    <ConfidenceBadge score={lead.confidenceScore} type={lead.type} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
