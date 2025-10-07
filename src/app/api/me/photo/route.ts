import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleApiError, json, requireUserId } from "@/lib/api-helpers";
import { uploadImage, deleteImage } from "@/lib/storage";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const userId = await requireUserId(req);

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

    // Get current user to check for existing photo
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { profilePhotoUrl: true },
    });

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to storage (local in dev, S3 in prod)
    const result = await uploadImage(buffer, "avatars");

    // Delete old photo if exists
    if (currentUser?.profilePhotoUrl) {
      // Extract key from URL
      const oldUrl = currentUser.profilePhotoUrl;

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

    // Update user profile with new photo URL
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { profilePhotoUrl: result.url },
      select: {
        id: true,
        email: true,
        username: true,
        profilePhotoUrl: true,
      },
    });

    return json(updatedUser, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}
