import UserRepository from './UserRepository';
import { CreateUserDTO, DeleteUserDTO } from './controller-validation-types';

export default class UserService {
  private repo: UserRepository;

  constructor(repo: UserRepository) {
    this.repo = repo;
  }

  public async createUser(createUserDTO: CreateUserDTO) {
    const studentId = await this.repo.createUser(createUserDTO);
    return studentId;
  }

  public async deleteUser(deleteUserDTO: DeleteUserDTO) {
    const studentId = await this.repo.deleteUser(deleteUserDTO);
    return studentId;
  }

  kill() {
    this.repo.kill();
  }
}
