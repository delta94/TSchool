import { UserType } from '../utils/controller-validation-types';

export const mockValidCreateUserRequest = {
  body: {
    schoolId: 123,
    username: 'testmantinge',
    password: 'test',
    firstName: 'eric',
    lastName: 'ellbogen',
    address: '522 butfille',
    city: 'montreal',
    postal_code: 'h4w2k3',
    dob: new Date(),
    country: 'canada',
    type: UserType['student'],
  },
};

export const mockInvalidCreateUserRequest = {
  body: {},
};
