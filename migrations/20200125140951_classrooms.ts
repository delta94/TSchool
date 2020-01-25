import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('classrooms', table => {
    table
      .increments('id')
      .unsigned()
      .primary();
    table.string('floor');
    table.string('room_number');
    table.string('capacity');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('classrooms');
}
