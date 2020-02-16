import { Request } from 'express';
import UserService from './UserService';
import { CreateUserValidator, CreateUserDTO, DeleteUserValidator, DeleteUserDTO } from './controller-validation-types';

export default class UserController {
  private service: UserService;

  constructor(service: UserService) {
    this.service = service;
  }

  public async createUser(req: Request) {
    await CreateUserValidator.validateAsync(req.body);
    const createUserDTO: CreateUserDTO = req.body;
    const userId = await this.service.createUser(createUserDTO);
    return userId;
  }

  public async deleteUser(req: Request) {
    await DeleteUserValidator.validateAsync(req.body);
    const deleteUserDTO: DeleteUserDTO = req.body;
    const userId = await this.service.deleteUser(deleteUserDTO);
    return userId;
  }

  public async logoutUser(req: Request) {
    const jwtToken = req.headers.authorization?.split(' ')[1];
    if (!jwtToken){
      return false;
    }
    const userId = await this.service.logoutUser(jwtToken);
    return userId;
  }
}
