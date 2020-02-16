import { Request, Response, NextFunction } from 'express';
import { PassportUser } from './passport-local';

export const isStudent = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as PassportUser;
  if (user && user.type === 'student') {
    return next();
  }
  res.status(401).send('Unauthorized Route');
};

export const isFaculty = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as PassportUser;
  if (user && user.type === 'faculty') {
    return next();
  }
  res.status(401).send('Unauthorized Route');
};

export const isAdmin = (req: Request) => {
  const user = req.user as PassportUser;
  if (user && user.type === 'admin') {
    return true;
  }
  return false;
};

export const isSignedIn = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as PassportUser;
  if (user && user.type && user.id && user.username) {
    return next();
  }
  res.status(401).send('Unauthorized Route');
};

export const isService = (req: Request) => {
  console.log(req.body);
  if (req.body.serviceSecret === process.env.serviceSecret) {
    return true;
  }
  return false;
};

// Middleware passed if one of the supplied ones passes
export const oneOf = (...middlewares: Function[]) => {
  return function(req: Request, res: Response, next: NextFunction) {
    for (const key in middlewares) {
      const result = middlewares[key](req);
      if (result) {
        return next();
      }
    }
    res.status(400).send('Unauthorized Route');
  };
};

// Middleware passed if all of the supplied middleware passes
export const allOf = (...middlewares: Function[]) => {
  return function(req: Request, res: Response, next: NextFunction) {
    for (const key in middlewares) {
      const result = middlewares[key](req);
      if (!result) {
        res.status(400).send('Unauthorized Route');
      }
    }
    return next();
  };
};
