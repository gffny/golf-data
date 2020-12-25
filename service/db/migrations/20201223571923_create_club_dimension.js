const COURSE_TABLE_NAME = 'd_golfer'
const TABLE_NAME = 'd_club'

exports.up = function (knex) {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.increments('db_id').primary()
    table.string('short_name', 20).notNullable()
    table.string('long_name', 100).notNullable()
    table.integer('golfer_id').unsigned().notNullable()
    table
      .foreign('golfer_id')
      .references(`${COURSE_TABLE_NAME}.db_id`)
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists(TABLE_NAME)
}
