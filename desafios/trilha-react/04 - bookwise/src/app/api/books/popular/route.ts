import { prisma } from '@/lib/prisma'

export async function GET() {
  const books = await prisma.book.findMany({
    orderBy: {
      ratings: { _count: 'desc' },
    },
    include: {
      ratings: true,
    },
  })
  return Response.json({ books })
}
