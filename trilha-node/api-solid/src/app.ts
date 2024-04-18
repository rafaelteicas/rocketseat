import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issue: error.format(),
    })
  }

  return reply.status(400).send({ message: 'Internal server error' })
})
