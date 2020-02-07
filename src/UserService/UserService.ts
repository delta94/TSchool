import UserRepository from './UserRepository';
import { CreateStudentDTO } from './controller-validation-types';

export default class UserService {
  private repo: UserRepository;

  constructor(repo: UserRepository) {
    this.repo = repo;
  }

  public async createStudent(createStudentDTO: CreateStudentDTO) {
    // business logic
    const studentId = await this.repo.createStudent(createStudentDTO);
    return studentId;
  }

  kill() {
    this.repo.kill();
  }
}
