import dotenv from 'dotenv';
dotenv.config();

module.exports = {
  development: {
    // client: 'sqlite3',
    // connection: {
    //   filename: process.env.dbSqliteFile,
    // },
    client: 'mysql',
    connection: {
      host: process.env.dbHost,
      user: process.env.dbUser,
      password: process.env.dbPass,
      database: process.env.dbDatabase,
    },
    useNullAsDefault: true,
    migrations: {
      directory: 'migrations',
    },
  },
};
