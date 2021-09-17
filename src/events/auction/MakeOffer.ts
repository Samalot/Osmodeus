import Bot from "../../bot/Bot";
import BotEvent from "../BotEvent";
import { getCollections } from '../../network/getCollections';
import ResponseType from "../../network/ResponseType";

class MakeOrder extends BotEvent { 
  constructor(data : any) {
    super('makeOrder', data);
  }

  async execute(bot : Bot) : Promise<string> {
    if (this.shouldExecute(bot)) {
      return new Promise((resolve, reject) => {
        const {
          assetID,
          bid,
        } = this.data;
  
        const bidHours = bot.offerHours || 12;
        const bidDuration = bidHours * 60 * 60;
        const expireTime = Math.round(Date.now() / 1000 + bidDuration);
        const scheme : any = "ERC721";
  
        bot.openSea.seaport.createBuyOrder({
          asset: {
            tokenId: assetID,
            tokenAddress: bot.assetContractAddress,
            schemaName: scheme
          },
          accountAddress: bot.walletAddress,
          startAmount: bid || bot.minOffer,
          expirationTime: expireTime
        })
        .then(() => resolve(`${bot.name} #${assetID} Offer Placed for ${bid}`))
        .catch(error => reject(error));
      });
    }

    return Promise.reject('Event should not execute');
  };

  shouldExecute(bot : Bot) : boolean {
    return true;
  };
}

export default MakeOrder;