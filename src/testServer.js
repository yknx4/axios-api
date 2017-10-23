import express from 'express'
import bodyParser from 'body-parser'
import getPort from 'get-port'
import bunyanRequest from 'express-bunyan-logger'

export default async function testServer () {
  const app = express()
  const port = await getPort()

  app.use(bunyanRequest({ logger: config.logger }))
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
