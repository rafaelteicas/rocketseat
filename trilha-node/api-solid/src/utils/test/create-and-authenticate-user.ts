import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password_hash: await hash('1234567', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    password: '1234567',
  })
  const authResponse = await request(app.server).post('/sessions').send({
    email: 'john.doe@gmail.com',
    password: '1234567',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
