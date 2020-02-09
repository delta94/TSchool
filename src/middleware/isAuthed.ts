import { Request, Response, NextFunction } from 'express';
import { PassportUser } from './passport-local';

export const isStudent = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as PassportUser;
  if (user.type === 'student') {
    return next();
  }
  res.status(401).send('Unauthorized Route');
};

export const isFaculty = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as PassportUser;
  if (user.type === 'faculty') {
    return next();
  }
  res.status(401).send('Unauthorized Route');
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as PassportUser;
  if (user.type === 'admin') {
    return next();
  }
  res.status(401).send('Unauthorized Route');
};

export const isSignedIn = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as PassportUser;
  if (user.type && user.id && user.username) {
    return next();
  }
  res.status(401).send('Unauthorized Route');
};
