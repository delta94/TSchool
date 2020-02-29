import UserRepository from './UserRepository';
import { CreateUserDTO, DeleteUserDTO, UserByNameDTO } from './utils/controller-validation-types';

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

  public async userByName(userByNameDTO : any) {
    const user = await this.repo.userByName(userByNameDTO);
    return user;
  }

  kill() {
    this.repo.kill();
  }
}
