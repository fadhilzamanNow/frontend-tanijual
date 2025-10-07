import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  type PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

// Configure S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || "";

/**
 * Upload an image to AWS S3
 * @param file - File buffer
 * @param folder - Optional folder name in S3
 * @param fileName - Optional custom file name
 * @returns Upload result with URL and key
 */
export async function uploadToS3(
  file: Buffer,
  folder?: string,
  fileName?: string,
) {
  try {
    // Generate unique file name if not provided
    const uniqueFileName = fileName || `${uuidv4()}.jpg`;
    const key = folder ? `${folder}/${uniqueFileName}` : uniqueFileName;

    // Determine content type from file buffer
    const contentType = getContentType(file);

    const params: PutObjectCommandInput = {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: file,
      ContentType: contentType,
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    // Construct the public URL
    const url = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION || "us-east-1"}.amazonaws.com/${key}`;

    // Get image dimensions (basic implementation)
    const dimensions = await getImageDimensions(file);

    return {
      url,
      key,
      width: dimensions.width,
      height: dimensions.height,
      format: contentType.split("/")[1] || "jpg",
    };
  } catch (error) {
    console.error("S3 upload error:", error);
    throw new Error("Failed to upload image to S3");
  }
}

/**
 * Delete an image from AWS S3
 * @param key - The S3 key (path) of the file to delete
 * @returns Deletion result
 */
export async function deleteFromS3(key: string) {
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: key,
    };

    const command = new DeleteObjectCommand(params);
    const result = await s3Client.send(command);

    return {
      success: true,
      key,
      result,
    };
  } catch (error) {
    console.error("S3 delete error:", error);
    throw new Error("Failed to delete image from S3");
  }
}

/**
 * Upload multiple images to AWS S3
 * @param files - Array of file buffers
 * @param folder - Optional folder name in S3
 * @returns Array of upload results
 */
export async function uploadMultipleToS3(files: Buffer[], folder?: string) {
  try {
    const uploadPromises = files.map((file) => uploadToS3(file, folder));
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error("S3 multiple upload error:", error);
    throw new Error("Failed to upload images to S3");
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
 * Helper function to get basic image dimensions
 * @param buffer - File buffer
 * @returns Object with width and height
 */
async function getImageDimensions(
  buffer: Buffer,
): Promise<{ width: number; height: number }> {
  // Basic implementation - returns default values
  // For production, consider using a library like 'sharp' or 'image-size'
  try {
    const contentType = getContentType(buffer);

    if (contentType === "image/jpeg") {
      // Simple JPEG dimension extraction
      return extractJPEGDimensions(buffer);
    } else if (contentType === "image/png") {
      // Simple PNG dimension extraction
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

export { s3Client };
