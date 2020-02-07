import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('homework', table => {
    table
      .increments('id')
      .unsigned()
      .primary();
    table.integer('course_id');
    table.string('name');
    table.string('description');
    table.integer('grade_weight');
    table.date('created_at');
    table.date('due_date');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('homework');
}
