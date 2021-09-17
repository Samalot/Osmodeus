import Generic from './Generic';
import Schedule from './Schedule';
import Bot from '../Bot';

const mapBotToSchedule = (name: string, bot: Bot) : Schedule => {
  switch(name) {
    default:
      return new Generic(bot);
  }
};

export default mapBotToSchedule;