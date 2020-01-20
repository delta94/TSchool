module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: 'database/schools.sqlite3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: 'migrations',
    },
  },
};
