import Bot from '../bot/Bot';

abstract class BotEvent {
  id: string;
  data: any;

  constructor(id: string, data : any) {
    this.id = id;
    this.data = data;
  }

  abstract execute(bot: Bot) : Promise<string>;
  abstract shouldExecute(bot : Bot) : boolean;
}

export default BotEvent;
