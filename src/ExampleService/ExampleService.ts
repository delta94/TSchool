import ExampleRespository from './ExampleRepository';

// The Service class is responsible for orchestration calls to a specific Entity through a Service Interface
// Here we can perform whatever business logic we want on the call we are using
// This is coupled to an Repository of the Service, read Repository for more info
export class ExampleService {
  private repo = new ExampleRespository();

  public doSomethingCool() {
    return 'This is something pretty cool...';
  }

  public async getById(id: number) {
    // Here we get some entry by ID
    // We can perform whatever business logic we need
    // And then return it to the ExampleRoute
    this.repo.getById(id);
  }

  kill() {
    this.repo.kill();
  }
}
