import type { FounderDecision } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConfidenceBadge } from "@/components/common/ConfidenceBadge";
import { ArrowRight } from "lucide-react";

interface FounderDashboardProps {
  decisions: FounderDecision[];
}

export function FounderDashboard({ decisions }: FounderDashboardProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900">Founder Dashboard</h2>
      <p className="text-sm text-slate-500">Executive summary — your key decisions at a glance</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {decisions.map((decision, index) => (
          <Card
            key={decision.id}
            className="animate-in fade-in slide-in-from-bottom-2 duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader>
              <CardTitle className="text-base">{decision.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed text-slate-700">{decision.answer}</p>
              <ul className="space-y-2">
                {decision.actionItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <ConfidenceBadge score={decision.confidenceScore} type={decision.type} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
