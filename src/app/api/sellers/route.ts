import { prisma } from "@/lib/prisma";
import { json, handleApiError } from "@/lib/api-helpers";

export const runtime = "nodejs";

export async function GET() {
  try {
    const sellers = await prisma.seller.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        profilePhotoUrl: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return json(sellers);
  } catch (error) {
    return handleApiError(error);
  }
}
