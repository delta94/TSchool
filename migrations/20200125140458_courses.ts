import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('courses', table => {
    table
      .increments('id')
      .unsigned()
      .primary();
    table.string('classroom_id');
    table.string('name');
    table.string('subject');
    table.string('start_time');
    table.string('duration');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('courses');
}
