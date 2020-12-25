const { buildEndpointName } = require('../../utils/statsD')

const testSimpleReq = {
  method: 'GET',
  originalUrl: '/api/ping',
}

const testUUIdReq = {
  method: 'GET',
  originalUrl: '/api/accounts/00112233-4455-6677-8899-aabbccddeeff',
}

const testIdReq = {
  method: 'GET',
  originalUrl: '/api/cases/4',
}

const testSuffixReq = {
  method: 'POST',
  originalUrl: '/api/payments/0000332d-2649-4e09-8680-7e8463dd714b/decisions',
}

const testComplicatedReq = {
  method: 'GET',
  originalUrl:
    '/api/accounts/0000332d-1111-4e09-8680-7e8463dd714b/reviews/actions?type=OK&status=3',
}

describe('StatsD utility', () => {
  test('buildEndpointName on simple request', () => {
    const endpointName = buildEndpointName(testSimpleReq)
    expect(endpointName).toBe('get_ping')
  })

  test('buildEndpointName on request with uuid param', () => {
    const endpointName = buildEndpointName(testUUIdReq)
    expect(endpointName).toBe('get_accounts')
  })

  test('buildEndpointName on request with numeric id param', () => {
    const endpointName = buildEndpointName(testIdReq)
    expect(endpointName).toBe('get_cases')
  })

  test('buildEndpointName on request with an endpoint with suffix', () => {
    const endpointName = buildEndpointName(testSuffixReq)
    expect(endpointName).toBe('post_payments_decisions')
  })

  test('buildEndpointName on complicated request', () => {
    const endpointName = buildEndpointName(testComplicatedReq)
    expect(endpointName).toBe('get_accounts_reviews_actions')
  })
})
