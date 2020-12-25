const express = require('express')
const compression = require('compression')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const swaggerSpec = require('./swagger')
const swaggerUI = require('swagger-ui-express')

const errorHandler = require('./middleware/errorHandler')
const makeDbMiddleware = require('./middleware/database')
// const statsDMiddleware = require('./middleware/statsD')

// Move this to an index file in `/api` when it grows
const shotsRoutes = require('./api/shots')
const routes = [['/api/shots', shotsRoutes]]

function makeService(config) {
  const app = express()

  app.disable('etag')
  app.set('port', config.port)

  app.use(
    logger('dev', {
      skip: function (req) {
        if (req.url == '/api/ping' || req.url == '/') {
          return true
        } else {
          return false
        }
      },
    }),
  )

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(compression())

  // You can set morgan to log differently depending on your environment
  if (app.get('env') == 'production') {
    app.use(
      logger('common', {
        skip: function (req, res) {
          return res.statusCode < 400
        },
        stream: __dirname + '/../morgan.log',
      }),
    )
  } else {
    app.use(logger('dev'))
  }

  // Custom middleware - uncomment this when starting a new project
  const dbMiddleware = makeDbMiddleware(config.db)
  app.use(dbMiddleware)
  // app.use(statsDMiddleware(config.statsd))

  // Routes
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

  // Health check route
  app.use('/api/ping', function (req, res, next) {
    res.sendStatus(200)
  })

  routes.forEach(element => {
    const route = element[0]
    const router = element[1]
    app.use(route, router)
  })

  // Error handler
  app.use(errorHandler)

  async function quit(server = app.server) {
    await new Promise(resolve => {
      server.on('close', resolve)
      server.close()
    })
    // await dbMiddleware.db.destroy()
  }

  app.quit = quit
  app.start = start.bind(null, app)
  return app
}

function start(app, port) {
  return new Promise(resolve => {
    const server = app.listen(port, () => {
      resolve(server)
    })
  })
}

makeService.config = require('./config')

module.exports = makeService
