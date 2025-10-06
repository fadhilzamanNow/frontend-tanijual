import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { json, handleApiError } from "@/lib/api-helpers";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
    return json(categories);
  } catch (error) {
    return handleApiError(error);
  }
}
