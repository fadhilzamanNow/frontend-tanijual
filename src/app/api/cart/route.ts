import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ensureUserCart, handleAuthError, json, requireUserId } from '@/lib/api-helpers'


export async function GET(req: NextRequest) {
  try {
    const userId = await requireUserId(req)
    const cart = await ensureUserCart(userId)


    const full = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: { product: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    })
    return json(full)
  } catch (error) {
    return handleAuthError(error)
  }
}


export async function DELETE(req: NextRequest) {
  try {
    const userId = await requireUserId(req)
    const cart = await ensureUserCart(userId)
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } })
    return json({ ok: true })
  } catch (error) {
    return handleAuthError(error)
  }
}
