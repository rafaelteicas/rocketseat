import { app } from '@/app'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { search } from './search'
import { nearby } from './nearby'
import { create } from './create'

export async function gymsRoutes() {
  app.addHook('onRequest', verifyJwt)
  app.get('/gym/search', search)
  app.get('/gym/nearby', nearby)
  app.get('/gyms', create)
}
