"use client";

import { useLoading } from "@/contexts/LoadingContext";
import { useCallback } from "react";

export function useLoadingFetch() {
  const { startLoading, stopLoading } = useLoading();

  const fetchWithLoading = useCallback(
    async <T>(
      fetchFn: () => Promise<T>,
      options?: { showLoading?: boolean }
    ): Promise<T> => {
      const shouldShowLoading = options?.showLoading !== false;

      try {
        if (shouldShowLoading) {
          startLoading();
        }
        const result = await fetchFn();
        return result;
      } finally {
        if (shouldShowLoading) {
          // Add a small delay to prevent flickering for fast requests
          setTimeout(() => {
            stopLoading();
          }, 300);
        }
      }
    },
    [startLoading, stopLoading]
  );

  return { fetchWithLoading };
}
