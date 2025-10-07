import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { json, handleApiError } from "@/lib/api-helpers";
import { verifyToken } from "@/lib/auth";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

// POST/PATCH - Change seller password
export async function POST(req: NextRequest) {
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
    const { currentPassword, newPassword } = body;

    // Validate inputs
    if (!currentPassword || !newPassword) {
      return json(
        { error: "Current password and new password are required" },
        { status: 400 },
      );
    }

    if (
      typeof currentPassword !== "string" ||
      typeof newPassword !== "string"
    ) {
      return json({ error: "Passwords must be strings" }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return json(
        { error: "New password must be at least 6 characters long" },
        { status: 400 },
      );
    }

    if (currentPassword === newPassword) {
      return json(
        { error: "New password must be different from current password" },
        { status: 400 },
      );
    }

    // Get seller from database
    const seller = await prisma.seller.findUnique({
      where: { id: payload.sub as string },
      select: {
        id: true,
        password: true,
      },
    });

    if (!seller) {
      return json({ error: "Seller not found" }, { status: 404 });
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      seller.password,
    );

    if (!isPasswordValid) {
      return json({ error: "Current password is incorrect" }, { status: 401 });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in database
    await prisma.seller.update({
      where: { id: payload.sub as string },
      data: { password: hashedPassword },
    });

    return json({ message: "Password changed successfully" });
  } catch (error) {
    return handleApiError(error);
  }
}

// PATCH - Change seller password (alias for POST)
export async function PATCH(req: NextRequest) {
  return POST(req);
}
