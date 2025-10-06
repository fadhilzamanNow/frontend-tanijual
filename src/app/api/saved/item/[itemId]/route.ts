import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  ensureUserSaved,
  handleApiError,
  json,
  requireUserId,
} from "@/lib/api-helpers";

export const runtime = "nodejs";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ itemId: string }> },
) {
  try {
    const userId = await requireUserId(req);
    const saved = await ensureUserSaved(userId);
    const { itemId } = await params;

    const item = await prisma.savedItem.findFirst({
      where: { id: itemId, savedId: saved.id },
    });
    if (!item)
      return json(
        { error: "Item not found", message: "Saved item does not exist" },
        { status: 404 },
      );

    await prisma.savedItem.delete({ where: { id: itemId } });
    return json({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
