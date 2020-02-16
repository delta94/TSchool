import UserService from '../UserService';
import { SqlDAO } from '../../Dao/SQLDao';
import sinon from 'sinon';
import UserRepository from '../UserRepository';
import { mockValidCreateUserRequest, mockInvalidCreateUserRequest } from './mocks';
import { expect } from 'chai';
import UserController from '../UserServiceController';

describe('User Service Test', () => {
  // Stub our DAO and Repository
  const dao = new SqlDAO();
  const repo = new UserRepository(dao);
  const service = new UserService(repo);
  const controller = new UserController(service);

  after(() => {
    service.kill();
  });

  describe('Creating a User', () => {
    const userId = 5;

    let createUserStub : sinon.SinonStub<any>;
    before(() => {
      createUserStub = sinon.stub(service, 'createUser').callsFake(async (..._args) => {
        return userId;
      });
    });

    after(() => {
      createUserStub.restore();
    });

    it('Can Create a user with a valid DTO', async () => {
      const res = await controller.createUser(mockValidCreateUserRequest as any);
      expect(res).to.equal(userId);
    });

    it('Cannot Create a user with an invalid DTO', async () => {
      await controller.createUser(mockInvalidCreateUserRequest as any).catch(err => {
        expect(err).to.be.an('error');
      });
    });
  });
});
