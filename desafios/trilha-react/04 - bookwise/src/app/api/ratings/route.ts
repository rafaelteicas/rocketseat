import { prisma } from '@/lib/prisma'

// interface DataDTO {
//   rate: number
//   description: string
//   bookId: string
//   userId: string
// }

export async function POST(request: Request) {
  const data = await request.json()

  try {
    await prisma.rating.create({
      data: {
        rate: data.rate,
        description: data.description,
        book: {
          connect: {
            id: data.bookId,
          },
        },
        created_at: new Date().toISOString(),
        user: {
          connect: {
            email: data.userEmail,
          },
        },
      },
    })

    return new Response(null, {
      status: 201,
    })
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
    })
  }
}
