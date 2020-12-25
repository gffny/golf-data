async function loadConfig(opts = {}) {
  // Service Config
  opts.port = normalizePort(process.env.PORT || '3000')

  // DB Config
  opts.db = opts.db || {}
  opts.db.host = opts.db.host || process.env.MYSQL_DNS || '127.0.0.1'
  opts.db.user = opts.db.user || process.env.MYSQL_USER || 'golf-data-service'
  opts.db.password =
    opts.db.password || process.env.MYSQL_PASSWORD || 'letmein123'
  opts.db.database =
    opts.db.database || process.env.MYSQL_DATABASE || 'golf_data'

  // StatsD Config
  opts.statsd = opts.statsd || {}
  opts.statsd.host = opts.statsd.host || process.env.STATSD_HOST || 'localhost'
  opts.statsd.port = opts.statsd.port || process.env.STATSD_PORT || '8125'

  return opts
}

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

module.exports = loadConfig
