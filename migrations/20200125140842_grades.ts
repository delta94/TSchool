import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('grades', table => {
    table.string('student_id');
    table.string('homework_exam_id');
    table.enu('type', ['homework', 'exam']);
    table.integer('weight');
    table.string('mark');
    table.string('note');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('grades');
}
