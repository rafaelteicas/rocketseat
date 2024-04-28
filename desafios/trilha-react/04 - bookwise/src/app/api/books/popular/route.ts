import { NextRequest } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const limit = request.nextUrl.searchParams.get('limit')

  const data = await prisma.book.findMany({
    orderBy: {
      ratings: { _count: 'desc' },
    },
    include: {
      ratings: true,
    },
  })

  const books = data.map((book) => {
    const media =
      book.ratings.reduce((acc, curr) => {
        return acc + curr.rate
      }, 0) / book.ratings.length

    return {
      ...book,
      ratings: {
        media,
      },
    }
  })

  if (!books) {
    return new Response('Not found', {
      status: 404,
    })
  }

  if (limit) {
    return new Response(
      JSON.stringify({ books: books.slice(0, Number(limit)) }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }

  return Response.json({ books })
}
