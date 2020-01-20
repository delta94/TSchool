import { AbstractDao } from '../Dao/AbstractDao';

// Repository Class is only responsibly for providing an interface
// In order to Get/Set/Update/Delete entries from a database for one entity
// This will access the Example Table and perform CRUD operations
export default class ExampleRepository {
  private dao: AbstractDao;

  constructor(dao: AbstractDao) {
    this.dao = dao;
  }

  public async getById(entityId: number) {
    try {
      const sql = `SELECT * from example WHERE id = ?`;
      const params = [entityId];
      const result = await this.dao.getOne<ExampleRow>(sql, params);
      return result.name;
    } catch (err) {
      throw new Error(err);
    }
  }

  public kill(): void {
    this.dao.kill();
  }
}

interface ExampleRow {
  id: number;
  name: string;
}
