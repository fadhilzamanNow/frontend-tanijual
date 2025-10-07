/**
 * Storage abstraction layer
 * Automatically uses local storage in development and S3 in production
 */

import { uploadToLocal, deleteFromLocal, uploadMultipleToLocal } from "./storage-local";
import { uploadToS3, deleteFromS3, uploadMultipleToS3 } from "./s3";

export interface UploadResult {
  url: string;
  key: string;
  width: number;
  height: number;
  format: string;
}

// Determine which storage to use based on environment
const isDevelopment = process.env.NODE_ENV === "development";
const useLocalStorage = isDevelopment && process.env.USE_LOCAL_STORAGE !== "false";

/**
 * Upload an image to storage (local in dev, S3 in production)
 * @param file - File buffer
 * @param folder - Optional folder name
 * @param fileName - Optional custom file name
 * @returns Upload result with URL and key
 */
export async function uploadImage(
  file: Buffer,
  folder?: string,
  fileName?: string,
): Promise<UploadResult> {
  if (useLocalStorage) {
    console.log("📁 Using local storage (development)");
    return uploadToLocal(file, folder, fileName);
  } else {
    console.log("☁️ Using AWS S3 (production)");
    return uploadToS3(file, folder, fileName);
  }
}

/**
 * Delete an image from storage
 * @param key - The key/path of the file to delete
 * @returns Deletion result
 */
export async function deleteImage(key: string) {
  if (useLocalStorage) {
    console.log("📁 Deleting from local storage (development)");
    return deleteFromLocal(key);
  } else {
    console.log("☁️ Deleting from AWS S3 (production)");
    return deleteFromS3(key);
  }
}

/**
 * Upload multiple images to storage
 * @param files - Array of file buffers
 * @param folder - Optional folder name
 * @returns Array of upload results
 */
export async function uploadMultipleImages(
  files: Buffer[],
  folder?: string,
): Promise<UploadResult[]> {
  if (useLocalStorage) {
    console.log("📁 Using local storage for multiple uploads (development)");
    return uploadMultipleToLocal(files, folder);
  } else {
    console.log("☁️ Using AWS S3 for multiple uploads (production)");
    return uploadMultipleToS3(files, folder);
  }
}

/**
 * Get current storage type
 * @returns "local" or "s3"
 */
export function getStorageType(): "local" | "s3" {
  return useLocalStorage ? "local" : "s3";
}

/**
 * Check if using local storage
 * @returns boolean
 */
export function isUsingLocalStorage(): boolean {
  return useLocalStorage;
}

// Export individual storage methods if needed
export {
  uploadToLocal,
  deleteFromLocal,
  uploadMultipleToLocal,
  uploadToS3,
  deleteFromS3,
  uploadMultipleToS3,
};
