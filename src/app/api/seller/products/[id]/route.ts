import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleApiError, json, requireSellerId } from "@/lib/api-helpers";
import { productCreateSchema } from "@/lib/validators";

export const runtime = "nodejs";

// GET - Get single product by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sellerId = await requireSellerId(req);
    const productId = params.id;

    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        sellerId, // Ensure seller owns this product
      },
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
    });

    if (!product) {
      return json({ error: "Product not found" }, { status: 404 });
    }

    // Format response with imageUrl from first image
    const response = {
      ...product,
      imageUrl: product.images[0]?.imageUrl || null,
      imageKey: product.images[0]?.imageUrl || null,
    };

    return json(response);
  } catch (error) {
    return handleApiError(error);
  }
}

// PATCH - Update product
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sellerId = await requireSellerId(req);
    const productId = params.id;

    // Verify product exists and belongs to seller
    const existingProduct = await prisma.product.findFirst({
      where: {
        id: productId,
        sellerId,
      },
      include: {
        images: true,
      },
    });

    if (!existingProduct) {
      return json({ error: "Product not found" }, { status: 404 });
    }

    const body = await req.json();

    // Validate request body
    const validationResult = productCreateSchema
      .omit({ sellerId: true })
      .safeParse(body);

    if (!validationResult.success) {
      return json(
        {
          error: "Validation failed",
          message: validationResult.error.issues[0]?.message || "Invalid input",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Update product
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name: data.name,
        description: data.description || null,
        categoryId: data.categoryId || null,
        quantity: data.quantity,
        price: data.price,
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
        images: {
          orderBy: { order: "asc" },
        },
      },
    });

    // Handle image update
    if (data.imageUrl) {
      // Check if product already has images
      if (existingProduct.images.length > 0) {
        // Update first image
        await prisma.productImage.update({
          where: { id: existingProduct.images[0].id },
          data: {
            imageUrl: data.imageUrl,
          },
        });
      } else {
        // Create new image
        await prisma.productImage.create({
          data: {
            productId: updatedProduct.id,
            imageUrl: data.imageUrl,
            order: 0,
          },
        });
      }
    }

    return json(
      {
        success: true,
        message: "Product updated successfully",
        data: updatedProduct,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE - Delete product
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sellerId = await requireSellerId(req);
    const productId = params.id;

    // Verify product exists and belongs to seller
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        sellerId,
      },
    });

    if (!product) {
      return json({ error: "Product not found" }, { status: 404 });
    }

    // Delete product (images will be cascade deleted)
    await prisma.product.delete({
      where: { id: productId },
    });

    return json(
      {
        success: true,
        message: "Product deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
