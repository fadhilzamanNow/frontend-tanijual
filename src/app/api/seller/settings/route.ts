import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { json, handleApiError } from "@/lib/api-helpers";
import { verifyToken } from "@/lib/auth";

export const runtime = "nodejs";

// GET - Get seller settings
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const payload = await verifyToken(token);

    if (!payload || !payload.sub) {
      return json({ error: "Invalid token" }, { status: 401 });
    }

    const seller = await prisma.seller.findUnique({
      where: { id: payload.sub as string },
      select: {
        id: true,
        username: true,
        email: true,
        profilePhotoUrl: true,
        motto: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!seller) {
      return json({ error: "Seller not found" }, { status: 404 });
    }

    return json(seller);
  } catch (error) {
    return handleApiError(error);
  }
}

// PATCH - Update seller settings
export async function PATCH(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const payload = await verifyToken(token);

    if (!payload || !payload.sub) {
      return json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await req.json();
    const { motto, username, profilePhotoUrl } = body;

    // Validate inputs
    const updateData: any = {};

    if (motto !== undefined) {
      if (typeof motto !== "string") {
        return json({ error: "Motto must be a string" }, { status: 400 });
      }
      if (motto.length > 500) {
        return json(
          { error: "Motto cannot exceed 500 characters" },
          { status: 400 },
        );
      }
      updateData.motto = motto.trim() || null;
    }

    if (username !== undefined) {
      if (typeof username !== "string" || username.trim().length === 0) {
        return json({ error: "Username cannot be empty" }, { status: 400 });
      }
      updateData.username = username.trim();
    }

    if (profilePhotoUrl !== undefined) {
      if (profilePhotoUrl && typeof profilePhotoUrl !== "string") {
        return json(
          { error: "Profile photo URL must be a string" },
          { status: 400 },
        );
      }
      updateData.profilePhotoUrl = profilePhotoUrl || null;
    }

    if (Object.keys(updateData).length === 0) {
      return json({ error: "No fields to update" }, { status: 400 });
    }

    const updatedSeller = await prisma.seller.update({
      where: { id: payload.sub as string },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        profilePhotoUrl: true,
        motto: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return json(updatedSeller);
  } catch (error) {
    return handleApiError(error);
  }
}
