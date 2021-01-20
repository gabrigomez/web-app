// Update with your config settings.
const { database } = require('./.env')

module.exports = {
    client: 'postgresql',
    connection: database,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

  
