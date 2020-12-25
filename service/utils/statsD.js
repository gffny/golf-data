const StatsD = require('hot-shots')
const validator = require('validator')
const {
  endpointStatus,
  endpointResponseTime,
  serviceResponseTime,
  customCounter,
} = require('../constants/statsdMetricKeys')

const statsDClient = createStatsDClient()
const API_PREFIX = '/api/'
const status = {
  OK: 200,
}

function createStatsDClient() {
  const host = process.env.STATSD_HOST || 'localhost'
  const port = process.env.STATSD_PORT || '8125'

  return new StatsD({
    host: host,
    port: port,
    mock: process.env.NODE_ENV == 'local',
    globalTags: { env: process.env.DATADOG_METRICS_ENV || 'localdev' },
    errorHandler: function(error) {
      logWarn(
        JSON.stringify({
          message: 'statsD error',
          error: error,
        }),
      )
    },
  })
}

function sendEndpointMetrics(req, statusCode = status.OK) {
  let endpointName
  try {
    endpointName = buildEndpointName(req)
    statsDClient.increment(endpointStatus(statusCode), [
      `endpoint:${endpointName}`,
    ])
    // TODO: Determine if we can listen for requests 'finishing' when we instantiate this middleware on a request, and send duration there instead.
    const duration = new Date().getTime() - req.startTime
    statsDClient.timing(endpointResponseTime(), duration, [
      `endpoint:${endpointName}`,
    ])
  } catch (e) {
    logWarn(
      'sendEndpointMetrics',
      'Unable to send statD metrics',
      endpointName || 'unknown endpoint name',
    )
  }
}

function sendServiceMetrics(serviceFunction, startTime) {
  try {
    const duration = new Date().getTime() - startTime
    statsDClient.timing(serviceResponseTime(), duration, [
      `service:${serviceFunction}`,
    ])
  } catch (e) {
    logWarn(
      'sendServiceMetrics',
      'Unable to send statD metrics',
      serviceFunction,
    )
  }
}

// Custom metrics. E.g. sendCustomCounterMetric('serviceCloud', 'getById', 1)
function sendCustomCounterMetric(grouping, name, value) {
  try {
    statsDClient.increment(customCounter(grouping, value), [
      `${grouping}:${name}`,
    ])
  } catch (e) {
    logWarn(
      'sendCustomCounterMetric',
      name,
      `Unable to send StasD metric: ${e.message}`,
    )
  }
}

const buildEndpointName = req => {
  const methodName = req.method && req.method.toLowerCase()
  const resourceNames =
    req.originalUrl &&
    req.originalUrl
      .split(API_PREFIX)
      .pop()
      .split('?')
      .shift()
      .split('/')
      .filter(r => !validator.isUUID(r) && !parseInt(r))
  return [methodName].concat(resourceNames).join('_')
}

module.exports = {
  sendEndpointMetrics,
  sendCustomCounterMetric,
  buildEndpointName,
  sendServiceMetrics,
}
