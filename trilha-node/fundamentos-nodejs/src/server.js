import { createServer } from 'node:http'
import { json } from './middleware/json.js'
import { routes } from './routes.js'
import {extractQueryParams} from './utils/extract-query-params.js'

const server = createServer(async (req, res) => {
  const { method, url } = req
  await json(req, res)
  
  const route = routes.find(route => route.method === method && route.path.test(url))

  if (route) {
    const routeParams = req.url.match(route.path)
    const { query, ...params } = routeParams.groups 
    req.params = params
    req.query = query ? extractQueryParams(query) : {}
    return route.handler(req, res)
  }

  res.writeHead(404).end()
})

server.listen(3333)