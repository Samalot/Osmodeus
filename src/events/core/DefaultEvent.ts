import Bot from "../../bot/Bot";
import BotEvent from "../BotEvent";
// import { getCollections } from '../../network/getCollections';
import ResponseType from "../../network/ResponseType";

class DefaultEvent extends BotEvent {
  constructor() {
    super('default', {});
  }
  
  async execute(bot : Bot) : Promise<string> {
    if (this.shouldExecute(bot)) {
      return Promise.resolve('Event executed');
    }

    return Promise.reject('Event should not execute');
  };

  shouldExecute(bot : Bot) : boolean {
    return false;
  };
}

export default DefaultEvent;