import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const ratings = await prisma.rating.findMany({
    where: {
      book_id: params.id,
    },
    include: {
      user: true,
    },
    orderBy: {
      created_at: 'desc',
    },
  })

  if (!ratings) {
    return new Response(null, {
      status: 404,
    })
  }

  return Response.json({ ratings })
}
