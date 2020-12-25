const BaseDimension = require('../base/BaseDimension')
const {
  TABLE_NAMES: { SHOT_TYPE },
} = require('../../../constants/database')

class ShotType extends BaseDimension {
  static get tableName() {
    return SHOT_TYPE
  }
}

module.exports = ShotType
