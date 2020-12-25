const { Model } = require('objection')
const BaseDimension = require('../base/BaseDimension')
const {
  GENERAL: { ID_COLUMN },
  TABLE_NAMES: { COURSE },
} = require('../../../constants/database')

class Course extends BaseDimension {
  static get tableName() {
    return COURSE
  }

  static get relationMappings() {
    const Hole = require('./Hole')
    return {
      holes: {
        relation: Model.HasManyRelation,
        modelClass: Hole,
        join: {
          from: `${this.tableName}.${ID_COLUMN}`,
          to: `${Hole.tableName}.course_id`,
        },
      },
    }
  }
}

module.exports = Course
