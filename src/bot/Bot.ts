import EventLoop from '../events/EventLoop';
import Schedule from './schedule/Schedule';
import mapBotToSchedule from './schedule';
import BotEvent from '../events/BotEvent';
import EventType from '../events/EventType';
import OpenSea from './OpenSea';
import { configTypes, getConfig } from './config';

export class Bot {
  id: string;
  eventLoop: EventLoop;
  schedule: Schedule;
  name: string;
  slug: string;
  saveName: string;
  assetContractAddress: string;
  floorAddress: string;
  maxOffer: number;
  minOffer: number;
  minProfit: number;
  offerHours: number;
  floorPrice: number;
  bidIncrement: number;
  walletAddress: string;
  totalAssets: number;
  assetCrawl: {
    current: number,
    window: number
  };
  ownedAssets: Array<string>;
  savedData: Array<string>;
  pauseNewOrders: boolean;
  openSea: OpenSea;

  constructor(id: string) {
    this.id = id;
    this.eventLoop = new EventLoop(this);

    const config : configTypes = getConfig(id); 
    this.name = config.name;
    this.slug = config.slug;
    this.saveName = config.saveName;
    this.assetContractAddress = config.assetContractAddress.toLowerCase();
    this.floorAddress = config.floorAddress.toLowerCase();
    this.maxOffer = config.maxOffer;
    this.minOffer = config.minOffer;
    this.minProfit = config.minProfit;
    this.floorPrice = 0;
    this.bidIncrement = config.bidIncrement;
    this.offerHours = config.offerHours;
    this.walletAddress = config.walletAddress.toLowerCase();
    this.totalAssets = config.totalAssets;
    this.assetCrawl = config.assetCrawl;
    this.ownedAssets = config.ownedAssets;
    this.savedData = config.savedData;

    // State Controls
    this.pauseNewOrders = false;
    
    this.schedule = mapBotToSchedule(id, this);
    this.openSea = new OpenSea();

    this.init();
  };

  addEvent(event: BotEvent, type : EventType) : void {
    this.eventLoop.addEvent(event, type);
  }

  init() : void {
    this.schedule.onLoad();
    this.schedule.setupIntervals();
  };

  async execute() : Promise<any> {
    await this.eventLoop.execute().catch(() => {});
    return Promise.resolve();
  };
}

export default Bot;