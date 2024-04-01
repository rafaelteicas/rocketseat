import { prisma } from '@/lib/prisma'

export async function GET() {
  const categories = await prisma.category.findMany()

  const result = [{ id: 'id', name: 'Todos' }, ...categories]

  return Response.json({ result })
}
