import { writeFile, unlink, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

// Local storage directory (public/uploads for Next.js)
const UPLOAD_DIR = join(process.cwd(), "public", "uploads");

/**
 * Ensure upload directory exists
 */
async function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
}

/**
 * Upload an image to local storage
 * @param file - File buffer
 * @param folder - Optional folder name
 * @param fileName - Optional custom file name
 * @returns Upload result with URL and key
 */
export async function uploadToLocal(
  file: Buffer,
  folder?: string,
  fileName?: string,
) {
  try {
    await ensureUploadDir();

    // Generate unique file name if not provided
    const uniqueFileName = fileName || `${uuidv4()}.jpg`;
    const key = folder ? `${folder}/${uniqueFileName}` : uniqueFileName;

    // Create folder if specified
    if (folder) {
      const folderPath = join(UPLOAD_DIR, folder);
      if (!existsSync(folderPath)) {
        await mkdir(folderPath, { recursive: true });
      }
    }

    // Determine content type from file buffer
    const contentType = getContentType(file);
    const ext = getExtensionFromContentType(contentType);
    const finalFileName = uniqueFileName.replace(/\.[^.]+$/, ext);
    const finalKey = folder ? `${folder}/${finalFileName}` : finalFileName;

    // Save file to local storage
    const filePath = join(UPLOAD_DIR, finalKey);
    await writeFile(filePath, file);

    // Construct the public URL (accessible via /uploads/...)
    const url = `/uploads/${finalKey}`;

    // Get image dimensions
    const dimensions = await getImageDimensions(file);

    return {
      url,
      key: finalKey,
      width: dimensions.width,
      height: dimensions.height,
      format: ext.replace(".", ""),
    };
  } catch (error) {
    console.error("Local storage upload error:", error);
    throw new Error("Failed to upload image to local storage");
  }
}

/**
 * Delete an image from local storage
 * @param key - The file key (path) to delete
 * @returns Deletion result
 */
export async function deleteFromLocal(key: string) {
  try {
    const filePath = join(UPLOAD_DIR, key);

    if (existsSync(filePath)) {
      await unlink(filePath);
    }

    return {
      success: true,
      key,
    };
  } catch (error) {
    console.error("Local storage delete error:", error);
    throw new Error("Failed to delete image from local storage");
  }
}

/**
 * Upload multiple images to local storage
 * @param files - Array of file buffers
 * @param folder - Optional folder name
 * @returns Array of upload results
 */
export async function uploadMultipleToLocal(files: Buffer[], folder?: string) {
  try {
    const uploadPromises = files.map((file) => uploadToLocal(file, folder));
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error("Local storage multiple upload error:", error);
    throw new Error("Failed to upload images to local storage");
  }
}

/**
 * Helper function to determine content type from buffer
 * @param buffer - File buffer
 * @returns Content type string
 */
function getContentType(buffer: Buffer): string {
  // Check file signature (magic numbers)
  const signature = buffer.toString("hex", 0, 4);

  if (signature.startsWith("ffd8ff")) {
    return "image/jpeg";
  } else if (signature.startsWith("89504e47")) {
    return "image/png";
  } else if (signature.startsWith("47494638")) {
    return "image/gif";
  } else if (signature.startsWith("52494646")) {
    // RIFF (WebP)
    return "image/webp";
  }

  // Default to jpeg
  return "image/jpeg";
}

/**
 * Get file extension from content type
 */
function getExtensionFromContentType(contentType: string): string {
  const map: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/jpg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif",
    "image/webp": ".webp",
  };

  return map[contentType] || ".jpg";
}

/**
 * Helper function to get basic image dimensions
 * @param buffer - File buffer
 * @returns Object with width and height
 */
async function getImageDimensions(
  buffer: Buffer,
): Promise<{ width: number; height: number }> {
  try {
    const contentType = getContentType(buffer);

    if (contentType === "image/jpeg") {
      return extractJPEGDimensions(buffer);
    } else if (contentType === "image/png") {
      return extractPNGDimensions(buffer);
    }

    return { width: 0, height: 0 };
  } catch (error) {
    console.error("Error getting image dimensions:", error);
    return { width: 0, height: 0 };
  }
}

/**
 * Extract dimensions from JPEG buffer
 */
function extractJPEGDimensions(buffer: Buffer): {
  width: number;
  height: number;
} {
  try {
    let offset = 2;
    while (offset < buffer.length) {
      const marker = buffer.readUInt16BE(offset);

      if (marker === 0xffc0 || marker === 0xffc2) {
        const height = buffer.readUInt16BE(offset + 5);
        const width = buffer.readUInt16BE(offset + 7);
        return { width, height };
      }

      offset += 2 + buffer.readUInt16BE(offset + 2);
    }
  } catch (error) {
    console.error("Error extracting JPEG dimensions:", error);
  }

  return { width: 0, height: 0 };
}

/**
 * Extract dimensions from PNG buffer
 */
function extractPNGDimensions(buffer: Buffer): {
  width: number;
  height: number;
} {
  try {
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    return { width, height };
  } catch (error) {
    console.error("Error extracting PNG dimensions:", error);
    return { width: 0, height: 0 };
  }
}
