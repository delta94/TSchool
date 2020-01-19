import express from 'express';
import { ExampleService } from './ExampleService';
const exampleRoutes = express.Router();
const exampleService = new ExampleService();

exampleRoutes.get('/example', async (req, res) => {
  const exampleServiceResponse = exampleService.doSomethingCool();
  res.send(exampleServiceResponse);
});

export default exampleRoutes;
