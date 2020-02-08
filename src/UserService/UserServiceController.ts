import express from 'express';
import UserService from './UserService';
import { CreateUserValidator, CreateUserDTO } from './controller-validation-types';
import { p as passport } from '../middleware/passport-local';
import UserRepository from './UserRepository';
import { SqlDAO } from '../Dao/SQLDao';

const userRoutes = express.Router();
const userService = new UserService(new UserRepository(new SqlDAO()));

// Route to login
userRoutes.post('/user/login', passport.authenticate('local'), async (req, res) => {
  res.send(true);
});

// Route to Create a user
userRoutes.post('/user', async (req, res) => {
  try {
    await CreateUserValidator.validateAsync(req.body);
    const createUserDTO: CreateUserDTO = req.body;
    const userId = await userService.createUser(createUserDTO);
    res.status(200).send(userId.toString());
  } catch (err) {
    res.status(400).send(err);
  }
});

export default userRoutes;
