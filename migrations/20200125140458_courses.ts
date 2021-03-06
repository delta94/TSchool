import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('courses', table => {
    table
      .increments('id')
      .unsigned()
      .primary();
    table.string('classroom_id');
    table.string('teacher_id');
    table.string('name');
    table.string('subject');
    table.string('start_time_1');
    table.string('start_time_2');
    table.string('duration_1');
    table.string('duration_2');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('courses');
}
