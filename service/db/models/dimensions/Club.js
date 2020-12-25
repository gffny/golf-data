const BaseDimension = require('../base/BaseDimension')
const {
  GENERAL: { ID_COLUMN },
  TABLE_NAMES: { CLUB },
} = require('../../../constants/database')

class Club extends BaseDimension {
  static get tableName() {
    return CLUB
  }

  static get jsonSchema() {
    const superSchema = super.jsonSchema
    return {
      type: superSchema.type,
      required: superSchema.required,
      properties: {
        ...superSchema.properties,
      },
    }
  }

  static get relationMappings() {
    const Golfer = require('./Golfer')
    return {
      golfer: {
        relation: RelationalModel.HasOneRelation,
        modelClass: Golfer,
        join: {
          from: `${this.tableName}.golfer_id`,
          to: `${Golfer.tableName}.${ID_COLUMN}`,
        },
      },
    }
  }
}

module.exports = Club
