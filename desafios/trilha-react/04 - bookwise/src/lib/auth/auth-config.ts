import { prisma } from '@/lib/prisma'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
  // eslint-disable-next-line camelcase
  unstable_update,
} = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
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
    async session({ session }) {
      const userData = await prisma.user.findFirst({
        where: {
          email: session.user.email,
        },
      })

      if (userData) {
        session.user.id = userData.id
        return session
      }
      return session
    },
  },
})
