import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { savedAddItemSchema } from "@/lib/validators";
import {
  ensureUserSaved,
  handleApiError,
  json,
  requireUserId,
} from "@/lib/api-helpers";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const userId = await requireUserId(req);
    const saved = await ensureUserSaved(userId);

    const body = await req.json();
    const { productId } = savedAddItemSchema.parse(body);

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product)
      return json(
        { error: "Product not found", message: "Product does not exist" },
        { status: 404 },
      );

    const item = await prisma.savedItem.upsert({
      where: { savedId_productId: { savedId: saved.id, productId } },
      update: {},
      create: {
        savedId: saved.id,
        productId,
      },
      include: { product: true },
    });

    return json(item, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
