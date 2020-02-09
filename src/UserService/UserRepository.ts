import { AbstractDao } from '../Dao/AbstractDao';
import { CreateUserDTO, DeleteUserDTO } from './controller-validation-types';
import bycrypt from 'bcrypt-nodejs';

export default class UserRepository {
  private dao: AbstractDao;

  constructor(dao: AbstractDao) {
    this.dao = dao;
  }

  public async createUser(createUserDTO: CreateUserDTO) {
    const { schoolId, username, password, type, firstName, lastName, address, city, country, postal_code, dob } = createUserDTO;
    try {
      const sql = `INSERT INTO users (school_id, username, password, type, first_name, last_name, address, city, country, postal_code, date_of_birth, active) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const params = [schoolId, username, bycrypt.hashSync(password), type, firstName, lastName, address, city, country, postal_code, dob, 1];
      const result = await this.dao.run(sql, params);
      return result.id;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async deleteUser(deleteUserDTO: DeleteUserDTO) {
    const { id } = deleteUserDTO;
    try {
      const sql = `UPDATE users set active = 0 WHERE id = ?`;
      const params = [id];
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
