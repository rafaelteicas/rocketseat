import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams

  const categoryName = searchParams.get('name')
  const userId = searchParams.get('userId')

  if (!categoryName) {
    return Response.json({ error: 'Name is required' })
  }

  const category = await prisma.category.findUnique({
    where: {
      name: categoryName,
    },
  })

  if (!category) {
    return Response.json(
      { error: 'Category not found' },
      {
        status: 404,
      },
    )
  }

  const data = await prisma.book.findMany({
    where: {
      categories: {
        some: {
          category,
        },
      },
    },
    include: {
      ratings: true,
    },
  })

  const result = data.map((books) => {
    let rated: boolean = false

    const media =
      books.ratings.reduce((acc, book) => {
        return acc + book.rate
      }, 0) / books.ratings.length

    if (userId) {
      books.ratings.map((rate) => {
        if (rate.user_id === userId) {
          return (rated = true)
        }
        return (rated = false)
      })
    }

    return {
      ...books,
      media,
      rated,
    }
  })

  return Response.json({ result })
}
