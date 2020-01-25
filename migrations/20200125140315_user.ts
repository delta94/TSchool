import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('users', table => {
    table
      .increments('id')
      .unsigned()
      .primary();
    table.string('school_id');
    table.string('name');
    table.string('address');
    table.string('date_of_birth');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('users');
}
