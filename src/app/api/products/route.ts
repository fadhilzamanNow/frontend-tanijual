import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { json } from '@/lib/api-helpers'
import { productCreateSchema } from '@/lib/validators'


export const runtime = 'nodejs'


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const sellerId = searchParams.get('sellerId') ?? undefined


  const products = await prisma.product.findMany({
    where: sellerId ? { sellerId } : undefined,
    orderBy: { createdAt: 'desc' },
  })
  return json(products)
}


export async function POST(req: NextRequest) {
  const body = await req.json()
  const data = productCreateSchema.parse(body)


  const seller = await prisma.seller.findUnique({ where: { id: data.sellerId } })
  if (!seller) return json({ error: 'Seller not found' }, { status: 404 })


  const created = await prisma.product.create({ data })
  return json(created, { status: 201 })
}
