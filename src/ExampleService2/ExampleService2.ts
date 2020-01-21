import ExampleRespository2 from './ExampleRepository2';
import SqliteDAO from '../Dao/SQLiteDao';
import { EventListenerBus } from '../EventBus/EventBusListener';
import EventBus from '../EventBus/EventBus';

// The Service class is responsible for orchestration calls to a specific Entity through a Service Interface
// Here we can perform whatever business logic we want on the call we are using
// This is coupled to an Repository of the Service, read Repository for more info
export class ExampleService2 {
  private repo = new ExampleRespository2(SqliteDAO);
  private eventBusListener = new EventListenerBus<ExampleServiceEventMap>(EventBus);

  constructor() {
    this.eventBusListener.subscribe('example.created', example => {
      console.log(example.example_id);
    });
  }

  public doSomethingCool() {}

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

interface ExampleServiceEventMap {
  'example.created': { example_id: number };
  'example.deleted': { example_id: number };
}
