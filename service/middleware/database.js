const knex = require('knex')
const { Model } = require('objection')
const { Logger } = require('@gffny/logger')
const logger = new Logger('database')

const {
  OPERATIONAL: { SEED_LOCATION },
} = require('../constants/database')

function makeDbMiddleware(config = {}) {
  const connection = {
    host: config.host || 'mysql',
    user: config.user || 'golf-data-service',
    password: config.password || 'letmein123',
    charset: 'utf8mb4',
    database: config.database || 'golf-data',
  }
  logger.info({
    functionName: makeDbMiddleware.name,
    title: 'configuring database',
    data: connection,
  })
  const pool = {
    min: config.poolMin || 2,
    max: config.poolMax || 10,
    // Force timezone on the connection after creation
    afterCreate: function (connection, callback) {
      connection.query(`SET time_zone = "+00:00";`, function (err) {
        callback(err, connection)
      })
    },
  }
  const migrations = {
    directory: config.schemaMigrationDirectory || './db/migrations',
  }
  const knexInstance = knex({
    client: 'mysql2',
    connection,
    pool,
    migrations,
  })
  Model.knex(knexInstance)
  // eslint-disable-next-line no-constant-condition
  if (config.migrateDB || true) {
    try {
      knexInstance.migrate.latest().then(() => {
        if (config.seedDB || true) {
          try {
            knexInstance.seed.run({
              directory: SEED_LOCATION,
            })
          } catch (e) {
            logger.error({
              functionName: 'db-seed',
              title: 'Unable to seed data: ' + e,
            })
            process.exit(1)
          }
        }
      })
    } catch (e) {
      logger.error({
        functionName: 'db-migration',
        title: 'Unable to migrate schema: ' + e,
      })
      process.exit(1)
    }
  }
  const middleware = (req, res, next) => {
    req.db = knexInstance
    next()
  }
  middleware.db = knexInstance
  return middleware
}

module.exports = makeDbMiddleware
