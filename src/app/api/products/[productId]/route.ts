import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { json, handleApiError } from "@/lib/api-helpers";
import { productUpdateSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ productId: string }> },
) {
  try {
    const { productId } = await params;
    const product = await prisma.product.findUnique({
      where: { id: productId },
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
            phoneNumber: true,
          },
        },
        category: true,
      },
    });
    if (!product)
      return json({ error: "Produk tidak ditemukan" }, { status: 404 });
    return json(product);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> },
) {
  try {
    const { productId } = await params;
    const body = await req.json();
    const data = productUpdateSchema.parse(body);

    if (Object.keys(data).length === 0) {
      return json(
        { error: "Tidak ada perubahan yang diberikan" },
        { status: 400 },
      );
    }

    // Build update data with only defined values
    const updateData: Record<string, any> = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.quantity !== undefined) updateData.quantity = data.quantity;
    if (data.price !== undefined) updateData.price = data.price;
    if (data.description !== undefined)
      updateData.description = data.description;

    const updated = await prisma.product.update({
      where: { id: productId },
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
            motto: true,
          },
        },
        category: true,
      },
    });
    return json(updated);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ productId: string }> },
) {
  try {
    const { productId } = await params;
    await prisma.product.delete({ where: { id: productId } });
    return json({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
