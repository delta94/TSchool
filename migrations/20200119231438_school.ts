import * as Knex from 'knex';

// Example of Migrations
// Here you can define an Up / Down Method that is called automaticall when you run npm run migrate:up/down
// This will create the Table Schema, and allow us to share the same schema
// Can use this along with seeds (in seeds folder) to share data

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('schools', table => {
    table
      .increments('id')
      .unsigned()
      .primary();
    table.string('name');
    table.string('address');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('schools');
}
