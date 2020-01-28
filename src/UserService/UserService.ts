import UserRepository from './UserRepository';
import SqlDAO from '../Dao/SQLDao';
import { CreateStudentDTO } from './controller-validation-types';

export default class UserService {
  private repo = new UserRepository(SqlDAO);

  public async createStudent(createStudentDTO: CreateStudentDTO) {
    const studentId = await this.repo.createStudent(createStudentDTO);
    return `Student Created with Id # ${studentId}`;
  }

  kill() {
    this.repo.kill();
  }
}
