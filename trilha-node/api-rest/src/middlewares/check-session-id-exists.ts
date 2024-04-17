import { FastifyReply, FastifyRequest } from 'fastify'

export function checkSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionId = request.cookies.sessionId

  if (!sessionId) {
    return reply.status(404).send({
      error: 'Unauthorized',
    })
  }
}
