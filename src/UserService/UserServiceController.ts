import express from 'express';
import UserService from './UserService';
import { CreateUserDTO } from './controller-validation-types';
import { p as passport } from '../middleware/auth';
import { isSignedIn } from '../middleware/isStudent';

const userRoutes = express.Router();
const userService = new UserService();

// WIP - This will return the users info if hes logged in
userRoutes.get('/student', isSignedIn, async (req, res) => {
  res.send(req.user);
});

// Route to login
userRoutes.post('/student/login', passport.authenticate('local'), async (req, res) => {
  res.send(true);
});

// Route to Create a user
userRoutes.post('/student/create', async (req, res) => {
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
