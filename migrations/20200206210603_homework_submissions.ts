import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('homework_submissions', table => {
    table
      .increments('id')
      .unsigned()
      .primary();
    table.integer('homework_id');
    table.integer('student_id');
    table.string('homework_content');
    table.date('submitted_at');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('homework_submissions');
}
