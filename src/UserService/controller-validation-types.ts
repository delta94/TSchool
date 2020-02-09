import Joi from '@hapi/joi';

enum UserStaffType {
  'faculty',
  'teacher',
}

enum UserType {
  'admin',
  'faculty',
  'teacher',
  'student',
}

///\todo: try to replace above enums with this (if it works)
// type StaffType = 'faculty' | 'teacher';
// type testUserType = StaffType | 'admin' | 'student';

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

export const DeleteUserValidator = Joi.object({
  id: Joi.number().required(),
});

export interface DeleteUserDTO {
  id: number;
}

export const UpdateUserValidator = Joi.object({
  id: Joi.number().required(),
  schoolId: Joi.number().optional(),
  password: Joi.string().optional(),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  address: Joi.string().optional(),
  city: Joi.string().optional(),
  country: Joi.string().optional(),
  postal_code: Joi.string().optional(),
  dob: Joi.date().optional(),
  type: Joi.string().valid('faculty', 'teacher'),
});

export interface UpdateUserDTO {
  id: number;
  schoolId?: number;
  password?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  country?: string;
  postal_code?: string;
  dob?: Date;
  type?: UserStaffType;
}
