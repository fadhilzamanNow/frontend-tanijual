import { NextRequest, NextResponse } from "next/server";
import { prisma } from "./prisma";
import { type AuthTokenPayload, verifyToken } from "./auth";

export class UnauthenticatedError extends Error {
  constructor(message = "Tidak terautentikasi") {
    super(message);
    this.name = "UnauthenticatedError";
  }
}

function getBearerToken(req: NextRequest) {
  const authHeader = req.headers.get("authorization") ?? "";
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  if (match && match[1]) {
    return match[1].trim();
  }

  const tokenHeader = req.headers.get("x-auth-token") ?? "";
  if (tokenHeader) {
    return tokenHeader.trim();
  }

  throw new UnauthenticatedError();
}

async function getAuthPayload(req: NextRequest) {
  const token = getBearerToken(req);
  try {
    return await verifyToken<AuthTokenPayload>(token);
  } catch {
    throw new UnauthenticatedError();
  }
}

export async function requireUserId(req: NextRequest) {
  const payload = await getAuthPayload(req);
  if (payload.role !== "user") throw new UnauthenticatedError();

  const id = payload.sub;
  if (!id) throw new UnauthenticatedError();
  return id;
}

export async function requireSellerId(req: NextRequest) {
  const payload = await getAuthPayload(req);
  if (payload.role !== "seller") throw new UnauthenticatedError();

  const id = payload.sub;
  if (!id) throw new UnauthenticatedError();
  return id;
}

export async function ensureUserSaved(userId: string) {
  let saved = await prisma.saved.findUnique({ where: { userId } });
  if (!saved) {
    saved = await prisma.saved.create({ data: { userId } });
  }
  return saved;
}

export function json<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(data as any, init);
}

export function handleAuthError(error: unknown) {
  if (error instanceof UnauthenticatedError) {
    return json({ error: "Tidak terautentikasi" }, { status: 401 });
  }

  if (error instanceof Error && error.message === "MISSING_USER_ID") {
    return json({ error: "Tidak terautentikasi" }, { status: 401 });
  }

  throw error;
}

/**
 * Standardized error handler for API routes
 * Returns consistent JSON error responses
 */
export function handleApiError(error: unknown) {
  console.error("API Error:", error);

  // Handle authentication errors
  if (error instanceof UnauthenticatedError) {
    return json(
      { error: "Tidak terautentikasi", message: error.message },
      { status: 401 },
    );
  }

  // Handle Prisma errors
  if (typeof error === "object" && error !== null && "code" in error) {
    const prismaError = error as any;

    switch (prismaError.code) {
      case "P2002":
        return json(
          {
            error: "Unique constraint violation",
            message: "A record with this value already exists",
          },
          { status: 409 },
        );

      case "P2025":
        return json(
          {
            error: "Record not found",
            message: "The requested resource was not found",
          },
          { status: 404 },
        );

      case "P2003":
        return json(
          {
            error: "Foreign key constraint violation",
            message:
              "Cannot perform this operation due to existing relationships",
          },
          { status: 409 },
        );

      default:
        return json(
          {
            error: "Database error",
            message: prismaError.message || "A database error occurred",
          },
          { status: 500 },
        );
    }
  }

  // Handle validation errors (zod, etc)
  if (error instanceof Error && error.name === "ZodError") {
    return json(
      {
        error: "Kesalahan validasi",
        message: error.message,
      },
      { status: 400 },
    );
  }

  // Handle generic errors
  if (error instanceof Error) {
    return json(
      {
        error: "Kesalahan server internal",
        message: error.message,
      },
      { status: 500 },
    );
  }

  // Fallback for unknown errors
  return json(
    {
      error: "Kesalahan server internal",
      message: "Terjadi kesalahan yang tidak terduga",
    },
    { status: 500 },
  );
}
