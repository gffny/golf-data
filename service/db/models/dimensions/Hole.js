const { Model } = require('objection')
const BaseDimension = require('../base/BaseDimension')
const {
  GENERAL: { ID_COLUMN },
  TABLE_NAMES: { HOLE },
} = require('../../../constants/database')

class Hole extends BaseDimension {
  static get tableName() {
    return HOLE
  }

  static get jsonSchema() {
    const superSchema = super.jsonSchema
    return {
      type: superSchema.type,
      required: superSchema.required,
      properties: {
        ...superSchema.properties,
        hole_number: { type: 'number' },
        hole_par: { type: 'number' },
        hole_index: { type: 'number' },
      },
    }
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

module.exports = Hole
