import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { json, handleApiError } from "@/lib/api-helpers";
import { productUpdateSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function GET(
  _req: NextRequest,
  { params }: { params: { productId: string } },
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.productId },
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
    });
    if (!product) return json({ error: "Product not found" }, { status: 404 });
    return json(product);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { productId: string } },
) {
  try {
    const body = await req.json();
    const data = productUpdateSchema.parse(body);

    if (Object.keys(data).length === 0) {
      return json({ error: "No changes provided" }, { status: 400 });
    }

    // Build update data with only defined values
    const updateData: Record<string, any> = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.quantity !== undefined) updateData.quantity = data.quantity;
    if (data.price !== undefined) updateData.price = data.price;
    if (data.description !== undefined)
      updateData.description = data.description;

    const updated = await prisma.product.update({
      where: { id: params.productId },
      data: updateData,
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
    });
    return json(updated);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { productId: string } },
) {
  try {
    await prisma.product.delete({ where: { id: params.productId } });
    return json({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
