import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { json, handleApiError } from "@/lib/api-helpers";
import { loginSchema } from "@/lib/validators";
import { verifyPassword, signToken } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = loginSchema.parse(body);

    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user)
      return json(
        {
          error: "Kredensial tidak valid",
          message: "Pengguna tidak ditemukan",
        },
        { status: 401 },
      );

    const ok = await verifyPassword(data.password, user.password);
    if (!ok)
      return json(
        { error: "Kredensial tidak valid", message: "Password salah" },
        { status: 401 },
      );

    const authToken = await signToken({ sub: user.id, role: "user" });

    return json({
      user: { id: user.id, email: user.email, username: user.username },
      authToken,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
