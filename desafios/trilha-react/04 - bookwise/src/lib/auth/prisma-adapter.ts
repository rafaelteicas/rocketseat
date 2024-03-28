import { Adapter } from 'next-auth/adapters'
import { prisma } from '../prisma'

export function PrismaAdapter(): Adapter {
  return {
    async createUser(user) {},

    async getUser(id) {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      })

      if (!user) {
        return null
      }

      return {
        id: user.id,
        email: user.email!,
        emailVerified: user.emailVerified!,
        image: user.image!,
        name: user.name!,
      }
    },

    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        return null
      }

      return {
        id: user.id,
        email: user.email!,
        emailVerified: user.emailVerified!,
        image: user.image!,
        name: user.name!,
      }
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.account.findUnique({
        where: {
          providerId_providerAccountId: {
            providerId: provider,
            providerAccountId,
          },
        },
        include: {
          user: true,
        },
      })

      if (!account) {
        return null
      }

      return {
        id: account.user.id,
        email: account.user.email!,
        emailVerified: account.user.emailVerified!,
        image: account.user.image!,
        name: account.user.name!,
      }
    },

    async updateUser(user) {
      const userUpdated = await prisma.user.update({
        data: user,
        where: { id: user.id },
      })

      return {
        id: userUpdated.id,
        email: userUpdated.email!,
        emailVerified: userUpdated.emailVerified!,
        image: userUpdated.image!,
        name: userUpdated.name!,
      }
    },

    async deleteUser(userId) {
      await prisma.user.delete({
        where: { id: userId },
      })
    },

    async linkAccount(account) {
      await prisma.account.create({
        data: {
          providerAccountId: account.providerAccountId,
          providerId: account.provider,
          providerType: account.type,
          userId: account.userId,
        },
      })
    },

    async createSession({ sessionToken, userId, expires }) {},

    async getSessionAndUser(sessionToken) {},

    async updateSession({ sessionToken }) {},

    async deleteSession(sessionToken) {},

    async createVerificationToken({ identifier, expires, token }) {},

    async useVerificationToken({ identifier, token }) {},
  }
}
