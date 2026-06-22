"use client";

import type { Competitor } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
  Cell,
  Label,
} from "recharts";

interface PricingChartProps {
  competitors: Competitor[];
  productName: string;
}

function parsePricing(pricing: string): number {
  const match = pricing.match(/\$(\d+)/);
  return match ? parseInt(match[1], 10) : 50;
}

const COLORS = ["#6366f1", "#8b5cf6", "#a78bfa", "#c4b5fd", "#818cf8", "#4f46e5", "#7c3aed"];

export function PricingComparisonChart({ competitors, productName }: PricingChartProps) {
  const data = [
    { name: productName, price: 29, isUs: true },
    ...competitors.map((c) => ({
      name: c.name,
      price: parsePricing(c.pricing),
      isUs: false,
    })),
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11 }}
                angle={-35}
                textAnchor="end"
                interval={0}
                height={80}
              />
              <YAxis tick={{ fontSize: 12 }} label={{ value: "Starting Price ($/mo)", angle: -90, position: "insideLeft", style: { fontSize: 11 } }} />
              <Tooltip formatter={(value) => [`$${value}/mo`, "Starting Price"]} />
              <Bar dataKey="price" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={entry.isUs ? "#10b981" : COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

interface PositioningChartProps {
  competitors: Competitor[];
  productName: string;
}

export function PositioningChart({ competitors, productName }: PositioningChartProps) {
  const data = [
    { name: productName, x: 85, y: 70, z: 200, isUs: true },
    ...competitors.map((c) => ({
      name: c.name,
      x: c.positioning.easeOfUse,
      y: c.positioning.featureRichness,
      z: 150,
      isUs: false,
    })),
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Competitor Positioning</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-2 text-xs text-slate-500">X: Ease of Use · Y: Feature Richness</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" dataKey="x" name="Ease of Use" domain={[0, 100]} tick={{ fontSize: 11 }}>
                <Label value="Ease of Use" offset={-10} position="insideBottom" style={{ fontSize: 12 }} />
              </XAxis>
              <YAxis type="number" dataKey="y" name="Feature Richness" domain={[0, 100]} tick={{ fontSize: 11 }}>
                <Label value="Feature Richness" angle={-90} position="insideLeft" style={{ fontSize: 12 }} />
              </YAxis>
              <ZAxis type="number" dataKey="z" range={[80, 400]} />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                content={({ payload }) => {
                  if (!payload?.[0]) return null;
                  const d = payload[0].payload;
                  return (
                    <div className="rounded-lg border bg-white p-2 shadow-md text-sm">
                      <p className="font-medium">{d.name}</p>
                      <p className="text-slate-500">Ease: {d.x} · Features: {d.y}</p>
                    </div>
                  );
                }}
              />
              <Scatter data={data} fill="#6366f1">
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={entry.isUs ? "#10b981" : COLORS[index % COLORS.length]} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex flex-wrap gap-3">
          {data.map((d) => (
            <span key={d.name} className="flex items-center gap-1.5 text-xs text-slate-600">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: d.isUs ? "#10b981" : COLORS[data.indexOf(d) % COLORS.length] }}
              />
              {d.name}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
