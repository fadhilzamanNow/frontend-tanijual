import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { json, handleApiError } from "@/lib/api-helpers";
import { sellerRegisterSchema } from "@/lib/validators";
import { hashPassword, signToken } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = sellerRegisterSchema.parse(body);

    const exists = await prisma.seller.findFirst({
      where: { OR: [{ email: data.email }, { username: data.username }] },
      select: { id: true },
    });
    if (exists)
      return json(
        {
          error: "Seller already exists",
          message: "Email or username is already taken",
        },
        { status: 409 },
      );

    const password = await hashPassword(data.password);

    const seller = await prisma.seller.create({
      data: {
        username: data.username,
        email: data.email,
        password,
      },
    });

    const authToken = await signToken({ sub: seller.id, role: "seller" });

    return json(
      {
        seller: {
          id: seller.id,
          username: seller.username,
          email: seller.email,
          createdAt: seller.createdAt,
          updatedAt: seller.updatedAt,
        },
        authToken,
      },
      { status: 201 },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
