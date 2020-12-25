const sampleClubs = require('../seeds/sample-dimensions-clubs.json')
const sampleCourses = require('../seeds/sample-dimensions-courses.json')
const sampleHoles = require('../seeds/sample-dimensions-holes.json')
const sampleGolfers = require('../seeds/sample-dimensions-golfers.json')
const sampleRounds = require('../seeds/sample-dimensions-rounds.json')
const sampleShotLocationTypes = require('../seeds/sample-dimensions-shot-location-types.json')
const sampleShotTypes = require('../seeds/sample-dimensions-shot-types.json')
const sampleShots = require('../seeds/sample-facts-shots.json')

const Club = require('../models/dimensions/Club')
const Course = require('../models/dimensions/Course')
const Hole = require('../models/dimensions/Hole')
const Golfer = require('../models/dimensions/Golfer')
const Round = require('../models/dimensions/Round')
const ShotLocationType = require('../models/dimensions/ShotLocationType')
const ShotType = require('../models/dimensions/ShotType')
const Shot = require('../models/facts/Shot')

exports.seed = async knex => {
  // In this code it is necessary to instantiate a new connection for each
  // interaction. Failing to do so leads to some problems around transactions
  // not completing in unpredictable ways.

  // DONE IN A SPECIFIC ORDER TO ALLOW FOR DELETING OF REFERRED DATA
  await knex(Club.tableName).del()
  await knex(Course.tableName).del()
  await knex(Hole.tableName).del()
  await knex(Golfer.tableName).del()
  await knex(Round.tableName).del()
  await knex(ShotLocationType.tableName).del()
  await knex(ShotType.tableName).del()
  await knex(Shot.tableName).del()

  await knex(Course.tableName).insert(sampleCourses)
  await knex(Hole.tableName).insert(sampleHoles)
  await knex(Golfer.tableName).insert(sampleGolfers)
  await knex(Club.tableName).insert(sampleClubs)
  await knex(Round.tableName).insert(sampleRounds)
  await knex(ShotLocationType.tableName).insert(sampleShotLocationTypes)
  await knex(ShotType.tableName).insert(sampleShotTypes)
  await knex(Shot.tableName).insert(sampleShots)
}

const blah = []
