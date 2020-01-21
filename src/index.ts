import express from 'express';
import dotenv from 'dotenv';
import exampleServiceRoutes from './ExampleService/ExampleServiceRoutes';
import exampleService2Routes from './ExampleService2/ExampleServiceRoutes2';

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

// Attach our routes
app.use(exampleServiceRoutes);
app.use(exampleService2Routes);

// Server listen on port from env vars
app.listen(process.env.expressPort, () => {
  console.log(`Listeing on port ${process.env.expressPort}`);
});
