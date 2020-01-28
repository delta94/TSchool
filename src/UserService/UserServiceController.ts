import express from 'express';
import UserService from './UserService';
import { CreateUserDTO } from './controller-validation-types';

const userRoutes = express.Router();
const userService = new UserService();

userRoutes.post('/student', async (req, res) => {
  try {
    await CreateUserDTO.validateAsync(req.body);
    const createUserDTO = {
      ...req.body,
      type: 'student',
    };
    res.send(await userService.createStudent(createUserDTO));
  } catch (err) {
    res.status(400).send(err);
  }
});

export default userRoutes;
