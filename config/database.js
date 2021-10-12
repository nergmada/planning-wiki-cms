const parse = require('pg-connection-string').parse;

module.exports = ({ env }) => {
  const config = parse(env('DATABASE_URL'));
  console.log(env('DATABASE_URL'));
  return ({
    defaultConnection: env('DB_CONNECTION', 'default'),
    connections: {
      postgres: {
        connector: 'bookshelf',
        settings: {
          client: 'postgres',
          host: config.host,
          port: config.port,
          database: config.database,
          username: config.user,
          password: config.password,
          ssl: {
            rejectUnauthorized: false,
          },
        },
        options: {},
      },
      default: {
        connector: 'bookshelf',
        settings: {
          client: 'sqlite',
          filename: env('DATABASE_FILENAME', '.tmp/data.db'),
        },
        options: {
          useNullAsDefault: true,
        },
      },
    },
  })

};
