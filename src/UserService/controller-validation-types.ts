import Joi from '@hapi/joi';

export const CreateUserDTO = Joi.object({
  schoolId: Joi.number().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  address: Joi.string().required(),
  dob: Joi.date().required(),
});

export interface CreateStudentDTO {
  schoolId: number;
  firstName: string;
  lastName: string;
  address: string;
  dob: Date;
  type: 'Student';
}
