import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleApiError, json, requireSellerId } from "@/lib/api-helpers";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const sellerId = await requireSellerId(req);
    const products = await prisma.product.findMany({
      where: { sellerId },
      include: {
        images: {
          orderBy: { order: "asc" },
        },
        seller: {
          select: {
            id: true,
            username: true,
            email: true,
            profilePhotoUrl: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return json(products);
  } catch (error) {
    return handleApiError(error);
  }
}
