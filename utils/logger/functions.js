/* eslint-disable */
const winston = require('winston')

// enable this locally for pretty printed logs
const format = process.env.WINSTON_PRETTY_PRINT_ENABLED
  ? winston.format.prettyPrint({ depth: 3, colorize: false })
  : winston.format.json()

const logConfiguration = {
  level: process.env.LOG_LEVEL || 'verbose',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSSS',
    }),
    format,
  ),
  transports: [new winston.transports.Console()],
}

const logger = winston.createLogger(logConfiguration)

logger.on('error', error => console.log('error writing cloudwatch logs', error))

/**
 *
 * @param {*} functionName
 * @param {*} title
 * @param {*} message
 * @param {*} logLevel
 */
const log = (functionName, logLevel, title, message) => {
  return logger[logLevel]({
    // ...getTraceId(),
    // lambdaInstanceId: global.lambdaInstanceId,
    env: process.env.GOLF_DATA_ENV || process.env.ENV || 'unknown',
    function: functionName,
    title,
    message: message ? message : 'undefined', // hack to prevent winston from screwing up the formatting. see AP-9179.
  })
}

module.exports = {
  log,
}
