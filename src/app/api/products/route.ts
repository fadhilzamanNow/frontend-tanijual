import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { json, handleApiError } from "@/lib/api-helpers";
import { productCreateSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sellerId = searchParams.get("sellerId");
    const categoryId = searchParams.get("categoryId");
    const search = searchParams.get("search");
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!, 10)
      : undefined;
    const offset = searchParams.get("offset")
      ? parseInt(searchParams.get("offset")!, 10)
      : undefined;

    const where: any = {};
    if (sellerId) where.sellerId = sellerId;
    if (categoryId) where.categoryId = categoryId;
    if (search) {
      where.name = {
        contains: search,
        mode: "insensitive",
      };
    }

    const products = await prisma.product.findMany({
      where,
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
            motto: true,
          },
        },
        category: true,
      },
      orderBy: { createdAt: "desc" },
      ...(limit !== undefined ? { take: limit } : {}),
      ...(offset !== undefined ? { skip: offset } : {}),
    });
    return json(products);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = productCreateSchema.parse(body);

    const seller = await prisma.seller.findUnique({
      where: { id: data.sellerId },
    });
    if (!seller) return json({ error: "Seller not found" }, { status: 404 });

    const created = await prisma.product.create({ data });
    return json(created, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
