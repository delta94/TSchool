import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const knexClient = knex({
  client: 'sqlite3',
  connection: {
    filename: process.env.dbSqliteFile,
  },
  useNullAsDefault: true,
});

export default knexClient;
