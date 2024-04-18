import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class PrismaUserRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }

  async findByEmail(email: string): Promise<{
    id: string
    name: string
    email: string
    password_hash: string
    created_at: Date
  } | null> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    })
  }
}
