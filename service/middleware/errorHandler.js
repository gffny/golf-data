const {
  ValidationError: DBValidationError,
  NotFoundError: DBNotFoundError,
  DBError,
  UniqueViolationError,
  NotNullViolationError,
  ForeignKeyViolationError,
  CheckViolationError,
  DataError,
} = require('objection')

const { sendEndpointMetrics, buildEndpointName } = require('../utils/statsD')

module.exports = function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  const apiError = getError(err)
  sendEndpointMetrics(req, apiError.status)
  logEndpointError(apiError, req)
  res.status(apiError.status).send({ message: apiError.message })
}

function getError(err) {
  switch (true) {
    // Handle DB errors but don't expose internal errors:
    case err instanceof DBValidationError:
      return buildErrorResponse(400, 'DB Validation error')
    case err instanceof DBNotFoundError:
      return buildErrorResponse(404, 'DB Not Found error')
    case err instanceof UniqueViolationError:
      return buildErrorResponse(409, 'DB Unique Violation error')
    case err instanceof NotNullViolationError:
      return buildErrorResponse(400, 'DB Not Null error')
    case err instanceof ForeignKeyViolationError:
      return buildErrorResponse(409, 'DB Foreign Key error')
    case err instanceof CheckViolationError:
      return buildErrorResponse(400, 'DB Check Violation error')
    case err instanceof DataError:
      return buildErrorResponse(400, 'DB Invalid Data error')
    case err instanceof DBError:
      return buildErrorResponse(400, 'DB error')
    default:
      return buildErrorResponse(500, 'Unknown error')
  }
}

function logEndpointError(apiError, req) {
  const originatingFunction = buildEndpointName(req)
  if (apiError.status > 499) {
    console.log({
      originatingFunction,
      status: apiError.status,
      message: apiError.message,
    })
  } else {
    console.log({
      originatingFunction,
      status: apiError.status,
      message: apiError.message,
    })
  }
}

// Unify error responses. This should conform to Apollo eventually.
function buildErrorResponse(status, message) {
  return {
    status: status,
    message: message,
  }
}
