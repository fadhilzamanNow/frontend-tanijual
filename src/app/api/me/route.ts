import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleApiError, json, requireUserId } from "@/lib/api-helpers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const userId = await requireUserId(req);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, username: true, profilePhotoUrl: true },
    });

    if (!user)
      return json(
        { error: "User not found", message: "User account does not exist" },
        { status: 404 },
      );
    return json(user);
  } catch (error) {
    return handleApiError(error);
  }
}
