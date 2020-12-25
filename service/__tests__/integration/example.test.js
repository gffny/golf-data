jest.mock('../../services/exampleService')

const request = require('supertest')
const makeService = require('../../server')
const loadConfig = require('../../config')
const Example = require('../../db/models/Example')
const { exampleExternalServiceCall } = require('../../services/exampleService')
const { NotFoundError: DBNotFoundError } = require('objection')

const { EXAMPLE_MOCK } = require('../mocks/example')

describe('Example API Integration test', () => {
  let server, agent

  beforeEach(async done => {
    Example.getExampleById = jest.fn().mockReturnValue(EXAMPLE_MOCK)
    exampleExternalServiceCall.mockImplementation(() => Promise.resolve())

    server = makeService(await loadConfig({ testing: true })).listen(
      4000,
      err => {
        if (err) return done(err)
        agent = request.agent(server)
        done()
      },
    )
  })

  afterEach(async done => {
    jest.resetAllMocks()
    return server && (await server.close(done))
  })

  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500))
  })

  describe('GET /api/examples', () => {
    it('should return an Example for a given exampleId', async () => {
      const response = await agent.get(`/api/examples/${EXAMPLE_MOCK.id}`)
      const responseBody = JSON.parse(response.text)

      expect(response.status).toBe(200)
      expect(responseBody.id).toBe(EXAMPLE_MOCK.id)
      expect(responseBody.text).toBe(EXAMPLE_MOCK.text)

      expect(Example.getExampleById).toHaveBeenCalledTimes(1)
      expect(Example.getExampleById).toHaveBeenCalledWith(EXAMPLE_MOCK.id)

      expect(exampleExternalServiceCall).toHaveBeenCalledTimes(1)
    })

    it('should return a 400 status if a bad ID was provided', async () => {
      const response = await agent.get(
        `/api/examples/this-will-fail-validation-1234`,
      )

      expect(response.status).toBe(400)
      expect(Example.getExampleById).toHaveBeenCalledTimes(0)
      expect(exampleExternalServiceCall).toHaveBeenCalledTimes(0)
    })

    it('should return a 404 status if no example for the given ID was found', async () => {
      Example.getExampleById.mockImplementation(() => {
        throw new DBNotFoundError()
      })

      const response = await agent.get(`/api/examples/${EXAMPLE_MOCK.id}`)

      expect(response.status).toBe(404)

      expect(Example.getExampleById).toHaveBeenCalledTimes(1)
      expect(Example.getExampleById).toHaveBeenCalledWith(EXAMPLE_MOCK.id)

      expect(exampleExternalServiceCall).toHaveBeenCalledTimes(0)
    })

    it('should return a 500 if the call to the third-party service failed', async () => {
      exampleExternalServiceCall.mockImplementation(() => {
        throw new Error('Booom')
      })

      const response = await agent.get(`/api/examples/${EXAMPLE_MOCK.id}`)

      expect(response.status).toBe(500)

      expect(Example.getExampleById).toHaveBeenCalledTimes(1)
      expect(Example.getExampleById).toHaveBeenCalledWith(EXAMPLE_MOCK.id)

      expect(exampleExternalServiceCall).toHaveBeenCalledTimes(1)
    })
  })
})
