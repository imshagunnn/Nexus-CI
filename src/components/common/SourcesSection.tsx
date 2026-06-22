import type { SourceReference } from "@/types";
import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SourcesSectionProps {
  sources: SourceReference[];
}

export function SourcesSection({ sources }: SourcesSectionProps) {
  if (sources.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sources & References</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {sources.map((source) => (
            <li key={source.id} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-slate-900">{source.title}</p>
                <p className="text-xs text-slate-500">
                  Accessed {new Date(source.accessedAt).toLocaleDateString()}
                </p>
              </div>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800"
              >
                Visit <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
