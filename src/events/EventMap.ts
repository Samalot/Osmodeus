import BotEvent from './BotEvent';
import DefaultEvent from './core/DefaultEvent';
import GetAssetOrders from './core/GetAssetOrders';
import UpdateAssetContract from "./core/UpdateAssetContract";
import MakeOrder from './auction/MakeOffer';

const mapNameToEvent = (name: string, data : any) : BotEvent => {
  switch(name) {
    case 'updateAssetContract':
      return new UpdateAssetContract();
    case 'getAssetOrders':
      return new GetAssetOrders();
    case 'makeOrder':
      return new MakeOrder(data);
    
    default:
      return new DefaultEvent();
  }
};

export default mapNameToEvent;