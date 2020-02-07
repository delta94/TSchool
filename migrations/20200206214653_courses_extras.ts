import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('courses_extras', table => {
    table
      .increments('id')
      .unsigned()
      .primary();
    table.string('course_id');
    table.string('teacher_id');
    table.enum('type', ['lab', 'tutorial']);
    table.string('name');
    table.string('description');
    table.string('start_time_1');
    table.string('start_time_2');
    table.string('duration_1');
    table.string('duration_2');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('courses_extras');
}
