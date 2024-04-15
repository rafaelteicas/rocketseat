import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId')

  const ratings = await prisma.rating.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar_url: true,
        },
      },
      book: true,
    },
    orderBy: {
      created_at: 'desc',
    },
  })

  if (!ratings) {
    return Response.json(
      { message: 'Ratings not founded' },
      {
        status: 404,
      },
    )
  }

  if (userId) {
    const lastRatedBook = await prisma.rating.findFirst({
      where: {
        user_id: userId,
      },
      orderBy: {
        created_at: 'desc',
      },
      include: {
        book: true,
        user: true,
      },
    })

    if (lastRatedBook) {
      return Response.json({ ratings, lastRatedBook })
    }

    return Response.json({ ratings })
  }

  return Response.json({ ratings })
}
