import { createServer } from 'node:http'
import { Transform } from 'node:stream'

class InvertNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString() * -1)
    console.log(transformed);
    callback(null, Buffer(String(transformed)))
  }
}

const server = createServer(async (req, res) => {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()

  return res.end(fullStreamContent)
})

server.listen(3334)