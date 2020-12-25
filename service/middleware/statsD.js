/* eslint-disable */
function makeStatsDMiddleware(config) {
  const middleware = (req, res, next) => {
    req.startTime = new Date().getTime()
    next()
  }
  return middleware
}

module.exports = makeStatsDMiddleware
