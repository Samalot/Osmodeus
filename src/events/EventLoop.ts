import EventQueue from './EventQueue';
import EventType from './EventType';
import BotEvent from './BotEvent';
import Bot from '../bot/Bot';

class EventLoop {
  bot: Bot;
  elevated: EventQueue;
  core: EventQueue;
  sell: EventQueue;
  transfer: EventQueue;
  auction: EventQueue;

  constructor(bot : Bot) {
    this.bot = bot;
    this.elevated = new EventQueue(EventType.Elevated);
    this.core = new EventQueue(EventType.Core);
    this.sell = new EventQueue(EventType.Sell);
    this.transfer = new EventQueue(EventType.Transfer);
    this.auction = new EventQueue(EventType.Auction);
  }

  addEvent(event : BotEvent, type : EventType) : void {
    switch(type) {
      case EventType.Elevated:
        return this.elevated.addEvent(event);
      case EventType.Core:
        return this.core.addEvent(event);
      case EventType.Sell:
        return this.sell.addEvent(event);
      case EventType.Transfer:
        return this.transfer.addEvent(event);
      case EventType.Auction:
        return this.auction.addEvent(event);
      default:
        return this.core.addEvent(event);
    }
  };

  async execute() : Promise<any> {
    if (this.shouldExecute()) {
      if (!this.elevated.isEmpty()) { await this.elevated.execute(this.bot).catch(() => {}); }
      else if (!this.core.isEmpty()) { await this.core.execute(this.bot).catch(() => {}); }
      else if (!this.sell.isEmpty()) { await this.sell.execute(this.bot).catch(() => {}); }
      else if (!this.transfer.isEmpty()) { await this.transfer.execute(this.bot).catch(() => {}); }
      else if (!this.auction.isEmpty()) { await this.auction.execute(this.bot).catch(() => {}); }
      return Promise.resolve();
    }
    return Promise.reject();
  }

  shouldExecute() : boolean {
    return true;
  }
}

export default EventLoop;