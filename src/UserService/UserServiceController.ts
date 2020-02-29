import { Request } from 'express';
import UserService from './UserService';
import { CreateUserValidator, CreateUserDTO, DeleteUserValidator, DeleteUserDTO, UserByNameValidator, UserByNameDTO, UserSessionInfo } from './utils/controller-validation-types';


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

  public async getUserByName(req: Request) {
    const { schoolId } = req.user as UserSessionInfo;
    const requestBody = { ...req.body, schoolId };
    await UserByNameValidator.validateAsync(requestBody);
    const userByNameDTO: UserByNameDTO = requestBody;
    
    const user = await this.service.userByName(userByNameDTO);
    return user;
  }
}

