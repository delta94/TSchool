import express from 'express';
import dotenv from 'dotenv';
import exampleRoutes from './ExampleService/ExampleServiceRoutes';

/* eslint-disable */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      expressPort: string;
      dbHost: string;
      dbUser: string;
      dbPass: string;
      dbDatabase: string;
    }
  }
}

// Setup so we can use Env Vars (From .env)
dotenv.config();
const app = express();

// Attach our routes
app.use(exampleRoutes);

// Server listen on port from env vars
app.listen(process.env.expressPort, () => {
  console.log(`Listeing on port ${process.env.expressPort}`)
})