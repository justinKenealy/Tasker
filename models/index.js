const { Pool } = require('pg')

const db = new Pool({
  database: 'tasker',
  password: 'password',
})

module.exports = db
