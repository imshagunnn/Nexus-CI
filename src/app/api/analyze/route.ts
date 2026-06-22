import { NextRequest, NextResponse } from "next/server";
import { analyzeCompetitors } from "@/services/competitorService";
import { analysisInputSchema, sanitizeInput } from "@/utils/validation";
import { getCacheKey, getFromCache, setCache } from "@/utils/cache";

export const maxDuration = 20;

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: { code: "INVALID_JSON", message: "Invalid request body" } },
        { status: 400 }
      );
    }

    const parsed = analysisInputSchema.safeParse(body);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Invalid input";
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION_ERROR", message } },
        { status: 400 }
      );
    }

    const input = {
      productIdea: sanitizeInput(parsed.data.productIdea),
      websiteUrl: parsed.data.websiteUrl ? sanitizeInput(parsed.data.websiteUrl) : undefined,
      companyName: parsed.data.companyName ? sanitizeInput(parsed.data.companyName) : undefined,
    };

    if (!input.productIdea) {
      return NextResponse.json(
        { success: false, error: { code: "EMPTY_INPUT", message: "Please describe your startup idea" } },
        { status: 400 }
      );
    }

    const cacheKey = getCacheKey(input);
    const cached = getFromCache(cacheKey);
    if (cached) {
      return NextResponse.json({ success: true, data: cached });
    }

    const report = await Promise.race([
      analyzeCompetitors(input),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("TIMEOUT")), 18000)
      ),
    ]);

    setCache(cacheKey, report);

    return NextResponse.json({ success: true, data: report });
  } catch (error) {
    const message =
      error instanceof Error && error.message === "TIMEOUT"
        ? "Analysis timed out. Please try again with a shorter description."
        : "Unable to complete analysis. Please try again later.";

    const code =
      error instanceof Error && error.message === "TIMEOUT" ? "TIMEOUT" : "API_FAILURE";

    return NextResponse.json(
      { success: false, error: { code, message } },
      { status: code === "TIMEOUT" ? 504 : 500 }
    );
  }
}
