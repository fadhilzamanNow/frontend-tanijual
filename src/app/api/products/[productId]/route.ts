import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { json } from '@/lib/api-helpers'
import { productUpdateSchema } from '@/lib/validators'


export const runtime = 'nodejs'


function isPrismaKnownError(error: unknown, code: string) {
  return typeof error === 'object' && error !== null && 'code' in error && (error as any).code === code
}


export async function GET(
  _req: NextRequest,
  { params }: { params: { productId: string } }
) {
  const product = await prisma.product.findUnique({ where: { id: params.productId } })
  if (!product) return json({ error: 'Product not found' }, { status: 404 })
  return json(product)
}


export async function PATCH(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  const body = await req.json()
  const data = productUpdateSchema.parse(body)

  if (Object.keys(data).length === 0) {
    return json({ error: 'No changes provided' }, { status: 400 })
  }

  try {
    const { price, ...rest } = data
    const updated = await prisma.product.update({
      where: { id: params.productId },
      data: {
        ...rest,
        ...(price !== undefined ? { price } : {}),
      },
    })
    return json(updated)
  } catch (error) {
    if (isPrismaKnownError(error, 'P2025')) {
      return json({ error: 'Product not found' }, { status: 404 })
    }
    throw error
  }
}


export async function DELETE(
  _req: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    await prisma.product.delete({ where: { id: params.productId } })
    return json({ ok: true })
  } catch (error) {
    if (isPrismaKnownError(error, 'P2025')) {
      return json({ error: 'Product not found' }, { status: 404 })
    }

    if (isPrismaKnownError(error, 'P2003')) {
      return json({
        error: 'Cannot delete product with active references',
      }, { status: 409 })
    }

    throw error
  }
}
