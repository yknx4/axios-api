import express from 'express'
import bodyParser from 'body-parser'
import getPort from 'get-port'
import debug from 'debug'

export default async function testServer () {
  const logger = debug('test-server')
  const app = express()
  const port = await getPort()

  app.use((req, res, next) => {
    logger(`${req.method} ${req.url}`)
    const originalEnd = res.end
    res.end = function end (...args) {
      originalEnd.bind(res)(...args)
      logger(
        `${this.statusCode} ${this.statusMessage} (${this.req.method} ${this.req
          .url})`
      )
    }
    next()
  })
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, X-Custom-Header'
    )
    next()
  })
  app.use(bodyParser.json())
  app.use((req, res) => {
    res.status(200).json({
      url: req.url,
      path: req.path,
      method: req.method,
      headers: req.headers,
      body: req.body,
      query: req.query
    })
  })
  return new Promise((resolve, reject) => {
    app.listen(port, err => {
      if (err) {
        console.error(err)
        reject(err)
      }
      console.log(`Test server listening on ${port}`)
      resolve(port)
    })
  })
}
