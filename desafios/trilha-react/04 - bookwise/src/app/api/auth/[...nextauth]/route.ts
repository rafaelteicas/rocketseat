import { prisma } from '@/lib/prisma'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
  // eslint-disable-next-line camelcase
  unstable_update,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false
      }

      const userAlreadyExists = await prisma.user.findUnique({
        where: { email: user.email },
      })
      if (!userAlreadyExists) {
        await prisma.user.create({
          data: {
            id: user.id,
            name: user.name || '',
            avatar_url: user.image,
            email: user.email,
          },
        })
      }

      return true
    },
  },
})
