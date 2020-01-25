import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('marks', table => {
    table.string('student_id');
    table.string('course_id');
    table.string('mark');
    table.string('note');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('marks');
}
