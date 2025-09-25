import { NextRequest, NextResponse } from 'next/server'
import { prisma } from './prisma'
import { AuthTokenPayload, verifyToken } from './auth'

export class UnauthenticatedError extends Error {
  constructor(message = 'Unauthenticated') {
    super(message)
    this.name = 'UnauthenticatedError'
  }
}

function getBearerToken(req: NextRequest) {
  const authHeader = req.headers.get('authorization') ?? ''
  const match = authHeader.match(/^Bearer\s+(.+)$/i)
  if (match && match[1]) {
    return match[1].trim()
  }

  const tokenHeader = req.headers.get('x-auth-token') ?? ''
  if (tokenHeader) {
    return tokenHeader.trim()
  }

  throw new UnauthenticatedError()
}

async function getAuthPayload(req: NextRequest) {
  const token = getBearerToken(req)
  try {
    return await verifyToken<AuthTokenPayload>(token)
  } catch {
    throw new UnauthenticatedError()
  }
}

export async function requireUserId(req: NextRequest) {
  const payload = await getAuthPayload(req)
  if (payload.role !== 'user') throw new UnauthenticatedError()

  const id = payload.sub
  if (!id) throw new UnauthenticatedError()
  return id
}

export async function requireSellerId(req: NextRequest) {
  const payload = await getAuthPayload(req)
  if (payload.role !== 'seller') throw new UnauthenticatedError()

  const id = payload.sub
  if (!id) throw new UnauthenticatedError()
  return id
}

export async function ensureUserCart(userId: string) {
  let cart = await prisma.cart.findUnique({ where: { userId } })
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId } })
  }
  return cart
}

export function json<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(data as any, init)
}

export function handleAuthError(error: unknown) {
  if (error instanceof UnauthenticatedError) {
    return json({ error: 'Unauthenticated' }, { status: 401 })
  }

  if (error instanceof Error && error.message === 'MISSING_USER_ID') {
    return json({ error: 'Unauthenticated' }, { status: 401 })
  }

  throw error
}
