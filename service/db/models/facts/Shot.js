const Base = require('../base/Base')
const {
  GENERAL: { ID_COLUMN },
  TABLE_NAMES: { SHOT },
} = require('../../../constants/database')

class Shot extends Base {
  static get tableName() {
    return SHOT
  }

  static get jsonSchema() {
    const superSchema = super.jsonSchema
    return {
      type: superSchema.type,
      required: ['short_name', 'long_name'],
      properties: {
        ...superSchema.properties,
        x_diff: { type: 'number' },
        y_diff: { type: 'number' },
        hole_shot: { type: 'number' },
        round_shot: { type: 'number' },
        start_gps: { type: 'string' },
        end_gps: { type: 'string' },
      },
    }
  }

  static get relationMappings() {
    const Club = require('../dimensions/Club')
    const Course = require('../dimensions/Course')
    const Golfer = require('../dimensions/Golfer')
    const Hole = require('../dimensions/Hole')
    const Round = require('../dimensions/Round')
    const ShotLocationType = require('../dimensions/ShotLocationType')
    const ShotType = require('../dimensions/ShotType')
    return {
      club: {
        relation: RelationalModel.HasOneRelation,
        modelClass: Club,
        join: {
          from: `${this.tableName}.club_id`,
          to: `${Club.tableName}.${ID_COLUMN}`,
        },
      },
      course: {
        relation: RelationalModel.HasOneRelation,
        modelClass: Course,
        join: {
          from: `${this.tableName}.course_id`,
          to: `${Course.tableName}.${ID_COLUMN}`,
        },
      },
      golfer: {
        relation: RelationalModel.HasOneRelation,
        modelClass: Golfer,
        join: {
          from: `${this.tableName}.golfer_id`,
          to: `${Golfer.tableName}.${ID_COLUMN}`,
        },
      },
      hole: {
        relation: RelationalModel.HasOneRelation,
        modelClass: Hole,
        join: {
          from: `${this.tableName}.hole_id`,
          to: `${Hole.tableName}.${ID_COLUMN}`,
        },
      },
      round: {
        relation: RelationalModel.HasOneRelation,
        modelClass: Round,
        join: {
          from: `${this.tableName}.round_id`,
          to: `${Round.tableName}.${ID_COLUMN}`,
        },
      },
      sourceShotLocationType: {
        relation: RelationalModel.HasOneRelation,
        modelClass: ShotLocationType,
        join: {
          from: `${this.tableName}.source_shot_location_type_id`,
          to: `${ShotLocationType.tableName}.${ID_COLUMN}`,
        },
      },
      targetShotLocationType: {
        relation: RelationalModel.HasOneRelation,
        modelClass: ShotLocationType,
        join: {
          from: `${this.tableName}.target_shot_location_type_id`,
          to: `${ShotLocationType.tableName}.${ID_COLUMN}`,
        },
      },
      resultShotLocationType: {
        relation: RelationalModel.HasOneRelation,
        modelClass: ShotLocationType,
        join: {
          from: `${this.tableName}.result_shot_location_type_id`,
          to: `${ShotLocationType.tableName}.${ID_COLUMN}`,
        },
      },
      shotType: {
        relation: RelationalModel.HasOneRelation,
        modelClass: ShotType,
        join: {
          from: `${this.tableName}.shot_type_id`,
          to: `${ShotType.tableName}.${ID_COLUMN}`,
        },
      },
    }
  }
}

module.exports = Shot
