import { AbstractDao } from '../Dao/AbstractDao';
import { CreateStudentDTO } from './controller-validation-types';
import bycrypt from 'bcrypt-nodejs';

export default class UserRepository {
  private dao: AbstractDao;

  constructor(dao: AbstractDao) {
    this.dao = dao;
  }

  public async createStudent(createStudentDTO: CreateStudentDTO) {
    const { schoolId, username, password, type, firstName, lastName, address, city, country, postal_code, dob } = createStudentDTO;
    try {
      const sql = `INSERT INTO users (school_id, username, password, type, first_name, last_name, address, city, country, postal_code, date_of_birth) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const params = [schoolId, username, bycrypt.hashSync(password), type, firstName, lastName, address, city, country, postal_code, dob];
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
