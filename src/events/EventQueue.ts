import Bot from '../bot/Bot';
import BotEvent from './BotEvent';
import EventType from './EventType';

class EventQueue {
  id: EventType;
  queue: Array<BotEvent>;

  constructor(id: EventType) {
    this.id = id;
    this.queue = [];
  }

  addEvent(event : BotEvent) : void {
    this.queue.push(event);
  };

  isEmpty() : boolean {
    return this.queue.length == 0;
  }

  async execute(bot : Bot) : Promise<any> {
    if (this.queue.length > 0) {
      const event = this.queue.shift();
      if (event) {
        const message = await event.execute(bot);
        console.info(message);
        Promise.resolve();
      }
    }
    return Promise.reject();
  }
}

export default EventQueue;
