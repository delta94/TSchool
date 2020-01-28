import { Request, Response, NextFunction } from 'express';
import { PassportUser } from './auth';

export const isStudent = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as PassportUser;
  if (user.type === 'Student') {
    return next();
  }
  res.status(401).send('Unauthorized Route');
};

export const isFaculty = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as PassportUser;
  if (user.type === 'Faculty') {
    return next();
  }
  res.status(401).send('Unauthorized Route');
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as PassportUser;
  if (user.type === 'Admin') {
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
