import { NextRequest } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { bookId: string } },
) {
  const userId = request.nextUrl.searchParams.get('userId')

  if (!userId) {
    return new Response(null, {
      status: 404,
    })
  }

  const rating = await prisma.book.findFirst({
    where: {
      id: params.bookId,
      AND: {
        ratings: {
          some: {
            user_id: userId,
          },
        },
      },
    },
  })

  if (rating) {
    return new Response(null, {
      status: 404,
    })
  }
}
