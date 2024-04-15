import { createServer } from 'node:http'
import { json } from './middleware/json.js'
import { Database } from './database.js'
import { routes } from './routes.js'

const database = new Database()

const server = createServer(async (req, res) => {
  const { method, url } = req
  await json(req, res)
  
  const route = routes.find(route => route.method === method && route.path.test(url))

  if (route) {
    const routeParams = req.url.match(route.path)
    req.params = { ...routeParams.groups }
    return route.handler(req, res)
  }

  res.writeHead(404).end()
})

server.listen(3333)