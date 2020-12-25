const BaseDimension = require('../base/BaseDimension')
const {
  GENERAL: { ID_COLUMN },
  TABLE_NAMES: { GOLFER },
} = require('../../../constants/database')

class Golfer extends BaseDimension {
  static get tableName() {
    return GOLFER
  }

  static get relationMappings() {
    const Club = require('./Club')
    return {
      clubs: {
        relation: RelationalModel.HasMany,
        modelClass: Club,
        join: {
          from: `${this.tableName}.${ID_COLUMN}`,
          to: `${Club.tableName}.golfer_id`,
        },
      },
    }
  }
}

module.exports = Golfer
