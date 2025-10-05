import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { json, handleApiError } from "@/lib/api-helpers";
import { sellerLoginSchema } from "@/lib/validators";
import { signToken, verifyPassword } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = sellerLoginSchema.parse(body);

    const seller = await prisma.seller.findUnique({
      where: { email: data.email },
    });
    if (!seller)
      return json(
        { error: "Invalid credentials", message: "Seller not found" },
        { status: 401 },
      );

    const ok = await verifyPassword(data.password, seller.password);
    if (!ok)
      return json(
        { error: "Invalid credentials", message: "Incorrect password" },
        { status: 401 },
      );

    const authToken = await signToken({ sub: seller.id, role: "seller" });

    return json({
      seller: { id: seller.id, email: seller.email, username: seller.username },
      authToken,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
