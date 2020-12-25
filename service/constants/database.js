const GENERAL = { ID_COLUMN: 'db_id' }

const OPERATIONAL = {
  SEED_LOCATION: './db/seeds',
}

const SCHEMA = 'golf_data'

const TABLE_NAMES = {
  CLUB: 'd_club',
  COURSE: 'd_course',
  HOLE: 'd_hole',
  GOLFER: 'd_golfer',
  ROUND: 'd_round',
  SHOT_LOCATION_TYPE: 'd_shot_location_type',
  SHOT_TYPE: 'd_shot_type',
  SHOT: 'f_shot',
}

module.exports = {
  GENERAL,
  OPERATIONAL,
  SCHEMA,
  TABLE_NAMES,
}
