import { EventBus } from './EventBus';

// Any service can instantiate an EventBusListener with the Global EventBus
// This will provide you Custom Type Autocompletion depending on your Generic EventMap you send in
export class EventListenerBus<T extends Record<string, any>> {
  public bus: EventBus;

  constructor(bus: EventBus) {
    this.bus = bus;
  }

  public subscribe<K extends keyof T>(eventName: K, callback: (params: T[K], uuid: string) => void) {
    this.bus.subscribe(eventName.toString(), callback);
  }

  public unsubscribe<K extends keyof T>(eventName: K) {
    this.bus.unsubscribe(eventName.toString());
  }

  public publish<K extends keyof T>(eventName: K, params: T[K]) {
    this.bus.publish(eventName.toString(), params);
  }
}
