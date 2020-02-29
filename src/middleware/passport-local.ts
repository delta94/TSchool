import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { SqlDAO } from '../Dao/SQLDao';
import bycrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { JwtPayload } from './passport-types';
import { UserType } from '../UserService/utils/controller-validation-types';

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
          return done(null, setPassportUser(validUser));
        } else {
          return done('Invalid Username / Password');
        }
      } catch (err) {
        return done(JSON.stringify(err));
      }
    },
  ),
);

p.use('jwt', new BearerStrategy(async (token: string, done) => {
    const jwtPayload = jwt.decode(token) as JwtPayload;
    try {
      const validUser = await dao.getOne<PassportUser>('SELECT * from users WHERE id = ?', [jwtPayload.id]);
      if (validUser) {
        const isBlacklistedToken = await dao.getOne<PassportUser>('SELECT * from invalidated_jwt_tokens where jwt_token = ?', [token]);
        if (!isBlacklistedToken){
          return done(null, setPassportUser(validUser));
        }
      }
      return done('Authentication failed');
    } catch (err) {
      return done(JSON.stringify(err));
    }
  }),
);


p.use('logout',  new BearerStrategy(async (token: string, done) => {
  const jwtPayload = jwt.decode(token) as JwtPayload;
    try {
      await dao.getOne<PassportUser>(`INSERT INTO invalidated_jwt_tokens (jwt_token) VALUES(?)`, [jwtPayload.id]);
      return done(null, {});
    } catch (err) {
      return done(JSON.stringify(err));
    }
  })
);

p.serializeUser((user, cb) => {
  cb(null, user);
});

p.deserializeUser((user, cb) => {
  cb(null, user);
});

// keys should match table column labels
export interface PassportUser {
  id: number;
  username: string;
  password: string;
  school_id: string;
  type: UserType;
}

export const setPassportUser = (validUser: PassportUser) => {
  return { 
    id: validUser.id,
    username: validUser.username,
    schoolId: validUser.school_id,
    type: validUser.type
  }
}