import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './UserService/UserServiceController';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      expressPort: string;
      dbHost: string;
      dbUser: string;
      dbPass: string;
      dbDatabase: string;
      dbSqliteFile: string;
    }
  }
}

// Setup so we can use Env Vars (From .env)
dotenv.config();
const app = express();

// Setup Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup Passport
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Attach our routes
app.use(userRoutes);

// Server listen on port from env vars
app.listen(process.env.expressPort, () => {
  console.log(`Listeing on port ${process.env.expressPort}`);
});
