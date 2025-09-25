import { prisma } from '@/lib/prisma'
import { json } from '@/lib/api-helpers'


export const runtime = 'nodejs'


export async function GET() {
  const sellers = await prisma.seller.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: 'desc' },
  })
  return json(sellers)
}
