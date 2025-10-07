import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleApiError, json, requireUserId } from "@/lib/api-helpers";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

export async function PATCH(req: NextRequest) {
  try {
    const userId = await requireUserId(req);

    const body = await req.json();
    const { currentPassword, newPassword } = body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return json(
        {
          error: "Missing required fields",
          message: "Current password and new password are required",
        },
        { status: 400 },
      );
    }

    // Validate new password length
    if (newPassword.length < 6) {
      return json(
        {
          error: "Invalid password",
          message: "New password must be at least 6 characters long",
        },
        { status: 400 },
      );
    }

    // Get current user with password
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, password: true },
    });

    if (!user) {
      return json(
        { error: "User not found", message: "User account does not exist" },
        { status: 404 },
      );
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isPasswordValid) {
      return json(
        {
          error: "Invalid password",
          message: "Current password is incorrect",
        },
        { status: 401 },
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return json(
      {
        success: true,
        message: "Password updated successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
