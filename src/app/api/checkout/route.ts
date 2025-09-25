import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ensureUserCart, handleAuthError, json, requireUserId } from '@/lib/api-helpers'


export const runtime = 'nodejs'


export async function GET(req: NextRequest) {
  try {
    const userId = await requireUserId(req)
    const orders = await prisma.checkout.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    })
    return json(orders)
  } catch (error) {
    return handleAuthError(error)
  }
}


export async function POST(req: NextRequest) {
  try {
    const userId = await requireUserId(req)
    const cart = await ensureUserCart(userId)


    const order = await prisma.$transaction(async (tx) => {
      const items = await tx.cartItem.findMany({
        where: { cartId: cart.id },
        include: { product: true },
      })


      if (items.length === 0) throw new Error('EMPTY_CART')


      for (const it of items) {
        if (it.product.quantity < it.quantity) {
          throw new Error(`OUT_OF_STOCK:${it.productId}`)
        }
      }


      const total = items.reduce((sum, it) => sum + Number(it.unitPrice) * it.quantity, 0)


      const checkout = await tx.checkout.create({
        data: {
          userId,
          status: 'PENDING',
          total,
          items: {
            create: items.map((it) => ({
              productId: it.productId,
              quantity: it.quantity,
              unitPrice: it.unitPrice,
              productName: it.product.name,
            })),
          },
        },
        include: { items: true },
      })


      for (const it of items) {
        await tx.product.update({
          where: { id: it.productId },
          data: { quantity: { decrement: it.quantity } },
        })
      }


      await tx.cartItem.deleteMany({ where: { cartId: cart.id } })
      return checkout
    })


    return json(order, { status: 201 })
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'EMPTY_CART') {
        return json({ error: 'Cart is empty' }, { status: 400 })
      }

      if (error.message.startsWith('OUT_OF_STOCK:')) {
        const [, productId] = error.message.split(':')
        return json({ error: 'Insufficient stock', productId }, { status: 409 })
      }
    }


    return handleAuthError(error)
  }
}
