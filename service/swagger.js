const swaggerJSDoc = require('swagger-jsdoc')

const swaggerDefinition = {
  openapi: '3.0.2',
  info: {
    title: 'Golf Data API',
    version: '0.1',
    description: 'Endpoints for the Golf Data API Project',
  },
  host: 'localhost:3000',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
}

const options = {
  swaggerDefinition,
  apis: ['./db/models/*.js', './api/*.js', './api/models/*.js'],
}

const swaggerSpec = swaggerJSDoc(options)

module.exports = swaggerSpec
