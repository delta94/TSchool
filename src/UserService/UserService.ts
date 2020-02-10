import UserRepository from './UserRepository';
import { CreateUserDTO, DeleteUserDTO, UpdateUserDTO } from './controller-validation-types';
import { exist } from 'joi';

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
    const query = `UPDATE users SET`;
    let modifiedQuery = this.addToQueryIfExists(updateUserDTO, query);
    modifiedQuery += ` WHERE id = ?;`;
    const DTOArray = new Array(Object.entries(updateUserDTO).length);
    let counter = 0;
    for (const entry in updateUserDTO) {
      if (this.hasKey(updateUserDTO, entry)) {
        DTOArray[counter] = updateUserDTO[entry];
      }
      counter++;
    }
    const studentId = await this.repo.updateUser(DTOArray, modifiedQuery);
    return studentId;
  }

  addToQueryIfExists(dto: UpdateUserDTO, query: string) {
    let first = true;
    if (dto.schoolId) {
      first ? (query += ` school_id = ?`) : (query += ` ,school_id = ?`);
      first = false;
    }
    if (dto.password) {
      first ? (query += ` password = ?`) : (query += ` ,password = ?`);
      first = false;
    }
    if (dto.firstName) {
      first ? (query += ` first_name = ?`) : (query += ` ,first_name = ?`);
      first = false;
    }
    if (dto.lastName) {
      first ? (query += ` last_name = ?`) : (query += ` ,last_name = ?`);
      first = false;
    }
    if (dto.address) {
      first ? (query += ` address = ?`) : (query += ` ,address = ?`);
      first = false;
    }
    if (dto.city) {
      first ? (query += ` city = ?`) : (query += ` ,city = ?`);
      first = false;
    }
    if (dto.country) {
      first ? (query += ` country = ?`) : (query += ` ,country = ?`);
      first = false;
    }
    if (dto.postal_code) {
      first ? (query += ` postal_code = ?`) : (query += ` ,postal_code = ?`);
      first = false;
    }
    if (dto.type) {
      first ? (query += ` type = ?`) : (query += ` ,type = ?`);
      first = false;
    }
    return query;
  }

  kill() {
    this.repo.kill();
  }
  public hasKey<O>(obj: O, key: keyof any): key is keyof O {
    return key in obj;
  }
}
