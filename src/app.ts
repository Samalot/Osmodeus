import { delay } from 'opensea-js/lib/utils/utils';
import Bot from './bot/Bot';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MNEMONIC: string;
    }
  }
}

const activeBots : Array<string> = [
  'stonercats',
  // 'omnimorphs'
];

class App {
  executeDelay : number = 500;
  active: boolean;
  bots: Array<Bot>;

  constructor() {
    this.bots = activeBots.map(name => new Bot(name));
    this.active = true;
    this.loop();
  };

  async loop() {
    while(this.active) {
      for(let i = 0; i < this.bots.length; i++) {
        await this.bots[i].execute().catch(() => {});
      }
      await delay(this.executeDelay);
    }
  }
}

const dotenv = require('dotenv');
dotenv.config();

const app = new App();
