import * as Knex from 'knex';

// Example Migration File
// If you want to share some base data with me
// You can create some mock data to insert into the table of your choice
// You can define an interface and use a generic to provide typing to your insert statement

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex('school')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex<School>('school').insert([
        { id: 1, name: 'rowValue1', address: 'test' },
        { id: 2, name: 'rowValue2', address: 'test' },
        { id: 3, name: 'rowValue3', address: 'test' },
      ]);
    });
}

interface School {
  id: number;
  name: string;
  address: string;
}
