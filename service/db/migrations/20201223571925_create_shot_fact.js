const COURSE_DIMENSION = 'course'
const GOLFER_DIMENSION = 'golfer'
const SHOT_LOCATION_DIMENSION = 'shot_location_type'
const SHOT_TYPE_DIMENSION = 'shot_type'
const CLUB_DIMENSION = 'club'
const HOLE_DIMENSION = 'hole'
const ROUND_DIMENSION = 'round'
const TABLE_NAME = 'f_shot'

exports.up = function (knex) {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.increments('db_id').primary()
    table.integer(`${COURSE_DIMENSION}_id`).unsigned().notNullable()
    table
      .foreign(`${COURSE_DIMENSION}_id`)
      .references(`d_${COURSE_DIMENSION}.db_id`)
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.integer(`${GOLFER_DIMENSION}_id`).unsigned().notNullable()
    table
      .foreign(`${GOLFER_DIMENSION}_id`)
      .references(`d_${GOLFER_DIMENSION}.db_id`)
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table
      .integer(`source_${SHOT_LOCATION_DIMENSION}_id`)
      .unsigned()
      .notNullable()
    table
      .foreign(`source_${SHOT_LOCATION_DIMENSION}_id`)
      .references(`d_${SHOT_LOCATION_DIMENSION}.db_id`)
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.integer(`target_${SHOT_LOCATION_DIMENSION}_id`).unsigned()
    table
      .foreign(`target_${SHOT_LOCATION_DIMENSION}_id`)
      .references(`d_${SHOT_LOCATION_DIMENSION}.db_id`)
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table
      .integer(`result_${SHOT_LOCATION_DIMENSION}_id`)
      .unsigned()
      .notNullable()
    table
      .foreign(`result_${SHOT_LOCATION_DIMENSION}_id`)
      .references(`d_${SHOT_LOCATION_DIMENSION}.db_id`)
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.integer(`${SHOT_TYPE_DIMENSION}_id`).unsigned()
    table
      .foreign(`${SHOT_TYPE_DIMENSION}_id`)
      .references(`d_${SHOT_TYPE_DIMENSION}.db_id`)
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.integer(`${CLUB_DIMENSION}_id`).unsigned()
    table
      .foreign(`${CLUB_DIMENSION}_id`)
      .references(`d_${CLUB_DIMENSION}.db_id`)
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.integer(`${HOLE_DIMENSION}_id`).unsigned()
    table
      .foreign(`${HOLE_DIMENSION}_id`)
      .references(`d_${HOLE_DIMENSION}.db_id`)
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.integer(`${ROUND_DIMENSION}_id`).unsigned().notNullable()
    table
      .foreign(`${ROUND_DIMENSION}_id`)
      .references(`d_${ROUND_DIMENSION}.db_id`)
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    table.integer('hole_shot').unsigned().notNullable()
    table.integer('round_shot').unsigned().notNullable()
    table.integer('x_diff').unsigned()
    table.integer('y_diff').unsigned()
    table.string('start_gps', 100)
    table.string('end_gps', 100)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists(TABLE_NAME)
}
