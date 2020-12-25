const { log } = require('./functions')

class Logger {
  constructor(service) {
    this._service = service
  }

  _callLog(
    logLevel,
    { functionName: originatingFunction, title, data, message },
  ) {
    const logMessage = message
      ? `${message}${data ? ` | data: ${JSON.stringify(data)}` : ''}`
      : data
    const logTitle = title

    const funcIsString =
      typeof originatingFunction === 'string' ||
      originatingFunction instanceof String
    const logOriginatingFunction = `${this._service}.${
      funcIsString ? originatingFunction : originatingFunction.name
    }`
    log(logOriginatingFunction, logLevel, logTitle, logMessage)
  }

  /**
   *
   * @param {*} functionName
   * @param {*} title
   * @param {*} message
   * @param {*} data
   */
  info(args) {
    this._callLog('info', args)
  }

  /**
   *
   * @param {*} functionName
   * @param {*} title
   * @param {*} message
   * @param {*} data
   */
  debug(args) {
    this._callLog('debug', args)
  }

  /**
   *
   * @param {*} functionName
   * @param {*} title
   * @param {*} message
   * @param {*} data
   */
  warn(args) {
    this._callLog('warn', args)
  }

  /**
   *
   * @param {*} functionName
   * @param {*} title
   * @param {*} message
   * @param {*} data
   */
  error(args) {
    this._callLog('error', args)
  }
}

module.exports = Logger
