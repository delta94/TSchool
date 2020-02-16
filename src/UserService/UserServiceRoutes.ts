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

// Route to Logout a User
userRoutes.get('/user/logout', isAdmin, async (req, res) => {
  try {
    const userId = await userController.logoutUser(req);
    res.status(200).send(userId.toString());
  } catch (err) {
    res.status(400).send(err.toString());
  }
});

export default userRoutes;
