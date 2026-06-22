import { z } from "zod";

export const analysisInputSchema = z.object({
  productIdea: z
    .string()
    .min(3, "Please describe your startup idea (at least 3 characters)")
    .max(2000, "Description is too long (max 2000 characters)")
    .transform((val) => val.trim()),
  websiteUrl: z
    .string()
    .optional()
    .transform((val) => (val?.trim() ? val.trim() : undefined))
    .refine(
      (val) => {
        if (!val) return true;
        try {
          const url = new URL(val.startsWith("http") ? val : `https://${val}`);
          return ["http:", "https:"].includes(url.protocol);
        } catch {
          return false;
        }
      },
      { message: "Please enter a valid website URL" }
    ),
  companyName: z
    .string()
    .optional()
    .transform((val) => (val?.trim() ? val.trim() : undefined)),
});

export type AnalysisInputForm = z.infer<typeof analysisInputSchema>;

export function sanitizeInput(input: string): string {
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/javascript:/gi, "")
    .trim();
}

export function normalizeUrl(url?: string): string | undefined {
  if (!url) return undefined;
  const sanitized = sanitizeInput(url);
  if (!sanitized) return undefined;
  return sanitized.startsWith("http") ? sanitized : `https://${sanitized}`;
}
