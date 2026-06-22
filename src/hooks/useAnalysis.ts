"use client";

import { useCallback, useRef, useState } from "react";
import type { AnalysisInput, AnalyzeResponse } from "@/types";

export function useAnalysis() {
  const controllerRef = useRef<AbortController | null>(null);
  const [data, setData] = useState<AnalyzeResponse["data"]>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (input: AnalysisInput) => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 22000);

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
        signal: controller.signal,
        cache: "no-store",
      });

      const result = (await response.json()) as AnalyzeResponse;
      if (!response.ok || !result.success || !result.data) {
        throw new Error(result.error?.message ?? "Analysis failed. Please try again.");
      }

      setData(result.data);
      return result;
    } catch (requestError) {
      const message =
        requestError instanceof DOMException && requestError.name === "AbortError"
          ? "Analysis took too long. Please try again."
          : requestError instanceof Error
            ? requestError.message
            : "Analysis failed. Please try again.";
      setError(message);
      throw requestError;
    } finally {
      window.clearTimeout(timeout);
      if (controllerRef.current === controller) {
        controllerRef.current = null;
        setIsLoading(false);
      }
    }
  }, []);

  const reset = useCallback(() => {
    controllerRef.current?.abort();
    controllerRef.current = null;
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    analyze,
    data: data ?? null,
    isLoading,
    error,
    reset,
  };
}
