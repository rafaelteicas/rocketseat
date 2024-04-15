import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const user = await prisma.user.findFirst({
    where: {
      id: params.id,
    },
    include: {
      ratings: {
        orderBy: {
          created_at: 'desc',
        },
        include: {
          book: {
            include: {
              categories: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      },
    },
  })

  if (!user) {
    return Response.json(
      {
        message: 'User not found',
      },
      {
        status: 404,
      },
    )
  }

  const pages = user.ratings.map((books) => {
    return books.book.total_pages
  })

  const totalReadPages = pages.reduce((acc, curr) => {
    return acc + curr
  }, 0)

  const authors = new Set(user.ratings.map((rate) => rate.book.author)).size

  const category = user.ratings.map((rate) =>
    rate.book.categories.map((category) => category.category.name),
  )

  category.forEach((category, i) => {
    if (category[i] === category) {
      return category
    }
  })

  return Response.json({
    user: {
      ...user,
      readPages: totalReadPages,
      ratedBooks: pages.length,
      authors,
    },
  })
}
