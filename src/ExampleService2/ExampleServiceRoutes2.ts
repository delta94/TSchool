import express from 'express';
import { ExampleService2 } from './ExampleService2';

const exampleRoutes = express.Router();
const exampleService = new ExampleService2();

exampleRoutes.get('/example2', async (req, res) => {
  const exampleServiceResponse = exampleService.doSomethingCool();
  res.send(exampleServiceResponse);
});

export default exampleRoutes;
