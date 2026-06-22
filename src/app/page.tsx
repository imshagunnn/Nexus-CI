"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  LineChart,
  Search,
  Shield,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
const features = [
  {
    icon: Target,
    title: "Competitor Analysis",
    description: "Discover 5+ competitors with pricing, features, strengths, and positioning maps.",
  },
  {
    icon: Users,
    title: "Lead Generation",
    description: "Find high-value target companies with decision-maker contacts and confidence scores.",
  },
  {
    icon: Brain,
    title: "AI Recommendations",
    description: "Get prioritized feature roadmaps, market opportunities, and risk assessments.",
  },
  {
    icon: BarChart3,
    title: "Visual Analytics",
    description: "Interactive charts for pricing, positioning, feature gaps, and lead ranking.",
  },
];

const benefits = [
  "Save 40+ hours of manual competitive research",
  "Actionable insights with confidence scores",
  "Export reports as PDF or CSV",
  "Works offline with intelligent mock data fallback",
];

export default function LandingPage() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [website, setWebsite] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");

  function handleAnalyze() {
    setError("");
    if (!input.trim() || input.trim().length < 3) {
      setError("Please describe your startup idea (at least 3 characters)");
      return;
    }
    if (website.trim()) {
      try {
        const candidate = website.startsWith("http") ? website : `https://${website}`;
        const url = new URL(candidate);
        if (!["http:", "https:"].includes(url.protocol) || !url.hostname.includes(".")) {
          throw new Error("Invalid URL");
        }
      } catch {
        setError("Please enter a valid website URL, for example https://yourstartup.com");
        return;
      }
    }

    const params = new URLSearchParams({
      idea: input.trim(),
      ...(website.trim() && { website: website.trim() }),
      ...(company.trim() && { company: company.trim() }),
    });

    router.push(`/dashboard?${params.toString()}`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-indigo-50/30">
      {/* Nav */}
      <nav className="border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">Nexus CI</span>
          </div>
          <Button variant="outline" size="sm" onClick={() => document.getElementById("analyze")?.scrollIntoView({ behavior: "smooth" })}>
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm text-indigo-700">
            <Zap className="h-3.5 w-3.5" />
            Competitor Intelligence & Lead Discovery
          </div>
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Turn Your Idea Into{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Actionable Intelligence
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Analyze competitors, discover leads, and get AI-powered recommendations — all in one platform built for founders.
          </p>
        </div>

        {/* Input Box */}
        <div id="analyze" className="mx-auto mt-12 max-w-2xl">
          <Card className="border-indigo-100 shadow-lg shadow-indigo-100/50">
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Describe your startup or enter a website
                </label>
                <Textarea
                  placeholder="e.g. AI-powered project management tool for remote teams..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Website URL (optional)</label>
                  <Input
                    placeholder="https://yourstartup.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Company Name (optional)</label>
                  <Input
                    placeholder="Your Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button size="lg" className="w-full" onClick={handleAnalyze}>
                <Search className="h-4 w-4" />
                Analyze
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-3xl font-bold text-slate-900">Everything You Need</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
          Four powerful modules to accelerate your go-to-market strategy
        </p>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="transition-transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                  <feature.icon className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Demo Preview */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Card className="overflow-hidden border-slate-200 bg-slate-900">
          <CardContent className="p-0">
            <div className="border-b border-slate-700 px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-3 text-sm text-slate-400">Nexus CI Dashboard Preview</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-4">
              {[
                { label: "Competitors", value: "7", color: "text-indigo-400" },
                { label: "Opportunities", value: "5", color: "text-amber-400" },
                { label: "Features", value: "5", color: "text-purple-400" },
                { label: "High-Value Leads", value: "8", color: "text-emerald-400" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg bg-slate-800 p-4 text-center">
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="mt-1 text-xs text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-4 px-6 pb-6 lg:grid-cols-2">
              <div className="rounded-lg bg-slate-800 p-4">
                <div className="mb-3 flex items-center gap-2 text-sm text-slate-300">
                  <LineChart className="h-4 w-4" /> Pricing Comparison
                </div>
                <div className="flex h-32 items-end gap-2">
                  {[40, 65, 55, 80, 45, 70, 35].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-indigo-500/60"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="rounded-lg bg-slate-800 p-4">
                <div className="mb-3 flex items-center gap-2 text-sm text-slate-300">
                  <Shield className="h-4 w-4" /> Founder Decisions
                </div>
                <div className="space-y-2">
                  {["What should I build next?", "Biggest competitor threat?", "Best leads to contact?"].map((q) => (
                    <div key={q} className="rounded bg-slate-700/50 px-3 py-2 text-xs text-slate-300">
                      {q}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-2xl bg-indigo-600 px-8 py-12 text-center text-white">
          <h2 className="text-3xl font-bold">Why Founders Choose Nexus CI</h2>
          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 text-left">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-indigo-200" />
                <span className="text-sm text-indigo-100">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-3xl font-bold text-slate-900">Ready to Outsmart Your Competition?</h2>
        <p className="mt-3 text-slate-600">Get your full competitive intelligence report in seconds.</p>
        <Button size="lg" className="mt-8" onClick={() => document.getElementById("analyze")?.scrollIntoView({ behavior: "smooth" })}>
          Start Free Analysis
          <ArrowRight className="h-4 w-4" />
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-500">
        <p>Nexus CI — Competitor Intelligence & Lead Discovery Platform</p>
        <p className="mt-1">Built for the Nexus Internship Assignment</p>
      </footer>
    </div>
  );
}
