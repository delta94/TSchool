import express from 'express';
import { p as passport } from '../middleware/passport-local';
import { isAdmin } from '../middleware/isAuthed';
import jwt from 'jsonwebtoken';
import { SqlDAO } from '../Dao/SQLDao';
import UserRepository from './UserRepository';
import UserService from './UserService';
import UserController from './UserServiceController';

// Setup Dependencies
const userRoutes = express.Router();
const sqlDao = new SqlDAO();
const userRepo = new UserRepository(sqlDao);
const userService = new UserService(userRepo);
const userController = new UserController(userService);

// Route to Auth. Client calls this on startup, if their token is valid, sets the req.user object
userRoutes.post('/auth', passport.authenticate('jwt'), async (req, res) => {
  res.send(true);
});

// Route to login, if successds sends the user a JWT token
userRoutes.post('/user/login', passport.authenticate('local'), async (req, res) => {
  const jwtToken = jwt.sign(req.user as Express.User, process.env.jwtSecret);
  res.status(200).send(jwtToken);
});

// Route to Logout a User
userRoutes.get('/user/logout', passport.authenticate('logout'), async (req, res) => {
  res.send(true);
});

// Route to Create a user
userRoutes.post('/user', async (req, res) => {
  try {
    const userId = await userController.createUser(req);
    res.status(200).send(userId.toString());
  } catch (err) {
    res.status(400).send(err.toString());
  }
});

// Route to Delete a User
userRoutes.delete('/user', isAdmin, async (req, res) => {
  try {
    const userId = await userController.deleteUser(req);
    res.status(200).send(userId.toString());
  } catch (err) {
    res.status(400).send(err.toString());
  }
});

// Route to get user by their first and last name
userRoutes.get('/user/name' /* , to add when middleware merged in master: oneOf (isAdmin, isFaculty, isTeacher) */, async (req, res) => {
  try {
    const user = await userController.getUserByName(req);
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err.toString());
  }
});

export default userRoutes;
