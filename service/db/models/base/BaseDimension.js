const Base = require('./Base')

class BaseDimension extends Base {
  static get idColumn() {
    return 'db_id'
  }

  static get jsonSchema() {
    const superSchema = super.jsonSchema
    return {
      type: superSchema.type,
      required: ['short_name', 'long_name'],
      properties: {
        ...superSchema.properties,
        short_name: { type: 'string' },
        long_name: { type: 'string' },
      },
    }
  }
}

module.exports = BaseDimension
