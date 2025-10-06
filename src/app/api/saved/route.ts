import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  ensureUserSaved,
  handleApiError,
  json,
  requireUserId,
} from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  try {
    const userId = await requireUserId(req);
    const saved = await ensureUserSaved(userId);

    const full = await prisma.saved.findUnique({
      where: { id: saved.id },
      include: {
        items: {
          include: {
            product: {
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
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    return json(full?.items || []);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const userId = await requireUserId(req);
    const saved = await ensureUserSaved(userId);
    await prisma.savedItem.deleteMany({ where: { savedId: saved.id } });
    return json({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
