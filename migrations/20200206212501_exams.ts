import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('exams', table => {
    table
      .increments('id')
      .unsigned()
      .primary();
    table.integer('course_id');
    table.integer('classroom_id');
    table.enum('type', ['midterm', 'final', 'quiz']);
    table.integer('grade_weight');
    table.boolean('required');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('exams');
}
