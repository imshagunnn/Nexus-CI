import type { InsightType } from "@/types";
import { Badge } from "@/components/ui/badge";
import { formatConfidence } from "@/lib/utils";
import { CheckCircle2, Brain, HelpCircle } from "lucide-react";

interface ConfidenceBadgeProps {
  score: number;
  type: InsightType;
  className?: string;
}

const typeConfig: Record<InsightType, { variant: "success" | "default" | "warning"; icon: typeof CheckCircle2 }> = {
  "Verified Information": { variant: "success", icon: CheckCircle2 },
  "AI Inference": { variant: "default", icon: Brain },
  Assumption: { variant: "warning", icon: HelpCircle },
};

export function ConfidenceBadge({ score, type, className }: ConfidenceBadgeProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className ?? ""}`}>
      <Badge variant="secondary">Confidence: {formatConfidence(score)}</Badge>
      <Badge variant={config.variant}>
        <Icon className="mr-1 h-3 w-3" />
        {type}
      </Badge>
    </div>
  );
}
