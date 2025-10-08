import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { json, handleApiError } from "@/lib/api-helpers";
import { registerSchema } from "@/lib/validators";
import { hashPassword, signToken } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = registerSchema.parse(body);

    const exists = await prisma.user.findFirst({
      where: { OR: [{ email: data.email }, { username: data.username }] },
      select: { id: true },
    });
    if (exists)
      return json(
        {
          error: "Pengguna sudah terdaftar",
          message: "Email atau username sudah digunakan",
        },
        { status: 409 },
      );

    const password = await hashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password,
        phoneNumber: data.phoneNumber,
      },
    });

    const token = await signToken({ sub: user.id, role: "user" });

    return json(
      {
        user: { id: user.id, email: user.email, username: user.username },
        authToken: token,
      },
      { status: 201 },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
