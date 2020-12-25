const { Model, snakeCaseMappers } = require('objection')
const {
  GENERAL: { ID_COLUMN },
  SCHEMA,
} = require('../../../constants/database')

class Base extends Model {
  static get idColumn() {
    return ID_COLUMN
  }

  static get schemaName() {
    return SCHEMA
  }

  static get columnNameMappers() {
    return snakeCaseMappers()
  }

  // Validations
  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        db_id: { type: 'string' },
        created_at: { type: 'timestamp' },
      },
    }
  }

  // Queries
  static getById(id) {
    return this.query().findById(id).throwIfNotFound()
  }
}

module.exports = Base
