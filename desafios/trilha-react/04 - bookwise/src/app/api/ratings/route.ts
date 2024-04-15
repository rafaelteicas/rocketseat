import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const data = await request.json()

  try {
    const userHasAlreadyRated = await prisma.rating.findFirst({
      where: {
        book: {
          id: data.bookId,
          AND: {
            ratings: {
              some: {
                user: {
                  email: data.userEmail,
                },
              },
            },
          },
        },
      },
    })

    if (userHasAlreadyRated) {
      return Response.json({ message: 'User has already rated' })
    }

    await prisma.rating.create({
      data: {
        rate: data.rating,
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
    console.log(error)

    return new Response(JSON.stringify(error), {
      status: 500,
    })
  }
}
