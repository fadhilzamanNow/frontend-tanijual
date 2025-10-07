"use client";

import { useState } from "react";
import { useImageUpload } from "@/hooks/useImageUpload";
import Image from "next/image";

interface ImageUploadProps {
  folder?: string;
  onUploadSuccess?: (url: string, key: string) => void;
  maxSizeMB?: number;
  className?: string;
}

export default function ImageUpload({
  folder = "tanijual",
  onUploadSuccess,
  maxSizeMB = 5,
  className = "",
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const { upload, uploading, progress, error, result, reset } = useImageUpload({
    folder,
    maxSizeMB,
    onSuccess: (data) => {
      if (onUploadSuccess) {
        onUploadSuccess(data.url, data.key);
      }
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to S3
    await upload(file);
  };

  const handleRemove = () => {
    setPreview(null);
    reset();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      {!preview && !result && (
        <label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-10 h-10 mb-3 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="mb-2 text-sm text-slate-500">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-slate-500">
              PNG, JPG, JPEG or WebP (MAX. {maxSizeMB}MB)
            </p>
          </div>
          <input
            id="image-upload"
            type="file"
            className="hidden"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      )}

      {/* Preview & Progress */}
      {(preview || result) && (
        <div className="space-y-4">
          <div className="relative w-full h-64 bg-slate-100 rounded-lg overflow-hidden">
            {preview && (
              <Image
                src={result?.url || preview}
                alt="Preview"
                fill
                className="object-contain"
              />
            )}
            {!uploading && result && (
              <button
                onClick={handleRemove}
                className="absolute top-2 right-2 p-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition"
                type="button"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Success Message */}
          {result && !uploading && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <p className="text-sm text-emerald-700 font-medium">
                ✓ Image uploaded successfully!
              </p>
              <p className="text-xs text-emerald-600 mt-1 truncate">
                {result.url}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg">
          <p className="text-sm text-rose-700 font-medium">✗ Upload failed</p>
          <p className="text-xs text-rose-600 mt-1">{error}</p>
        </div>
      )}
    </div>
  );
}
