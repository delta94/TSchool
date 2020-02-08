import { EventHandler } from './types';

export class EventBus {
  private eventHandlers: EventHandler[] = [];

  public subscribe<K extends keyof Record<string, any>>(eventName: K, callback: (params: Record<string, any>[K], uuid: string) => void) {
    this.eventHandlers.push({ eventName: eventName.toString(), callback });
  }

  public unsubscribe<K extends keyof Record<string, any>>(eventName: K) {
    this.eventHandlers.forEach((eventHandler, i) => {
      if (eventHandler.eventName === eventName) {
        this.eventHandlers.splice(i, 1);
      }
    });
  }

  public publish<K extends keyof Record<string, any>>(eventName: K, params: Record<string, any>[K]) {
    this.eventHandlers.forEach(eventHandler => {
      if (eventHandler.eventName === eventName) {
        eventHandler.callback(params);
      }
    });
  }
}

export default new EventBus();
