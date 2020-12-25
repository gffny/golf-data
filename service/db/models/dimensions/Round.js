const { Model } = require('objection')
const BaseDimension = require('../base/BaseDimension')
const {
  GENERAL: { ID_COLUMN },
  TABLE_NAMES: { ROUND },
} = require('../../../constants/database')

class Round extends BaseDimension {
  static get tableName() {
    return ROUND
  }

  static get relationMappings() {
    const Course = require('./Course')
    return {
      course: {
        relation: Model.HasOneRelation,
        modelClass: Course,
        join: {
          from: `${this.tableName}.course_id`,
          to: `${Course.tableName}.${ID_COLUMN}`,
        },
      },
    }
  }
}

module.exports = Round
