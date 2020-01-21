import ExampleRespository from './ExampleRepository';
import SqliteDAO from '../Dao/SQLiteDao';
import { EventListenerBus } from '../EventBus/EventBusListener';
import EventBus from '../EventBus/EventBus';

// The Service class is responsible for orchestration calls to a specific Entity through a Service Interface
// Here we can perform whatever business logic we want on the call we are using
// This is coupled to an Repository of the Service, read Repository for more info
export class ExampleService {
  private repo = new ExampleRespository(SqliteDAO);
  private eventBusListener = new EventListenerBus<ExampleServiceEventMap>(EventBus);

  public doSomethingCool() {
    this.eventBusListener.publish('example.created', {
      example_id: 5,
    });
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

interface ExampleServiceEventMap {
  'example.created': { example_id: number };
  'example.deleted': { example_id: number };
}
