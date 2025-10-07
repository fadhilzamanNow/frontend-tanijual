import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { json, handleApiError } from "@/lib/api-helpers";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  { params }: { params: { sellerId: string } },
) {
  try {
    const { sellerId } = params;

    const seller = await prisma.seller.findUnique({
      where: { id: sellerId },
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
