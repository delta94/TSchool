import UserRepository from './UserRepository';
import { CreateUserDTO, DeleteUserDTO, UpdateUserDTO } from './controller-validation-types';

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

  public async updateUser(updateUserDTO: UpdateUserDTO) {
    if (Object.entries(updateUserDTO).length < 2) {
      throw new Error('Error in updateUser: did not update anything');
    }
    let query = `UPDATE users SET `;
    query += ` WHERE id = ?`;
    const studentId = await this.repo.updateUser(updateUserDTO, query);
    return Object.entries(updateUserDTO).length;
  }

  // addToQueryIfExists(dto: CreateUserDTO, query: String){
  //   //addToQueryIfItExists(dto.password, `password = ?`, first);

  //   let first : boolean = true;
  //   if (dto.schoolId) {
  //     query += `school_id = ?,`;
  //   }
  //   if (dto.password) {
  //     query += `password = ?,`;
  //   }
  //   if (dto.firstName) {
  //     query += `first_name = ?,`;
  //   }
  //   if (dto.lastName) {
  //     query += `last_name = ?,`;
  //   }
  //   if (dto.address) {
  //     query += `address = ?,`;
  //   }
  //   if (dto.city) {
  //     query += `city = ?,`;
  //   }
  //   if (dto.country) {
  //     query += `country = ?,`;
  //   }
  //   if (dto.postal_code) {
  //     query += `postal_code = ?,`;
  //   }
  //   if (dto.type) {
  //     query += `type = ?,`;
  //   }
  // }

  // public addToQueryIfItExists<T>(param: T, query: String, first: boolean){
  //   if (typeof addToQueryIfItExists<T>.counter )
  // }

  kill() {
    this.repo.kill();
  }
}
