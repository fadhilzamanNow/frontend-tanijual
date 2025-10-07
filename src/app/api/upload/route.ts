import { NextRequest, NextResponse } from "next/server";
import { uploadImage, getStorageType } from "@/lib/storage";
import { json, handleApiError } from "@/lib/api-helpers";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const folder = formData.get("folder") as string | null;

    if (!file) {
      return json(
        { error: "No file provided", message: "Please upload a file" },
        { status: 400 },
      );
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return json(
        {
          error: "Invalid file type",
          message: "Only JPEG, PNG, and WebP images are allowed",
        },
        { status: 400 },
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return json(
        {
          error: "File too large",
          message: "File size must be less than 5MB",
        },
        { status: 400 },
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to storage (local in dev, S3 in production)
    const result = await uploadImage(buffer, folder || undefined);

    console.log(`✅ Image uploaded using ${getStorageType()} storage`);

    return json(
      {
        success: true,
        data: {
          url: result.url,
          key: result.key,
          width: result.width,
          height: result.height,
          format: result.format,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
