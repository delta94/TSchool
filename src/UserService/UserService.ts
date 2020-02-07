import UserRepository from './UserRepository';
import { CreateUserDTO } from './controller-validation-types';

export default class UserService {
  private repo: UserRepository;

  constructor(repo: UserRepository) {
    this.repo = repo;
  }

  public async createUser(createUserDTO: CreateUserDTO) {
    const studentId = await this.repo.createUser(createUserDTO);
    return studentId;
  }

  kill() {
    this.repo.kill();
  }
}
