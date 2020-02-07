import Joi from '@hapi/joi';

enum UserType {
  'Admin',
  'Faculty',
  'Teacher',
  'Student',
}

export const CreateUserValidator = Joi.object({
  schoolId: Joi.number().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  postal_code: Joi.string().required(),
  dob: Joi.date().required(),
  type: Joi.string().valid('admin', 'faculty', 'teacher', 'student'),
});

export interface CreateUserDTO {
  schoolId: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  postal_code: string;
  dob: Date;
  type: UserType;
}
