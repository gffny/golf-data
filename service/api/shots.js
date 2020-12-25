const express = require('express')
const router = express.Router()

const { sendEndpointMetrics } = require('../utils/statsD')

/**
 * @swagger
 *
 * /api/shots:
 *  get:
 *    tags:
 *      - Example
 *    name: GET example
 *    summary: An example GET endpoint
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID of the associated example
 *        schema:
 *          type: string
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Example'
 *      400:
 *        description: Bad request
 *      404:
 *        description: Example not found
 *      500:
 *        description: Server error
 */
router.get('/:id', async (req, res, next) => {
  try {
    const shotId = req.params.db_id

    sendEndpointMetrics(req) // Send statsD metrics to datadog
    res.json(ExampleDTO.fromDAO(e)) // Send mapped API response object
  } catch (e) {
    return next(e)
  }
})

module.exports = router
