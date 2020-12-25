const BaseDimension = require('../base/BaseDimension')
const {
  TABLE_NAMES: { SHOT_LOCATION_TYPE },
} = require('../../../constants/database')

class ShotLocationType extends BaseDimension {
  static get tableName() {
    return SHOT_LOCATION_TYPE
  }
}

module.exports = ShotLocationType
