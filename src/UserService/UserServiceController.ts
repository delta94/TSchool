import express from 'express';
import UserService from './UserService';
import { CreateUserValidator, CreateUserDTO, DeleteUserValidator, DeleteUserDTO, UpdateUserValidator, UpdateUserDTO } from './controller-validation-types';
import { p as passport } from '../middleware/passport-local';
import UserRepository from './UserRepository';
import { SqlDAO } from '../Dao/SQLDao';
import jwt from 'jsonwebtoken';
import { isAdmin } from '../middleware/isAuthed';

const userRoutes = express.Router();
const userService = new UserService(new UserRepository(new SqlDAO()));

// Route to Auth. Client calls this on startup, if their token is valid, sets the req.user object
userRoutes.post('/auth', passport.authenticate('jwt'), async (req, res) => {
  res.send(true);
});

// Route to login, if successds sends the user a JWT token
userRoutes.post('/user/login', passport.authenticate('local'), async (req, res) => {
  const jwtToken = jwt.sign(req.user as Express.User, process.env.jwtSecret);
  res.status(200).send(jwtToken);
});

// Route to Create a User
userRoutes.post('/user', async (req, res) => {
  console.log('creating user');
  try {
    await CreateUserValidator.validateAsync(req.body);
    const createUserDTO: CreateUserDTO = req.body;
    const userId = await userService.createUser(createUserDTO);
    res.status(200).send(userId.toString());
  } catch (err) {
    res.status(400).send(err.toString());
  }
});

// Route to Delete a User
userRoutes.delete('/user', isAdmin, async (req, res) => {
  try {
    await DeleteUserValidator.validateAsync(req.body);
    const deleteUserDTO: DeleteUserDTO = req.body;
    await userService.deleteUser(deleteUserDTO);
    res.status(200).send(true);
  } catch (err) {
    res.status(400).send(err.toString());
  }
});

// Route to Update a User
userRoutes.put('/user', isAdmin, async (req, res) => {
  try {
    await UpdateUserValidator.validateAsync(req.body);
    const updateUserDTO: UpdateUserDTO = req.body;
    const test = await userService.updateUser(updateUserDTO);
    console.log(test.toString());
    res.status(200).send(true);
  } catch (err) {
    res.status(400).send(err.toString());
  }
});

export default userRoutes;
