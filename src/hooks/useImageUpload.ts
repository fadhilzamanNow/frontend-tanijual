"use client";

import { useState } from "react";

export interface UploadResult {
  url: string;
  key: string;
  width: number;
  height: number;
  format: string;
}

export interface UseImageUploadOptions {
  folder?: string;
  maxSizeMB?: number;
  onSuccess?: (result: UploadResult) => void;
  onError?: (error: Error) => void;
}

export function useImageUpload(options?: UseImageUploadOptions) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<UploadResult | null>(null);

  const upload = async (file: File): Promise<UploadResult | null> => {
    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        throw new Error("Only JPEG, PNG, and WebP images are allowed");
      }

      // Validate file size
      const maxSize = (options?.maxSizeMB || 5) * 1024 * 1024;
      if (file.size > maxSize) {
        throw new Error(
          `File size must be less than ${options?.maxSizeMB || 5}MB`,
        );
      }

      // Create form data
      const formData = new FormData();
      formData.append("file", file);
      if (options?.folder) {
        formData.append("folder", options.folder);
      }

      // Simulate progress
      setProgress(30);

      // Upload to API
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      setProgress(70);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to upload image");
      }

      const data = await response.json();
      setProgress(100);
      setResult(data.data);

      if (options?.onSuccess) {
        options.onSuccess(data.data);
      }

      return data.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to upload image";
      setError(errorMessage);

      if (options?.onError) {
        options.onError(err instanceof Error ? err : new Error(errorMessage));
      }

      return null;
    } finally {
      setUploading(false);
    }
  };

  const uploadMultiple = async (files: File[]): Promise<UploadResult[]> => {
    const results: UploadResult[] = [];

    for (const file of files) {
      const result = await upload(file);
      if (result) {
        results.push(result);
      }
    }

    return results;
  };

  const reset = () => {
    setUploading(false);
    setProgress(0);
    setError(null);
    setResult(null);
  };

  return {
    upload,
    uploadMultiple,
    uploading,
    progress,
    error,
    result,
    reset,
  };
}
