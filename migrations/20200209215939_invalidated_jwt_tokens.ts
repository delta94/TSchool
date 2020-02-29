import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('invalidated_jwt_tokens', table => {
      table
        .increments('id')
        .unsigned()
        .primary();
      table.string('jwt_token');
    });
  }
  
  export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('invalidated_jwt_tokens');
  }
  

