import Bot from "../../bot/Bot";
import BotEvent from "../BotEvent";
import { getCollections } from '../../network/getCollections';
import ResponseType from "../../network/ResponseType";

class UpdateAssetContract extends BotEvent { 
  constructor() {
    super('updateAssetContract', {});
  }

  async execute(bot : Bot) : Promise<string> {

    return new Promise((resolve, reject) => {
      if (this.shouldExecute(bot)) {
        getCollections(bot.floorAddress, 100, 0, bot.assetContractAddress)
        .then(result => {
          if (result.status == ResponseType.SUCCSESS) {
            bot.totalAssets = result.data.count;
            bot.floorPrice = result.data.floor;
            resolve(`${bot.name} contract update: Total Assets = ${bot.totalAssets}, Floor Price = ${bot.floorPrice}`);
          } else if (result.status == ResponseType.ERROR) {
            reject(`${bot.name} Error, ${result.message}`);
          }
        })
        .catch(error => reject(error));
      } else { reject('Event should not execute') }
    })
  };

  shouldExecute(bot : Bot) : boolean {
    return true;
  };
}

export default UpdateAssetContract;