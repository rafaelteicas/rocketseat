import { prisma } from '@/lib/prisma'

export async function GET() {
  const ratings = await prisma.rating.findMany({
    include: {
      user: true,
      book: true,
    },
    orderBy: {
      created_at: 'desc',
    },
  })

  return Response.json({ ratings })
}
