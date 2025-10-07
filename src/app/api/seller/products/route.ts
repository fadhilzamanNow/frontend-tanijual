import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleApiError, json, requireSellerId } from "@/lib/api-helpers";
import { productCreateSchema } from "@/lib/validators";

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
        category: {
          select: {
            id: true,
            name: true,
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

export async function POST(req: NextRequest) {
  try {
    const sellerId = await requireSellerId(req);

    const body = await req.json();

    // Validate request body
    const validationResult = productCreateSchema.safeParse({
      ...body,
      sellerId,
    });

    if (!validationResult.success) {
      return json(
        {
          error: "Validation failed",
          message: validationResult.error.issues[0]?.message || "Invalid input",
          details: validationResult.error.issues,
        },
        { status: 400 },
      );
    }

    const data = validationResult.data;

    // Create product
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description || null,
        categoryId: data.categoryId || null,
        quantity: data.quantity,
        price: data.price,
        sellerId: data.sellerId,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        seller: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    // If image data is provided, create product image
    if (data.imageUrl) {
      await prisma.productImage.create({
        data: {
          productId: product.id,
          imageUrl: data.imageUrl,
          order: 0,
        },
      });
    }

    return json(
      {
        success: true,
        message: "Product created successfully",
        data: product,
      },
      { status: 201 },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
