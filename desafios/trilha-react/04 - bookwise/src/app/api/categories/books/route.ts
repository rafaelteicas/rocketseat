import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams

  const categoryName = searchParams.get('name')

  if (!categoryName) {
    return Response.json({ error: 'Name is required' })
  }

  const category = await prisma.category.findUnique({
    where: {
      name: categoryName,
    },
  })

  const query = await prisma.$queryRaw`
    SELECT * FROM books b
    JOIN CategoriesOnBooks c ON c.book_id = b.id
    WHERE c.categoryId = ${category?.id}
  `

  return Response.json({ query })
}
