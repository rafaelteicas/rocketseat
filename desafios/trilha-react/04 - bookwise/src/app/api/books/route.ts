import { prisma } from '@/lib/prisma'

export async function GET() {
  const books = await prisma.$queryRaw`
    SELECT b.*, r.rate FROM books b
    JOIN ratings r ON b.id = r.book_id
  `
  return Response.json({ books })
}
