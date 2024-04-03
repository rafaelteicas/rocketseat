import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const book = await prisma.book.findFirst({
    where: {
      id: params.id,
    },
  })

  const categoryOnBooks = await prisma.categoriesOnBooks.findFirst({
    where: {
      book_id: params.id,
    },
  })

  const ratings = await prisma.rating.findMany({
    where: {
      book_id: params.id,
    },
  })

  if (!categoryOnBooks || !ratings) {
    return Response.json({})
  }

  const categoryName = await prisma.category.findFirst({
    select: {
      name: true,
    },
    where: {
      id: categoryOnBooks.categoryId,
    },
  })

  if (!categoryName) {
    return Response.json({})
  }

  const rate = ratings.map((rates) => rates.rate)

  const mediaRatings =
    rate.reduce((prev, curr) => {
      return prev + curr
    }, 0) / rate.length

  return Response.json({
    book,
    category: categoryName.name,
    ratings: {
      rate,
      media: mediaRatings,
    },
  })
}
