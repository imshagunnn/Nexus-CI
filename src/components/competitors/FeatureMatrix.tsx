import type { Competitor } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";

interface FeatureMatrixProps {
  competitors: Competitor[];
  productName: string;
  productFeatures: string[];
}

export function FeatureMatrix({ competitors, productName, productFeatures }: FeatureMatrixProps) {
  const allFeatures = Array.from(
    new Set([...productFeatures, ...competitors.flatMap((c) => c.features)])
  ).slice(0, 10);

  const displayCompetitors = competitors.slice(0, 4);

  function hasFeature(entity: { features: string[] }, feature: string): boolean {
    return entity.features.some(
      (f) => f.toLowerCase().includes(feature.toLowerCase().split(" ")[0]) ||
        feature.toLowerCase().includes(f.toLowerCase().split(" ")[0])
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Comparison Matrix</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="pb-3 pr-4 text-left font-medium text-slate-500">Feature</th>
              <th className="pb-3 px-3 text-center font-medium text-indigo-600">{productName}</th>
              {displayCompetitors.map((c) => (
                <th key={c.id} className="pb-3 px-3 text-center font-medium text-slate-500">
                  {c.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allFeatures.map((feature) => (
              <tr key={feature} className="border-b border-slate-100">
                <td className="py-3 pr-4 font-medium text-slate-700">{feature}</td>
                <td className="px-3 py-3 text-center">
                  {hasFeature({ features: productFeatures }, feature) ? (
                    <Check className="mx-auto h-5 w-5 text-emerald-500" />
                  ) : (
                    <X className="mx-auto h-5 w-5 text-slate-300" />
                  )}
                </td>
                {displayCompetitors.map((c) => (
                  <td key={c.id} className="px-3 py-3 text-center">
                    {hasFeature(c, feature) ? (
                      <Check className="mx-auto h-5 w-5 text-emerald-500" />
                    ) : (
                      <X className="mx-auto h-5 w-5 text-slate-300" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
