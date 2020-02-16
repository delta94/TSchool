import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { SqlDAO } from '../Dao/SQLDao';
import bycrypt from 'bcrypt-nodejs';
import { UserType } from '../UserService/controller-validation-types';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { Strategy as BearerStrategy } from 'passport-http-bearer';

export const p = passport;
const dao = new SqlDAO();

p.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username: string, password: string, done: Function) => {
      try {
        const validUser = await dao.getOne<PassportUser>('select * from users where username = ? AND active = 1', [username]);
        if (bycrypt.compareSync(password, validUser.password)) {
          done(null, { id: validUser.id, username: validUser.username, type: validUser.type });
        } else {
          done('Invalid Username / Password');
        }
      } catch (err) {
        done(JSON.stringify(err));
      }
    },
  ),
);

p.use(
  'jwt',
  new BearerStrategy(async (token: string, done) => {
    const jwtPayload = jwt.decode(token) as JwtPayload;
    try {
      const validUser = await dao.getOne<PassportUser>('SELECT * from users WHERE id = ?', [jwtPayload.id]);
      if (validUser) {
        const isBlacklistedToken = await dao.getOne<PassportUser>('SELECT * from invalidated_jwt_tokens where jwt_token = ?', [token]);
        if (!isBlacklistedToken) {
          done(null, { id: validUser.id, username: validUser.username, type: validUser.type });
        }
      }
      done('Authentication failed');
    } catch (err) {
      done(JSON.stringify(err));
    }
  }),
);

p.serializeUser((user, cb) => {
  cb(null, user);
});

p.deserializeUser((user, cb) => {
  cb(null, user);
});

export interface PassportUser {
  id: number;
  username: string;
  password: string;
  type: 'admin' | 'faculty' | 'student';
}

export interface JwtPayload {
  id: number;
  username: string;
  type: UserType;
  iat: number;
}
