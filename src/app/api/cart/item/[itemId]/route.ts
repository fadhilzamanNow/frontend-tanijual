import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cartUpdateItemSchema } from '@/lib/validators'
import { ensureUserCart, handleAuthError, json, requireUserId } from '@/lib/api-helpers'


export const runtime = 'nodejs'


export async function PATCH(
  req: NextRequest,
  { params }: { params: { itemId: string } }
) {
  try {
    const userId = await requireUserId(req)
    const cart = await ensureUserCart(userId)
    const { itemId } = params


    const body = await req.json()
    const { quantity } = cartUpdateItemSchema.parse(body)


    const item = await prisma.cartItem.findFirst({ where: { id: itemId, cartId: cart.id } })
    if (!item) return json({ error: 'Item not found' }, { status: 404 })


    if (quantity === 0) {
      await prisma.cartItem.delete({ where: { id: itemId } })
      return json({ ok: true })
    }


    const updated = await prisma.cartItem.update({ where: { id: itemId }, data: { quantity } })
    return json(updated)
  } catch (error) {
    return handleAuthError(error)
  }
}


export async function DELETE(
  req: NextRequest,
  { params }: { params: { itemId: string } }
) {
  try {
    const userId = await requireUserId(req)
    const cart = await ensureUserCart(userId)
    const { itemId } = params


    const item = await prisma.cartItem.findFirst({ where: { id: itemId, cartId: cart.id } })
    if (!item) return json({ error: 'Item not found' }, { status: 404 })


    await prisma.cartItem.delete({ where: { id: itemId } })
    return json({ ok: true })
  } catch (error) {
    return handleAuthError(error)
  }
}
