import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('users', table => {
    table
      .increments('id')
      .unsigned()
      .primary();
    table.string('school_id');
    table.string('username').unique();
    table.string('password');
    table.enum('type', ['admin', 'faculty', 'teacher', 'student']);
    table.string('first_name');
    table.string('last_name');
    table.string('date_of_birth');
    table.string('address');
    table.string('city');
    table.string('country');
    table.string('postal_code');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('users');
}
