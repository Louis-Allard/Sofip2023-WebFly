// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      port: 3306,
      user: 'webfly',
      password: 'bLJ-9v7UFrhp(wdo',
      database: 'webfly',
      filename: './dev.mysql2'
    }
  },

  staging: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      port: 3306,
      user: 'webfly',
      password: 'bLJ-9v7UFrhp(wdo',
      database: 'webfly',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      port: 3306,
      user: 'webfly',
      password: 'bLJ-9v7UFrhp(wdo',
      database: 'webfly'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
