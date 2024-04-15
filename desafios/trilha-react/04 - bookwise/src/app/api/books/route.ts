import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId')

  const data = await prisma.book.findMany({
    include: {
      ratings: {
        select: { rate: true, user_id: true },
      },
    },
  })

  if (!data) {
    return Response.json(
      { message: 'No book founded' },
      {
        status: 404,
      },
    )
  }

  const books = data.map((book) => {
    let rated: boolean = false
    const media =
      book.ratings.reduce((prev, curr) => {
        return prev + curr.rate
      }, 0) / book.ratings.length

    if (userId) {
      book.ratings.map((rate) => {
        if (rate.user_id === userId) {
          return (rated = true)
        }
        return (rated = false)
      })
    }

    return {
      ...book,
      media,
      rated,
    }
  })

  return Response.json({ books })
}
