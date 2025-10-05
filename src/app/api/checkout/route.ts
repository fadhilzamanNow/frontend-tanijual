import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  ensureUserSaved,
  handleApiError,
  json,
  requireUserId,
} from "@/lib/api-helpers";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const userId = await requireUserId(req);
    const orders = await prisma.checkout.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });
    return json(orders);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = await requireUserId(req);
    const saved = await ensureUserSaved(userId);

    const order = await prisma.$transaction(async (tx) => {
      const items = await tx.savedItem.findMany({
        where: { savedId: saved.id },
        include: { product: true },
      });

      if (items.length === 0) throw new Error("EMPTY_SAVED");

      for (const it of items) {
        if (it.product.quantity < 1) {
          throw new Error(`OUT_OF_STOCK:${it.productId}`);
        }
      }

      const total = items.reduce(
        (sum, it) => sum + Number(it.product.price),
        0,
      );

      const checkout = await tx.checkout.create({
        data: {
          userId,
          status: "PENDING",
          total,
          items: {
            create: items.map((it) => ({
              productId: it.productId,
              quantity: 1,
              unitPrice: it.product.price,
              productName: it.product.name,
            })),
          },
        },
        include: { items: true },
      });

      for (const it of items) {
        await tx.product.update({
          where: { id: it.productId },
          data: { quantity: { decrement: 1 } },
        });
      }

      await tx.savedItem.deleteMany({ where: { savedId: saved.id } });
      return checkout;
    });

    return json(order, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "EMPTY_SAVED") {
        return json(
          {
            error: "Saved list is empty",
            message: "Please add items to your saved list before checkout",
          },
          { status: 400 },
        );
      }

      if (error.message.startsWith("OUT_OF_STOCK:")) {
        const [, productId] = error.message.split(":");
        return json(
          {
            error: "Insufficient stock",
            message: "One or more products are out of stock",
            productId,
          },
          { status: 409 },
        );
      }
    }

    return handleApiError(error);
  }
}
