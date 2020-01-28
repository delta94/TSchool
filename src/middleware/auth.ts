import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import SQLDao from '../Dao/SQLDao';

export const p = passport;

p.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username: string, password: string, done: Function) => {
      try {
        const validUser = await SQLDao.getOne<PassportUser>('select * from users where username = ? AND password = ?', [
          username,
          password,
        ]);
        done(null, { id: validUser.id, username: validUser.username, type: validUser.type });
      } catch (err) {
        done(JSON.stringify(err));
      }
    },
  ),
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
  type: 'Admin' | 'Faculty' | 'Student';
}
