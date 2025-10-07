import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleApiError, json } from "@/lib/api-helpers";
import { verifyToken } from "@/lib/auth";
import { uploadImage, deleteImage } from "@/lib/storage";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    // Verify authentication
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const payload = await verifyToken(token);

    if (!payload || !payload.sub) {
      return json({ error: "Invalid token" }, { status: 401 });
    }

    const sellerId = payload.sub as string;

    // Get the uploaded file
    const formData = await req.formData();
    const file = formData.get("photo") as File;

    if (!file) {
      return json(
        { error: "No file provided", message: "Please upload a photo" },
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

    // Get current seller to check for existing photo
    const currentSeller = await prisma.seller.findUnique({
      where: { id: sellerId },
      select: { profilePhotoUrl: true },
    });

    if (!currentSeller) {
      return json({ error: "Seller not found" }, { status: 404 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to storage (local in dev, S3 in prod)
    const result = await uploadImage(buffer, "avatars");

    // Delete old photo if exists
    if (currentSeller.profilePhotoUrl) {
      const oldUrl = currentSeller.profilePhotoUrl;

      // If it's a local URL (/uploads/...)
      if (oldUrl.startsWith("/uploads/")) {
        const key = oldUrl.replace("/uploads/", "");
        await deleteImage(key).catch((err) => {
          console.error("Failed to delete old photo:", err);
        });
      }
      // If it's an S3 URL (contains amazonaws.com)
      else if (oldUrl.includes("amazonaws.com")) {
        const urlParts = oldUrl.split("/");
        const key = urlParts.slice(-2).join("/"); // Get last two parts (folder/filename)
        await deleteImage(key).catch((err) => {
          console.error("Failed to delete old photo:", err);
        });
      }
    }

    // Update seller profile with new photo URL
    const updatedSeller = await prisma.seller.update({
      where: { id: sellerId },
      data: { profilePhotoUrl: result.url },
      select: {
        id: true,
        email: true,
        username: true,
        profilePhotoUrl: true,
        motto: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return json(updatedSeller, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}
