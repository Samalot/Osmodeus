import Bot from "../Bot";
import mapNameToEvent from "../../events/EventMap";
import EventType from "../../events/EventType";

abstract class Schedule {
  bot : Bot;
  
  constructor(bot: Bot) {
    this.bot = bot;
  }

  addTask = (id: string, type: EventType) : void => {
    this.bot.addEvent(mapNameToEvent(id), type);
  };

  scheduleTask = (minutes : number, id : string, type : EventType) : void => {
    setInterval(() => {
      this.bot.addEvent(mapNameToEvent(id), type);
    }, minutes * 60000);
  };

  abstract onLoad() : void;
  abstract setupIntervals() : void;
}

export default Schedule;