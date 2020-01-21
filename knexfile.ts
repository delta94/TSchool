import dotenv from 'dotenv';
dotenv.config();

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: process.env.dbSqliteFile,
    },
    useNullAsDefault: true,
    migrations: {
      directory: 'migrations',
    },
  },
};
