import Bot from "../../bot/Bot";
import BotEvent from "../BotEvent";
import { getAssetOrders } from '../../network/getAssetOrders';
import { getAsset } from '../../network/getAsset';
import ResponseType from "../../network/ResponseType";
import mapNameToEvent from "../../events/EventMap";
import EventType from "../EventType";
import delay from '../../utils/delay';

class OrderData {
  shouldOrder: boolean;
  id: number;
  bid: number;
  message: string
  
  constructor(shouldOrder: boolean, id: number, bid: number, message : string) {
    this.shouldOrder = shouldOrder;
    this.id = id;
    this.bid = bid;
    this.message = message;
  }
}

class GetAssetOrders extends BotEvent {
  constructor() {
    super('getAssetOrders', {});
  }

  potentialProfit(floor : number, highestBid : number, increment : number) : number {
    return (floor * 0.95) - (highestBid + increment);
  };

  
  async createOrderData(bot: Bot, i : number) : Promise<OrderData> {
    const assetData = await getAssetOrders(i, 0, bot.assetContractAddress, 'eth_price');
    let errorMessage = assetData.message;
    if (assetData.status === ResponseType.SUCCSESS) {
      let highestAuction = bot.maxOffer - bot.bidIncrement;
      let bidderAddress;
      let ownerAddress;

      if (assetData.data.orders && assetData.data.orders.length > 0) {
        highestAuction = assetData.data.orders[0].current_price / 1000000000000000000;
        bidderAddress = assetData.data.orders[0].maker.address;
        ownerAddress = assetData.data.orders[0].asset.owner.address;
      } else {
        const assetBackup = await getAsset(i, bot.assetContractAddress);
        if (assetBackup.status === ResponseType.SUCCSESS) {
          ownerAddress = assetBackup.data.owner.address
        } else {
          return new OrderData(false, i, 0, "Could not find asset owner");
        }
      }

      const profit = this.potentialProfit(bot.floorPrice, highestAuction, bot.bidIncrement);

      if (ownerAddress === bot.walletAddress) {
        errorMessage = 'You already own this asset';
      } else if (bidderAddress === bot.walletAddress) {
        errorMessage = 'You already have the highest bid';
      } else if (profit < bot.minProfit) {
        errorMessage = 'Insufficient profit'
      } else{
        const bid = Math.max(highestAuction + bot.bidIncrement, bot.minOffer);
        return new OrderData(true, i, bid, assetData.message);
      }  
    }
    return new OrderData(false, i, 0, errorMessage);
  };
  
  async execute(bot : Bot) : Promise<string> {
    if (this.shouldExecute(bot)) {
      for(let i : number = bot.assetCrawl.current; i < Math.min(bot.totalAssets, bot.assetCrawl.current + bot.assetCrawl.window); i++) {
        const orderData = await this.createOrderData(bot, i);
        if (orderData.shouldOrder) {
          bot.addEvent(mapNameToEvent('makeOrder', {
            assetID: orderData.id,
            bid: orderData.bid,
          }), EventType.Auction);
          console.info(`${bot.name} #${orderData.id} bid scheduled: ${orderData.bid}`);
        } else {
          console.info(`${bot.name} #${orderData.id} Error: ${orderData.message}`);
        }
        await delay(750);
      }

      const updatedCurrent = bot.assetCrawl.current + bot.assetCrawl.window;
      bot.assetCrawl.current = updatedCurrent >= bot.totalAssets ? 0 : updatedCurrent;
      return Promise.resolve(`${bot.name} collection assets complete`);      
    }
    
    return Promise.reject('Event should not execute');
  };

  shouldExecute(bot : Bot) : boolean {
    return !bot.pauseNewOrders;
  };
}

export default GetAssetOrders;