import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('studentcourses', table => {
    table.string('student_id');
    table.string('course_id');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('studentcourses');
}
