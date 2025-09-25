import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cartAddItemSchema } from '@/lib/validators'
import { ensureUserCart, handleAuthError, json, requireUserId } from '@/lib/api-helpers'


export const runtime = 'nodejs'


export async function POST(req: NextRequest) {
  try {
    const userId = await requireUserId(req)
    const cart = await ensureUserCart(userId)


    const body = await req.json()
    const { productId, quantity } = cartAddItemSchema.parse(body)


    const product = await prisma.product.findUnique({ where: { id: productId } })
    if (!product) return json({ error: 'Product not found' }, { status: 404 })
    if (product.quantity < quantity) return json({ error: 'Insufficient stock' }, { status: 400 })


    const item = await prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.id, productId } },
      update: { quantity: { increment: quantity } },
      create: {
        cartId: cart.id,
        productId,
        quantity,
        unitPrice: product.price,
      },
      include: { product: true },
    })


    return json(item, { status: 201 })
  } catch (error) {
    return handleAuthError(error)
  }
}
