import { AbstractDao } from '../Dao/AbstractDao';
import { CreateStudentDTO } from './controller-validation-types';

// Repository Class is only responsibly for providing an interface
// In order to Get/Set/Update/Delete entries from a database for one entity
// This will access the Example Table and perform CRUD operations
export default class ExampleRepository {
  private dao: AbstractDao;

  constructor(dao: AbstractDao) {
    this.dao = dao;
  }

  public async createStudent(createStudentDTO: CreateStudentDTO) {
    const { schoolId, type, firstName, lastName, address, dob } = createStudentDTO;
    try {
      const sql = `INSERT INTO users (school_id, type, first_name, last_name, address, date_of_birth) VALUES(?, ?, ?, ?, ?, ?)`;
      const params = [schoolId, type, firstName, lastName, address, dob];
      const result = await this.dao.run(sql, params);
      return result.id;
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
