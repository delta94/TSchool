import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { SqlDAO } from '../Dao/SQLDao';
import bycrypt from 'bcrypt-nodejs';

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
        const validUser = await dao.getOne<PassportUser>('select * from users where username = ?', [username]);
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

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.jwtSecret,
};

p.use(
  'jwt',
  new JWTStrategy(opts, async (jwt_payload: { id: number }, done) => {
    try {
      const validUser = await dao.getOne<PassportUser>('select * from users where id = ?', [jwt_payload.id]);
      if (validUser) {
        done(null, { id: validUser.id, username: validUser.username, type: validUser.type });
      } else {
        done('Invalid Username / Password');
      }
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
  type: 'Admin' | 'Faculty' | 'Student';
}
