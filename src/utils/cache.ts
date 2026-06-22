import type { AnalysisReport } from "@/types";
import { createHash } from "crypto";

const cache = new Map<string, { data: AnalysisReport; expiresAt: number }>();
const CACHE_TTL_MS = 30 * 60 * 1000;

export function getCacheKey(input: {
  productIdea: string;
  websiteUrl?: string;
  companyName?: string;
}): string {
  const raw = JSON.stringify({
    productIdea: input.productIdea.toLowerCase().trim(),
    websiteUrl: input.websiteUrl?.toLowerCase().trim() ?? "",
    companyName: input.companyName?.toLowerCase().trim() ?? "",
  });
  return createHash("sha256").update(raw).digest("hex");
}

export function getFromCache(key: string): AnalysisReport | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

export function setCache(key: string, data: AnalysisReport): void {
  cache.set(key, { data, expiresAt: Date.now() + CACHE_TTL_MS });
}
