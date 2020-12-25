const SERVICE_NAME = 'example'

const endpointStatus = status => `${SERVICE_NAME}.endpoints.${status}`
const endpointResponseTime = () => `${SERVICE_NAME}.endpoints.response_time`
const serviceResponseTime = () => `${SERVICE_NAME}.services.response_time`
const customCounter = (group, value) => `${SERVICE_NAME}.${group}.${value}`

module.exports = {
  endpointStatus,
  endpointResponseTime,
  serviceResponseTime,
  customCounter,
}
